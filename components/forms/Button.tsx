import { Button as Btn, ButtonProps } from 'react-bootstrap';
import styles from './Button.module.scss';

type P = {} & ButtonProps;

const Button = ({ children, className, ...props }: P) => {
  return (
    <Btn className={`${styles.button} ${className}`} {...props}>
      {children}
    </Btn>
  );
};

export default Button;
