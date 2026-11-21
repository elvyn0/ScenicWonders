/**
 * Helper to dynamically inject Cloudinary performance transformations
 * (f_auto, q_auto, dimensions, and crop) into image URLs.
 * Works seamlessly for both existing MongoDB URLs and new uploads.
 *
 * @param {string} url - The raw or existing image URL
 * @param {Object} options - Transformation options (width, height, crop, quality, format)
 * @returns {string} - Optimized URL with modern format and compressed quality
 */
export const getOptimizedImageUrl = (url, options = {}) => {
  if (!url || typeof url !== "string") return url || "";

  // If not a Cloudinary URL, return as-is
  if (!url.includes("res.cloudinary.com")) return url;

  const {
    width,
    height,
    crop = "limit",
    quality = "auto",
    format = "auto",
  } = options;

  const parts = [`f_${format}`, `q_${quality}`];
  if (width) parts.push(`w_${width}`);
  if (height) parts.push(`h_${height}`);
  if (crop && (width || height)) parts.push(`c_${crop}`);

  const transformStr = parts.join(",");

  // Normalize if path previously had misplaced transformation before upload
  let cleanUrl = url.replace(/\/image\/[^/]+\/upload\//, "/image/upload/");

  const uploadIndex = cleanUrl.indexOf("/upload/");
  if (uploadIndex === -1) return cleanUrl;

  const prefix = cleanUrl.slice(0, uploadIndex + 8); // includes '/upload/'
  const rest = cleanUrl.slice(uploadIndex + 8);

  // Strip any old inline transformation block (e.g. f_auto,q_auto/ or w_300/...)
  const restWithoutOldTransforms = rest.replace(/^(?:[a-z]_[a-z0-9_]+,?)+\//i, "");

  return `${prefix}${transformStr}/${restWithoutOldTransforms}`;
};

export default getOptimizedImageUrl;

