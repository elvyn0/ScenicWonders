const cloudinary = require("cloudinary").v2;

/**
 * Uploads a local file to Cloudinary with automated format (WebP/AVIF),
 * quality compression, and custom transformations.
 *
 * @param {string} filePath - Path to file stored temporarily by multer
 * @param {string} folder - Destination folder on Cloudinary
 * @param {Array} customTransformations - Optional array of transformation objects
 * @returns {Promise<{ url: string, publicId: string }>}
 */
const uploadToCloudinary = async (filePath, folder, customTransformations = []) => {
  const transformation = [
    { quality: "auto" },
    { fetch_format: "auto" },
    ...customTransformations,
  ];

  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: "image",
    transformation,
  });

  // Construct optimized delivery URL containing f_auto,q_auto
  const flattenedOptions = customTransformations.reduce(
    (acc, curr) => ({ ...acc, ...curr }),
    {}
  );

  const optimizedUrl = cloudinary.url(result.public_id, {
    secure: true,
    fetch_format: "auto",
    quality: "auto",
    ...flattenedOptions,
  });

  return {
    url: optimizedUrl || result.secure_url,
    publicId: result.public_id,
  };
};

module.exports = { uploadToCloudinary };
