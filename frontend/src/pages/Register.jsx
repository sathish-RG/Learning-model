import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthLayout from '../components/layout/AuthLayout';
import FormField from '../components/ui/FormField';
import FormAlert from '../components/ui/FormAlert';
import SubmitButton from '../components/ui/SubmitButton';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { PROJECT_NAME, ROUTES } from '../utils/constants';
import { toFieldErrors } from '../utils/forms';
import { clearAuthError, register, selectAuth } from '../redux/slices/authSlice';

export default function Register() {
  useDocumentTitle('Create account');
  const dispatch = useDispatch();
  const location = useLocation();
  const { status, error } = useSelector(selectAuth);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const fieldErrors = toFieldErrors(error?.details);
  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(form));
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle={`Learn the 20% that matters and build ${PROJECT_NAME}.`}
      footer={
        <>
          Already have an account?{' '}
          <Link to={ROUTES.login} state={location.state} className="font-medium text-accent hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && !error.details && <FormAlert>{error.message}</FormAlert>}
        <FormField
          id="name"
          label="Name"
          autoComplete="name"
          required
          maxLength={50}
          autoFocus
          value={form.name}
          onChange={handleChange}
          error={fieldErrors.name}
        />
        <FormField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={handleChange}
          error={fieldErrors.email}
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          maxLength={128}
          hint="At least 8 characters."
          value={form.password}
          onChange={handleChange}
          error={fieldErrors.password}
        />
        <SubmitButton loading={status === 'loading'}>Create account</SubmitButton>
      </form>
    </AuthLayout>
  );
}
