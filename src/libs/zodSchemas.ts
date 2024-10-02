import { number, z } from "zod";
import { ClientErrors } from "./errorCodes";

export const emailSchema = z.string().email(ClientErrors.ClientEmailNotValid.message);

export const mustContain = ["?", ".", "_", "-", "&", "!", "@", "#"];
export const passwordSchema = z
  .string()
  .min(8, ClientErrors.ClientPasswordTooShort.message)
  .refine((val) => mustContain.some((c) => val.includes(c)), ClientErrors.ClientPasswordMustIncludeSpecial.message)
  .refine((val) => /[A-Z]/.test(val), ClientErrors.ClientPasswordMustIncludeSpecial.message);

const toNumber = (val: string | number) => {
  val = val.toString();
  // Remove non-numeric characters except for '.' and ','
  let cleaned = val.replace(/[^0-9.,]/g, "");

  // Handle commas as decimal separators (European style)
  if (cleaned.includes(",")) {
    // Remove thousand separators (.)
    cleaned = cleaned.replace(/\./g, "");
    // Replace comma with dot to handle as decimal point
    cleaned = cleaned.replace(/,/g, ".");
  } else {
    // Remove thousand separators (,)
    cleaned = cleaned.replace(/,/g, "");
  }

  // Convert to float
  const number = parseFloat(cleaned);

  // Handle NaN case
  if (isNaN(number)) {
    return 0;
  }

  return number;
};
export const customNumberSchema = z.string().or(number()).transform(toNumber);
