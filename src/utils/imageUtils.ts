// Utility functions for image handling

export const DEFAULT_BIRTHDAY_IMAGE = '/images/asli-coder.jpg';

export const checkImageExists = async (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
};

export const getOptimizedImageSrc = (src: string): string => {
  // For now, return the original src
  // In a real application, you might want to use different sizes or image optimization services
  return src;
};

export const generateImageAlt = (name: string = 'Siddhesh'): string => {
  return `${name} - Birthday celebration photo`;
};

// Image validation
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 2 * 1024 * 1024; // 2MB

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Please select a valid image file (JPG, PNG, or WebP)' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'Image file size should be less than 2MB' };
  }

  return { valid: true };
};