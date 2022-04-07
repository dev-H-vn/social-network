export const imageUpload = async (images) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();

    if (item.camera) {
      formData.append("file", item.camera);
    } else if (item.url) {
      imgArr.push(item);
      continue;
    } else {
      formData.append("file", item);
    }

    formData.append("upload_preset", "social");
    formData.append("cloud_name", "dujubytqp");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dujubytqp/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }
  return imgArr;
};
