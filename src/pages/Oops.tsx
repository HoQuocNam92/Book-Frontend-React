import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
    message?: string;
};

export default function Oops({ message }: Props) {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-muted/30">
            <Card className="w-full max-w-xl rounded-2xl shadow-md">
                <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                            <AlertTriangle className="w-8 h-8 text-destructive" />
                        </div>

                        <h1 className="text-2xl font-semibold">Oops! Có lỗi xảy ra</h1>

                        <p className="text-muted-foreground">
                            {message ||
                                "Hệ thống đang gặp sự cố hoặc dữ liệu không thể tải được. Bạn thử reload lại nhé."}
                        </p>

                        <div className="flex flex-wrap gap-3 justify-center mt-4">
                            <Button onClick={() => window.location.reload()}>
                                <RefreshCcw className="w-4 h-4 mr-2" />
                                Tải lại
                            </Button>

                            <Button asChild variant="outline">
                                <Link to="/">
                                    <Home className="w-4 h-4 mr-2" />
                                    Về trang chủ
                                </Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
