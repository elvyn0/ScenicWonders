exports.validateImge = (file) => {
  if (!file) {
    throw new Error("No file provided");
  }

  const allowedMimeTypes = ["image/jpeg", "image/png", "image/png"];
  if (!allowedMimeTypes.includes(file.mimeType)) {
    throw new Error("Only JPG,JEPG,PNG allowed");
  }

  const MAX_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    throw new Error("Image size must be under 5MB");
  }
};
