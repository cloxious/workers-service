export const DIGITS = "0123456789";
export const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
export const ALPHANUMERIC = DIGITS + UPPERCASE + LOWERCASE;

export function generateRandomString(length: number, charset: string): string {
  let result = "";
  const buffer = new Uint8Array(1);

  const maxValidByte = Math.floor(256 / charset.length) * charset.length;

  while (result.length < length) {
    crypto.getRandomValues(buffer);

    if (buffer[0] < maxValidByte) {
      result += charset[buffer[0] % charset.length];
    }
  }

  return result;
}
