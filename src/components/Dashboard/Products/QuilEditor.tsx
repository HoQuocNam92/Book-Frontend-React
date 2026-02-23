import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Controller } from "react-hook-form";

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["link", "image"],
        ["clean"],
    ],
    clipboard: {
        matchVisual: false,
    },
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
    },
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "align",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
];


function MyEditor({ control }: any) {
    return (
        <div className="w-full">
            <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <ReactQuill
                        theme="snow"
                        value={field.value || ""}
                        onChange={(content) => field.onChange(content)}
                        modules={modules}
                        formats={formats}
                        placeholder="Nhập mô tả..."
                        style={{ height: 250, marginBottom: 50 }}
                    />
                )}
            />
        </div>
    );
}

export default MyEditor;

