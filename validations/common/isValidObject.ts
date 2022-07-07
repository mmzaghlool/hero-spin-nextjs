export function isValidObject(errors: Record<string, string>) {
  let valid = true;

  for (const key in errors) {
    if (Object.hasOwnProperty.call(errors, key)) {
      const element = errors[key];

      if (element) {
        valid = false;
      }
    }
  }

  return valid;
}
