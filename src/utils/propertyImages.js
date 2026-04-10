const importedImages = import.meta.glob("../../source/listings_image/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

/**
 * Returns the front image and all images for a given MLS ID.
 * @param {string} mlsId - The MLS ID of the property.
 * @returns {{ frontImage: string | null, allImages: string[] }}
 */
export const getPropertyImages = (mlsId) => {
  if (!mlsId) {
    return { frontImage: null, allImages: [] };
  }

  let images = [];
  let frontImage = null;

  for (const path in importedImages) {
    // Check if the path contains the mlsId as a folder name
    if (path.includes(`/${mlsId}/`)) {
      const url = importedImages[path];
      
      // If the file name contains '-front' or '- front' (case-insensitive)
      if (path.toLowerCase().includes('front')) {
        frontImage = url;
      } else {
        images.push(url);
      }
    }
  }

  // Put frontImage at the beginning of allImages if it exists
  if (frontImage) {
    images.unshift(frontImage);
  }

  return {
    frontImage: frontImage || images[0] || null,
    allImages: images,
  };
};