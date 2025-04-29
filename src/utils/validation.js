/**
 * Validates if a value is not empty
 * @param {string} value - The value to check
 * @returns {boolean} - True if valid, false otherwise
 */
export function validateRequired(value) {
  return value.trim().length > 0;
}

/**
 * Validates an email address format
 * @param {string} email - The email to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a phone number format
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function validatePhone(phone) {
  // Allow digits, spaces, parentheses, hyphens, plus signs
  // Must have at least 10 digits
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,}$/;
  
  if (!phone.trim()) {
    return false;
  }
  
  return phoneRegex.test(phone.trim());
}

/**
 * Validates a password strength
 * @param {string} password - The password to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function validatePassword(password) {
  // Basic validation - at least 8 characters
  // In a real app, you might want to add more requirements
  // like uppercase, lowercase, numbers, special characters
  return password.length >= 8;
}