import { useEffect, useMemo, useRef, useState } from "react";
import goongjs from "@goongmaps/goong-js";
import "@goongmaps/goong-js/dist/goong-js.css";
import axios from "axios";

type LatLng = { lat: number; lng: number };

type GoongGeocodeResult = {
  geometry?: { location?: { lat?: number; lng?: number } };
};

function decodePolyline(str: string, precision = 5): [number, number][] {
  let index = 0, lat = 0, lng = 0, coordinates: [number, number][] = [];
  const factor = Math.pow(10, precision);

  while (index < str.length) {
    let result = 0, shift = 0, b;
    do {
      b = str.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    lat += ((result & 1) ? ~(result >> 1) : (result >> 1));

    result = 0;
    shift = 0;

    do {
      b = str.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    lng += ((result & 1) ? ~(result >> 1) : (result >> 1));

    coordinates.push([lng / factor, lat / factor]);
  }

  return coordinates;
}
interface OrderDeliveryMapProps {
  destinationAddress: string;
  /** Chiều cao vùng bản đồ, ví dụ "h-72" hoặc "min-h-[420px] h-[55vh]" cho trang chi tiết */
  mapHeightClass?: string;
}

const parseEnvNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const GOONG_RS_API = "https://rsapi.goong.io";
const warehousePoint: LatLng = {
  lat: parseEnvNumber(import.meta.env.VITE_WAREHOUSE_LAT, 21.028511),
  lng: parseEnvNumber(import.meta.env.VITE_WAREHOUSE_LNG, 105.804817),
};

const normalizeVehicle = (value: string | undefined) => {
  const raw = (value || "car").toLowerCase().trim();
  if (raw === "motorcycle" || raw === "motorbike") return "bike";
  const allowed = new Set(["car", "bike", "truck", "taxi", "hd"]);
  return allowed.has(raw) ? raw : "car";
};

const vehicle = normalizeVehicle(import.meta.env.VITE_GOONG_VEHICLE);

const buildAddress = (value: string) => value.trim().replace(/\s+/g, " ");

const geocodeAddress = async (apiKey: string, address: string): Promise<LatLng | null> => {
  const query = encodeURIComponent(buildAddress(address));
  const url = `${GOONG_RS_API}/geocode?address=${query}&api_key=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) return null;

  const data = (await response.json()) as { results?: GoongGeocodeResult[] };
  const first = data.results?.[0]?.geometry?.location;
  if (!first?.lat || !first?.lng) return null;
  return { lat: first.lat, lng: first.lng };
};

const getRoute = async (apiKey: string, origin: LatLng, destination: LatLng) => {
  const url = `${GOONG_RS_API}/Direction?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&vehicle=${vehicle}&geometries=geojson&api_key=${apiKey}`;

  let points: [number, number][] | undefined = undefined;
  let leg: { distance?: { value?: number }; duration?: { value?: number } } | undefined = undefined;

  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error(`Goong Direction API lỗi với status ${response.status}`);
    }
    const data = response.data as any;
    const route = data.routes?.[0];
    if (!route) return null;

    const polyline = route.overview_polyline?.points;
    if (!polyline) return null;

    points = decodePolyline(polyline);

    // validate
    if (!points || points.length < 2) return null;

    leg = route!.legs?.[0];
  } catch (error) {
    console.error("Lỗi khi gọi Goong Direction API:", error);
    throw error instanceof Error ? error : new Error("Lỗi không xác định khi gọi Goong Direction API");
  }
  return {
    points,
    etaSeconds: leg?.duration?.value || 0,
    distanceMeters: leg?.distance?.value || 0,
  };
};

const formatEta = (seconds: number) => {
  if (!seconds || seconds <= 0) return "Không xác định";
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} phút`;
  const hours = Math.floor(mins / 60);
  const remain = mins % 60;
  return remain ? `${hours} giờ ${remain} phút` : `${hours} giờ`;
};

const formatDistance = (meters: number) => {
  if (!meters || meters <= 0) return "Không xác định";
  return `${(meters / 1000).toFixed(1)} km`;
};

export default function OrderDeliveryMap({
  destinationAddress,
  mapHeightClass = "h-72",
}: OrderDeliveryMapProps) {
  const apiKey = import.meta.env.VITE_GOONG_API_KEY as string | undefined;
  const mapKey = (import.meta.env.VITE_GOONG_MAP_KEY as string | undefined) || apiKey;
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any | null>(null);
  const deliveryMarkerRef = useRef<any | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [etaSeconds, setEtaSeconds] = useState(0);
  const [distanceMeters, setDistanceMeters] = useState(0);

  const normalizedAddress = useMemo(() => buildAddress(destinationAddress), [destinationAddress]);

  useEffect(() => {
    if (!apiKey) {
      setLoading(false);
      setError("Thiếu VITE_GOONG_API_KEY trong frontend/.env");
      return;
    }
    if (!mapKey) {
      setLoading(false);
      setError("Thiếu VITE_GOONG_MAP_KEY trong frontend/.env");
      return;
    }

    if (!normalizedAddress) {
      setLoading(false);
      setError("Không có địa chỉ giao hàng để hiển thị bản đồ");
      return;
    }

    let isCancelled = false;

    const cleanupMap = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      deliveryMarkerRef.current?.remove();
      mapRef.current?.remove();
      mapRef.current = null;
    };

    const run = async () => {
      setLoading(true);
      setError(null);

      const destinationPoint = await geocodeAddress(apiKey, normalizedAddress);
      if (!destinationPoint) {
        setLoading(false);
        setError("Không định vị được địa chỉ khách hàng từ Goong Geocode");
        return;
      }

      let routeData: Awaited<ReturnType<typeof getRoute>> | null = null;
      try {
        routeData = await getRoute(apiKey, warehousePoint, destinationPoint);
      } catch (err: any) {
        setLoading(false);
        setError(`Goong Direction lỗi: ${err?.message || "Không xác định"}`);
        return;
      }

      if (!routeData) {
        setLoading(false);
        setError("Không lấy được lộ trình từ Goong Direction");
        return;
      }

      if (isCancelled || !mapContainerRef.current) return;

      setEtaSeconds(routeData.etaSeconds);
      setDistanceMeters(routeData.distanceMeters);

      goongjs.accessToken = mapKey;
      const map = new goongjs.Map({
        container: mapContainerRef.current,
        style: `https://tiles.goong.io/assets/goong_map_web.json?api_key=${mapKey}`,
        center: [warehousePoint.lng, warehousePoint.lat],
        zoom: 11,
      });
      mapRef.current = map;

      map.on("load", () => {
        if (isCancelled) return;

        map.addSource("delivery-route", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: routeData.points,
            },
            properties: {},
          },
        });

        map.addLayer({
          id: "delivery-route-line",
          type: "line",
          source: "delivery-route",
          paint: {
            "line-color": "#f97316",
            "line-width": 5,
            "line-opacity": 0.9,
          },
        });

        const warehouseMarker = new goongjs.Marker({ color: "#2563eb" })
          .setLngLat([warehousePoint.lng, warehousePoint.lat])
          .setPopup(new goongjs.Popup().setText("Kho hàng"))
          .addTo(map);

        const destinationMarker = new goongjs.Marker({ color: "#16a34a" })
          .setLngLat([destinationPoint.lng, destinationPoint.lat])
          .setPopup(new goongjs.Popup().setText("Điểm giao hàng"))
          .addTo(map);

        const el = document.createElement("div");
        el.style.transform = "translate(-50%, -50%)"; // giữ center

        const inner = document.createElement("div");
        inner.className =
          "w-10 h-10 bg-[url('https://cdn-icons-png.flaticon.com/512/1048/1048315.png')] bg-cover bg-center drop-shadow-lg";

        inner.style.transformOrigin = "center";

        el.appendChild(inner);

        deliveryMarkerRef.current = new goongjs.Marker(el)
          .setLngLat(routeData.points![0])
          .addTo(map);
        const bounds = routeData.points!.reduce(
          (b, point) => b.extend(point),
          new goongjs.LngLatBounds(routeData.points![0], routeData.points![0]),
        );
        map.fitBounds(bounds, { padding: 50, duration: 800 });

        const total = routeData.points!.length - 1;
        const simulatedDurationMs = Math.min(
          90_000,
          Math.max(15_000, (routeData.etaSeconds || 900) * 100),
        );
        const start = performance.now();
        let prevAngle = 0;
        const animate = (current: number) => {
          if (isCancelled || !deliveryMarkerRef.current) return;

          const progress = Math.min(1, (current - start) / simulatedDurationMs);

          // 👉 smooth index (không bị nhảy)
          const exactIndex = progress * total;
          const index = Math.floor(exactIndex);
          const nextIndex = Math.min(index + 1, total);

          const currentPoint = routeData.points![index];
          const nextPoint = routeData.points![nextIndex] || currentPoint;
          // 👉 nội suy (mượt hơn)
          const t = exactIndex - index;

          const lng = currentPoint[0] + (nextPoint[0] - currentPoint[0]) * t;
          const lat = currentPoint[1] + (nextPoint[1] - currentPoint[1]) * t;

          const rawAngle =
            Math.atan2(nextPoint[1] - currentPoint[1], nextPoint[0] - currentPoint[0]) *
            (180 / Math.PI);

          // 👉 smooth angle
          const angle = prevAngle + (rawAngle - prevAngle) * 0.2;
          prevAngle = angle;

          deliveryMarkerRef.current.setLngLat([lng, lat]);

          // 👉 rotate icon
          const el = deliveryMarkerRef.current.getElement();
          const inner = el.firstChild as HTMLElement;

          inner.style.transform = `rotate(${angle}deg)`;

          if (progress < 1) {
            animationFrameRef.current = requestAnimationFrame(animate);
          }
        };
        animationFrameRef.current = requestAnimationFrame(animate);
        warehouseMarker.togglePopup();
        destinationMarker.togglePopup();
        setLoading(false);
      });
    };

    void run();

    return () => {
      isCancelled = true;
      cleanupMap();
    };
  }, [apiKey, mapKey, normalizedAddress]);

  return (
    <div className="space-y-2 rounded-lg border bg-white p-3">
      <div className="flex flex-wrap items-center gap-4 text-xs">
        <span>
          <span className="font-medium">Kho:</span> ({warehousePoint.lat.toFixed(5)}, {warehousePoint.lng.toFixed(5)})
        </span>
        <span>
          <span className="font-medium">Quãng đường:</span> {formatDistance(distanceMeters)}
        </span>
        <span>
          <span className="font-medium">Thời gian dự kiến:</span> {formatEta(etaSeconds)}
        </span>
      </div>

      {error ? (
        <div className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">{error}</div>
      ) : (
        <div
          className={`relative w-full overflow-hidden rounded-md border ${mapHeightClass}`}
        >
          <div ref={mapContainerRef} className="h-full w-full min-h-[inherit]" />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 text-sm">
              Đang tải bản đồ vận chuyển...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
