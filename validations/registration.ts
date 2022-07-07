import { isValidObject } from './common/isValidObject';
import { generateValidateStringMessage, validateString } from './common/validateString';

type registrationType = {
  name: string;
  email: string;
  password: string;
};

export default function validateRegistration(inputs: registrationType) {
  const { name, email, password } = inputs;
  console.log(messages);

  const errors = {
    name: validateString(name, messages.name),
    email: validateString(email, messages.email),
    password: validateString(password, messages.password),
  };
  const valid = isValidObject(errors);

  return { valid, errors };
}

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const messages = {
  name: generateValidateStringMessage('Name', 5, 45),
  email: generateValidateStringMessage('Email', 8, 320, true, emailRegex),
  password: generateValidateStringMessage('Password', 6, 60),
};
