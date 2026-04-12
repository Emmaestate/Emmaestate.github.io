const importedImages = import.meta.glob("../../source/listings_image/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

/**
 * Returns the front image and all images for a given MLS ID.
 * @param {string} mlsId - The MLS ID of the property.
 * @returns {{ frontImage: string | null, allImages: string[] }}
 */
export const getPropertyImages = (mlsId, imgid) => {
  let targetFolder = null;

  // Check if mlsId exists in the paths
  if (mlsId) {
    for (const path in importedImages) {
      if (path.includes(`/${mlsId}/`)) {
        targetFolder = mlsId;
        break;
      }
    }
  }

  // Fallback to imgid if no mlsId match
  if (!targetFolder && imgid) {
    for (const path in importedImages) {
      if (path.includes(`/${imgid}/`)) {
        targetFolder = imgid;
        break;
      }
    }
  }

  if (!targetFolder) {
    return { frontImage: null, allImages: [] };
  }

  let images = [];
  let frontImage = null;

  for (const path in importedImages) {
    if (path.includes(`/${targetFolder}/`)) {
      const url = importedImages[path];
      if (path.toLowerCase().includes('front')) {
        frontImage = url;
      } else {
        images.push(url);
      }
    }
  }

  if (frontImage) {
    images.unshift(frontImage);
  }

  return {
    frontImage: frontImage || images[0] || null,
    allImages: images,
  };
};