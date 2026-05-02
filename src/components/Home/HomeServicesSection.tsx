import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import { useServices } from "@/hooks/useServices"
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { LazyImage } from "@/components/common/LazyImage"
import HomeServicesSkeleton from "@/components/Home/HomeServicesSkeleton"

interface ServiceType {
    Id: number;
    ServiceName: string;
    Description: string | null;
    IconUrl: string | null;
    LinkUrl: string | null;
    DisplayOrder: number;
}

const HomeServicesSection = () => {
    const { getServices } = useServices();
    const services: ServiceType[] = getServices.data || [];

    if (getServices.isLoading) {
        return <HomeServicesSkeleton />
    }

    if (services.length === 0) return null

    return (
        <div className="mb-6 rounded-3xl bg-gradient-to-br from-slate-50 to-gray-100 p-4 sm:p-6">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
                    <div className="h-7 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-orange-500 to-amber-400" />
                    <h2 className="text-lg font-bold text-neutral-800 sm:text-xl">Dịch vụ tại Alpha Books</h2>
                    <span className="flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
                        <Sparkles className="h-3 w-3" />
                        BIZONE
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left - Description */}
                <div className="lg:col-span-4 flex flex-col justify-center">
                    <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                        Trong hành trình 20 năm đồng hành cùng cộng đồng, chúng tôi thấy nhu cầu ngày càng tăng của
                        doanh nghiệp, các nhà quản lý muốn liên nhanh hơn đến tri thức quản trị cùng như mong
                        muốn phát triển doanh nghiệp của mình thành một tổ chức học tập. Vì thế, Alpha Books ra mắt
                        một trung tâm mới: <strong>Trung tâm Tư vấn &amp; Hợp tác xuất bản (BIZONE)</strong> gồm 3 dịch vụ chính.
                    </p>
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 text-sm font-semibold w-fit transition-colors"
                    >
                        Xem Thêm
                    </a>
                </div>

                <div className="lg:col-span-8 relative">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        slidesPerView={1}
                        spaceBetween={16}
                        navigation={{
                            prevEl: '.services-prev',
                            nextEl: '.services-next',
                        }}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        style={{ paddingBottom: '35px' }}
                    >
                        {services.map((service) => (
                            <SwiperSlide key={service.Id}>
                                <a
                                    href={service.LinkUrl || '#'}
                                    className="group flex h-[300px] flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:h-[320px]"
                                >
                                    {/* Service Icon/Image */}
                                    <div className="h-[180px] overflow-hidden bg-neutral-50">
                                        {service.IconUrl ? (
                                            <LazyImage
                                                src={service.IconUrl}
                                                alt={service.ServiceName}
                                                cdnMaxWidth={640}
                                                sizes="(max-width: 1024px) 50vw, 33vw"
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-amber-50">
                                                <Sparkles className="h-12 w-12 text-orange-400" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Service Info */}
                                    <div className="flex min-h-0 flex-1 flex-col p-4">
                                        <h3 className="mb-2 line-clamp-2 text-sm font-bold uppercase tracking-wide text-neutral-800 sm:line-clamp-1">
                                            {service.ServiceName}
                                        </h3>
                                        {service.Description && (
                                            <p className="text-xs text-neutral-500 leading-relaxed line-clamp-3">
                                                {service.Description}
                                            </p>
                                        )}
                                    </div>
                                </a>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation Arrows */}
                    <div className="flex items-center gap-3 mt-2">
                        <button className="services-prev h-9 w-9 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors">
                            <ChevronLeft className="h-4 w-4 text-neutral-600" />
                        </button>
                        <button className="services-next h-9 w-9 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors">
                            <ChevronRight className="h-4 w-4 text-neutral-600" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeServicesSection;
