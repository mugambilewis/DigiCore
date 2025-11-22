// Currency conversion utility: USDT to Kenya Shilling (KES)
// Using a fixed conversion rate (you can update this or fetch from an API)

const USDT_TO_KES_RATE = 150.5; // 1 USDT = 150.5 KES (example rate, update as needed)

/**
 * Convert USDT amount to Kenya Shilling
 * @param {number} usdtAmount - Amount in USDT
 * @returns {number} - Amount in KES
 */
const convertUSDTtoKES = (usdtAmount) => {
  if (typeof usdtAmount !== 'number' || isNaN(usdtAmount) || usdtAmount < 0) {
    throw new Error('Invalid USDT amount');
  }
  return Math.round(usdtAmount * USDT_TO_KES_RATE * 100) / 100; // Round to 2 decimal places
};

/**
 * Convert Kenya Shilling to USDT
 * @param {number} kesAmount - Amount in KES
 * @returns {number} - Amount in USDT
 */
const convertKEStoUSDT = (kesAmount) => {
  if (typeof kesAmount !== 'number' || isNaN(kesAmount) || kesAmount < 0) {
    throw new Error('Invalid KES amount');
  }
  return Math.round((kesAmount / USDT_TO_KES_RATE) * 100) / 100; // Round to 2 decimal places
};

/**
 * Format currency for display
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (USDT or KES)
 * @returns {string} - Formatted currency string
 */
const formatCurrency = (amount, currency = 'KES') => {
  if (currency === 'KES') {
    return `KES ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `USDT ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

module.exports = {
  convertUSDTtoKES,
  convertKEStoUSDT,
  formatCurrency,
  USDT_TO_KES_RATE,
};

