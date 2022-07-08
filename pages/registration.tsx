import { setCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEventHandler, useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from '../components/forms/Button';
import FormInput from '../components/forms/FormInput';
import Head from '../components/Head';
import NavBar from '../components/nav-bar/Navbar';
import TokenStorage from '../configs/TokenLocalStorage';
import { UserContext } from '../configs/UserContext';
import useFetch from '../hooks/useFetch';
import styles from '../styles/registration.module.scss';
import RegistrationCodes from '../types/RegistrationCodes';
import validateRegistration from '../validations/registration';

const message = 'Register new account to get better results, history, and feedback';

function Registration() {
  const { setConfig, user } = useContext(UserContext);
  const router = useRouter();

  const [loading, execute] = useFetch();
  const [inputs, setInputs] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });

  // If user already logged in redirect to home
  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [router, user]);

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (loading) return;

    const { valid, errors: errs } = validateRegistration(inputs);
    setErrors(errs);

    if (!valid) {
      return;
    }

    execute({
      method: 'POST',
      endPoint: 'users/registration',
      body: inputs,
    }).then((res) => {
      if (res.success === false) {
        if (res.code === RegistrationCodes.EMAIL_USED) {
          setErrors((p) => ({ ...p, email: 'Email is already used' }));
        }
        return;
      }

      // Login user
      const { accessToken, refreshToken, user } = res.data;
      setConfig({ accessToken, user });
      TokenStorage.setToken(refreshToken);
      setCookie('ACCESS', accessToken, { maxAge: 60 * 12 });
      setCookie('UID', user.uid, { maxAge: 60 * 12 });
      router.replace('/');
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, accessKey } = e.target;
    setInputs((p) => ({ ...p, [accessKey]: value }));
  };

  return (
    <div className="page-container">
      <Head title="Registration" description={message} />
      <NavBar />

      <div className={styles.container}>
        <h1>Registration</h1>
        <p>{message}</p>

        <Form className={styles.form} onSubmit={submit}>
          <FormInput onChange={handleChange} accessKey="name" value={inputs.name} title="Name" error={errors.name} />
          <FormInput onChange={handleChange} accessKey="email" value={inputs.email} title="Email" error={errors.email} />
          <FormInput
            onChange={handleChange}
            accessKey="password"
            value={inputs.password}
            title="Password"
            error={errors.password}
            type="password"
          />

          <Button type="submit" className={styles.submit} disabled={loading}>
            Register
          </Button>
        </Form>

        {/* Registration */}
        <Link href="/login">Already have an account ?</Link>
      </div>
    </div>
  );
}

export default Registration;
