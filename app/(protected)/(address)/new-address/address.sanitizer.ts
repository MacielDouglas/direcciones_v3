import { GENDER_REGEX, NATIONALITY_REGEX } from "./address.regex";

function maskWord(word: string): string {
  return "*".repeat(word.length);
}

export function sanitizeAddressInfo(text: string): string {
  return text
    .replace(GENDER_REGEX, (match) => maskWord(match))
    .replace(NATIONALITY_REGEX, (match) => maskWord(match));
}
