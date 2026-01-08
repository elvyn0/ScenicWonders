const cloudinary = require("cloudinary").v2;

exports.uploadImage = async (file, Folder, quality = 80) => {
  const options = {
    Folder,
    resource_type: "image",
    transformation: [{ quality }],
  };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
