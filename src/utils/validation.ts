export const validatePrice = (price: string): string | undefined => {
  const numericPrice = Number(price);

  if (price.length === 0 || isNaN(numericPrice) || numericPrice <= 0) {
    return "Enter a valid price";
  }

  return undefined;
};

export const validateImageUrl = (url: string): string | undefined => {
  if (url.trim().length === 0) {
    return "Image URL is required";
  }

  try {
    new URL(url);
  } catch {
    return "Enter a valid URL";
  }

  return undefined;
};

export const validateRequiredField = (value: string, fieldName: string): string | undefined => {
  if (value.trim().length === 0) {
    return `${fieldName} is required`;
  }

  return undefined;
};
