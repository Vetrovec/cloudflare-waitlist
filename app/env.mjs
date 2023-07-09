// z.coerce.boolean treats string value "false" as true
// Use this to prevent any confusion and treat any non-true/1 value as false
export const convertToBoolean = (value) => ["true", "1"].includes(value);
