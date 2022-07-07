import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEventHandler, useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from '../components/forms/Button';
import FormInput from '../components/forms/FormInput';
import Head from '../components/Head';
import NavBar from '../components/nav-bar/Navbar';
import TokenStorage from '../configs/TokenLocalStorage';
import { UserContext } from '../configs/UserContext';
import useFetch from '../hooks/useFetch';
import styles from '../styles/login.module.scss';

const message = 'Login to your account to get better results, history, and feedback';

function Login() {
  const { setConfig, user } = useContext(UserContext);
  const router = useRouter();

  const [loading, execute] = useFetch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // If user already logged in redirect to home
  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [router, user]);

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError('');
    execute({
      method: 'POST',
      endPoint: 'users/login',
      body: { email, password },
    }).then((res) => {
      // Wrong Email or password
      if (res.success === false) {
        setError('Wrong email or password');
        return;
      }

      const { accessToken, refreshToken, user } = res.data;
      setConfig({ accessToken, user });
      TokenStorage.setToken(refreshToken);
      router.replace('/');
    });
  };

  return (
    <div className="page-container">
      <Head title="Login" description={message} />
      <NavBar />

      <div className={styles.container}>
        <h1>Login</h1>
        <p>{message}</p>

        <Form className={styles.form} onSubmit={submit}>
          <FormInput onChange={(e) => setEmail(e.target.value)} value={email} title="Email" />
          <FormInput onChange={(e) => setPassword(e.target.value)} value={password} title="Password" type="password" />
          {error && <p>{error}</p>}

          <Button className={styles.submit} type={'submit'} disabled={loading}>
            Login
          </Button>
        </Form>

        {/* Registration */}
        <Link href="/registration">Create new account</Link>
      </div>
    </div>
  );
}

export default Login;
