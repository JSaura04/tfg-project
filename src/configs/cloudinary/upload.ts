export const uploadToCloudinary = async (file: File): Promise<string> => {
  const url = "https://api.cloudinary.com/v1_1/dod8ij5cg/image/upload";
  const uploadPreset = "picit-db";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || "Error al subir a Cloudinary");
  }

  const data = await response.json();
  return data.secure_url;
};
