import React from 'react';
import { Form, FormControlProps } from 'react-bootstrap';
import styles from './FormInput.module.scss';

export type FormInputProps = FormControlProps & {
  title?: string;
  required?: boolean;
  error?: string;
};

const FormInput = ({ title, required, error, ...props }: FormInputProps) => {
  return (
    <Form.Group className={styles.input}>
      {title && <Form.Label className={`${required ? styles.required : ''}`}>{title}</Form.Label>}
      <Form.Control placeholder={title} isInvalid={!!error} {...props} />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormInput;
