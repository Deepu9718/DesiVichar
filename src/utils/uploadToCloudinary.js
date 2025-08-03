const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "desivichar_preset");

  const res = await fetch("https://api.cloudinary.com/v1_1/dzjq5iefg/image/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.secure_url;
};

export default uploadToCloudinary;