export const useImgUpload = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    fetch("/api/admin/uploadImg", {
        method: "POST",
        headers: {},
        body: formData
    });
};