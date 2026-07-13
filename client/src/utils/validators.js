const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PHONE_RE = /^[0-9+\-\s()]{7,15}$/;

export function validateEmail(email) {
  if (!email.trim()) return "Email is required";
  if (!EMAIL_RE.test(email.trim())) return "Enter a valid email address";
  return "";
}

export function validateName(name) {
  if (!name.trim()) return "Full name is required";
  if (name.trim().length < 2) return "Name must be at least 2 characters";
  return "";
}

export function validatePassword(password) {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return "Password must contain at least one letter and one number";
  }
  return "";
}

export function validateConfirm(password, confirm) {
  if (!confirm) return "Please confirm your password";
  if (confirm !== password) return "Passwords do not match";
  return "";
}


// ✅ Phone number validator
export function validatephone(phone) {
  if (!phone.trim()) return "Phone number is required";

  if (!PHONE_RE.test(phone.trim())) {
    return "Enter a valid phone number";
  }

  return "";
}


// ✅ Address validator
export function validateAddress(address) {
  if (!address.trim()) return "Address is required";

  if (address.trim().length < 5) {
    return "Address must be at least 5 characters";
  }

  return "";
}


/**
 * Validates the login form.
 */
export function validateLoginForm({ email, password }) {
  const errors = {};

  const emailErr = validateEmail(email);
  const passwordErr = password ? "" : "Password is required";

  if (emailErr) errors.email = emailErr;
  if (passwordErr) errors.password = passwordErr;

  return errors;
}


/**
 * Validates the signup form.
 */
export function validateSignupForm({
  name,
  email,
  password,
  confirm,
  phone,
  address
}) {
  const errors = {};

  const nameErr = validateName(name);
  const emailErr = validateEmail(email);
  const passwordErr = validatePassword(password);
  const confirmErr = validateConfirm(password, confirm);
  const phoneErr = validatephone(phone);
  const addressErr = validateAddress(address);


  if (nameErr) errors.name = nameErr;
  if (emailErr) errors.email = emailErr;
  if (passwordErr) errors.password = passwordErr;
  if (confirmErr) errors.confirm = confirmErr;
  if (phoneErr) errors.phone = phoneErr;
  if (addressErr) errors.address = addressErr;


  return errors;
}


/**
 * Pulls API error message.
 */
export function getApiErrorMessage(
  error,
  fallback = "Something went wrong. Please try again."
) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
}