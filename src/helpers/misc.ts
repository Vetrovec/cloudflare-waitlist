export function validateEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function generateCode() {
  const minValue = BigInt(2_238_976_117); // "1111111" in base 36
  const maxValue = BigInt(78_364_164_095); // "ZZZZZZZ" in base 36

  const array = new BigUint64Array(1);
  crypto.getRandomValues(array);
  const value = minValue + (array[0] % BigInt(maxValue - minValue + BigInt(1)));

  return value.toString(36).toUpperCase();
}
