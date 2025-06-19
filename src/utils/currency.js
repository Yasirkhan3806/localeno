
// Convert price to PKR
export const convertToPKR = (price) => {
  if (!price) return 0;
  
  let numericPrice;
  if (typeof price === 'string') {
    numericPrice = parseFloat(price.replace(/[₹$,]/g, ''));
  } else {
    numericPrice = price;
  }
  
  if (isNaN(numericPrice)) return 0;
  
  // If it's already in PKR, return as is, otherwise convert from USD
  if (typeof price === 'string' && price.includes('PKR')) {
    return numericPrice;
  }
  
  return Math.round(numericPrice * 280);
};

export const formatPKR = (amount) => {
  return `PKR ${amount.toLocaleString()}`;
};
