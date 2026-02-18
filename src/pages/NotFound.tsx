import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Home, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-muted/30">
            <Card className="w-full max-w-xl rounded-2xl shadow-md">
                <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="text-7xl font-bold text-primary">404</div>

                        <h1 className="text-2xl font-semibold">Trang không tồn tại</h1>

                        <p className="text-muted-foreground">
                            Có vẻ bạn đã nhập sai đường dẫn hoặc trang này đã bị xóa.
                        </p>

                        <div className="flex flex-wrap gap-3 justify-center mt-4">
                            <Button onClick={() => navigate(-1)} variant="outline">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Quay lại
                            </Button>

                            <Button asChild>
                                <Link to="/">
                                    <Home className="w-4 h-4 mr-2" />
                                    Về trang chủ
                                </Link>
                            </Button>

                            <Button asChild variant="secondary">
                                <Link to="/products">
                                    <Search className="w-4 h-4 mr-2" />
                                    Xem sản phẩm
                                </Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
