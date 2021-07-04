import { useState } from 'react';
import EmailInput from './EmailInput';
import AuthInput from './AuthInput';
import { Link } from 'react-router-dom';

export default function SigninForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className="flex flex-col max-w-sm md:w-96 w-full  p-2  ">
      <EmailInput email={email} setEmail={setEmail} />
      <AuthInput
        id="password"
        type="password"
        value={password}
        setValue={setPassword}
        label="Password"
        autoComplete="old-password"
      />
      <button
        className="text-white font-medium text-lg tracking-tighter bg-blue-500 rounded chario__custom-shadow-blue p-4 mt-4 focus:ring"
        type="submit"
      >
        Sign up
      </button>
      <span className="text-sm text-gray-500 mt-8">
        New to Chario?{' '}
        <Link className="text-blue-500" to="/signup">
          Get started
        </Link>
      </span>
    </form>
  );
}
