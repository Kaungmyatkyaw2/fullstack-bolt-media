import React, { useState } from "react";

const useUploadImage = () => {
  const [imageSrc, setImageSrc] = useState();

  async function handleOnSubmit(file: any) {
    const formData = new FormData();

    // @ts-ignore
    formData.append("file", file);

    formData.append("upload_preset", "my-uploads");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dmlsbf29a/image/upload",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((r) => r.json())
      .catch((err) => console.log(err));

    setImageSrc(data.secure_url);
  }

  return [imageSrc, handleOnSubmit];
};

export default useUploadImage;
