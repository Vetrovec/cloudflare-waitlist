// z.coerce.boolean treats string value "false" as true
// Use this to prevent any confusion and treat any non-true/1 value as false
export function convertToBoolean(value) {
  return ["true", "1"].includes(value);
}
