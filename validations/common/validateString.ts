export type validateStringType = {
  emptyErr?: string;
  min: number;
  minErr: string;
  max: number;
  maxErr: string;
  customPattern?: RegExp;
  invalidErr?: string;
};

export function validateString(value: string, validation: validateStringType) {
  const { emptyErr, invalidErr, customPattern, min, minErr, max, maxErr } = validation;
  let err = '';

  if (!value || String(value).trim() === '') {
    err = emptyErr || 'This field is required';
  } else if (typeof customPattern !== 'undefined' && !customPattern.test(value)) {
    err = invalidErr || 'Invalid value';
  } else if (value.length < min) {
    err = minErr;
  } else if (value.length > max) {
    err = maxErr;
  }

  return err;
}

export function generateValidateStringMessage(title: string, min: number, max: number, required = true, customPattern?: RegExp) {
  return {
    emptyErr: required ? `${title} is required` : '',
    min: min,
    minErr: `${title} must be at least ${min} characters`,
    max: max,
    maxErr: `${title} must be less than or equal to ${max} character`,
    customPattern,
    invalidErr: customPattern ? `${title} is invalid` : '',
  };
}
