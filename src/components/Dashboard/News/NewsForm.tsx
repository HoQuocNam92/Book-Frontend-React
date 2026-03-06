import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsSchema, type NewsInput } from "@/schema/new.schema";



interface NewsFormProps {
    open: boolean;
    setOpen: (v: boolean) => void;
    onSubmit: (data: NewsInput) => void;
    initialData: NewsInput | null;
    loading: boolean;
}



const NewsForm = ({ open, setOpen, onSubmit, initialData, loading }: NewsFormProps) => {
    const { register, handleSubmit, reset, setValue, watch } = useForm({
        resolver: zodResolver(newsSchema),
    });

    const [image, setImage] = useState("");
    const isPublished = watch("is_published");

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        } else {
            reset({ title: "", type: "", thumbnail: null, content: "", is_published: true });
        }
    }, [initialData, open]);

    const handelPreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("thumbnail", file);
            setImage(URL.createObjectURL(file));
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {initialData ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="title">Tiêu đề *</Label>
                            <Input id="title" {...register("title", { required: true })} placeholder="Tiêu đề bài viết" />
                        </div>



                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="type">Loại bài viết</Label>
                                <Input id="type" {...register("type")} placeholder="vd: sach-moi, su-kien" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="thumbnail">Thumbnail</Label>
                                <Input
                                    id="thumbnail"
                                    type="file"
                                    accept="image/*"
                                    onChange={handelPreviewImage}
                                />
                                {image && <img src={image} alt="Thumbnail" className="mt-2 max-h-40 object-cover" />}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="content">Nội dung</Label>
                            <Textarea
                                id="content"
                                {...register("content")}
                                placeholder="Nội dung bài viết..."
                                rows={8}
                                className="resize-none"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <Switch
                                id="is_published"
                                checked={!!isPublished}
                                onCheckedChange={(v) => setValue("is_published", v)}
                            />
                            <Label htmlFor="is_published">
                                {isPublished ? "Đã xuất bản" : "Bản nháp"}
                            </Label>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                            Huỷ
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Đang lưu..." : initialData ? "Cập nhật" : "Tạo bài viết"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default NewsForm;
