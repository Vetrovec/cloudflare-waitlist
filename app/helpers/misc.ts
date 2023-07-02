export function validateEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function generateCode() {
  const array = new Uint32Array(4);
  crypto.getRandomValues(array);
  const value = array.reduce((a, b) => a + b, 0xffffffff);
  return value.toString(36).toUpperCase();
}
