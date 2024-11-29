/**
 * Convert a HEX color to RGBA with a specified opacity.
 *
 * @param {string} hex - The HEX color (e.g., "#ffffff").
 * @param {number} opacity - The opacity value (0 to 1).
 * @returns {string} The RGBA color (e.g., "rgba(255, 255, 255, 0.5)").
 */
export const hexToRgba = (hex, opacity) => {
  // Ensure the HEX color is valid
  if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex)) {
    throw new Error("Invalid HEX color");
  }

  let r, g, b;
  if (hex.length === 4) {
    // Convert shorthand HEX (e.g., "#fff") to full HEX (e.g., "#ffffff")
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
