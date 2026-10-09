import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthLayout from '../components/layout/AuthLayout';
import FormField from '../components/ui/FormField';
import FormAlert from '../components/ui/FormAlert';
import SubmitButton from '../components/ui/SubmitButton';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { ROUTES } from '../utils/constants';
import { toFieldErrors } from '../utils/forms';
import { clearAuthError, login, selectAuth } from '../redux/slices/authSlice';

export default function Login() {
  useDocumentTitle('Log in');
  const dispatch = useDispatch();
  const location = useLocation();
  const { status, error } = useSelector(selectAuth);
  const [form, setForm] = useState({ email: '', password: '' });

  // Don't carry an error over from another page
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const fieldErrors = toFieldErrors(error?.details);
  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to keep your streak going."
      footer={
        <>
          New to DevPrep?{' '}
          {/* Keep the original destination if the user switches to sign-up */}
          <Link to={ROUTES.register} state={location.state} className="font-medium text-accent hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && !error.details && <FormAlert>{error.message}</FormAlert>}
        <FormField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          autoFocus
          value={form.email}
          onChange={handleChange}
          error={fieldErrors.email}
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          required
          value={form.password}
          onChange={handleChange}
          error={fieldErrors.password}
        />
        <SubmitButton loading={status === 'loading'}>Log in</SubmitButton>
      </form>
    </AuthLayout>
  );
}
