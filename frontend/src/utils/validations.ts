export function isValidEmail(email: string): boolean {
  if (email == null || email.trim() === '') {
    return false;
  }
  email = email.trim();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  if (password == null || password.trim() === '') {
    return false;
  }

  password = password.trim();

  if (password.length < 8) {
    return false;
  }
  if (!/[A-Z]/.test(password)) {
    return false;
  }
  if (!/[a-z]/.test(password)) {
    return false;
  }
  if (!/\d/.test(password)) {
    return false;
  }
  return /[!@#$%^&*(),.?":{}|<>]/.test(password);
}
