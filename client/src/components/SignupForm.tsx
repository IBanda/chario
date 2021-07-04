import { useState } from 'react';
import EmailInput from './EmailInput';
import AuthInput from './AuthInput';

export default function SignupForm() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpswd, setConfirmpswd] = useState('');

  const isMissMatch =
    password.trim() && confirmpswd.trim() && password !== confirmpswd;

  return (
    <form className="flex flex-col max-w-sm md:w-96 w-full  p-2  ">
      <EmailInput email={email} setEmail={setEmail} />
      <div className="grid grid-cols-2 gap-4 flex flex-col">
        <span>
          <AuthInput
            id="fname"
            value={fname}
            setValue={setFname}
            label={'First Name'}
            className="w-full"
          />
        </span>
        <span>
          <AuthInput
            id="lname"
            value={lname}
            setValue={setLname}
            label={'Last Name'}
            className="w-full"
          />
        </span>
      </div>
      <AuthInput
        id="password"
        type="password"
        value={password}
        setValue={setPassword}
        label="Password"
        autoComplete="new-password"
      />
      <AuthInput
        className={`${isMissMatch ? 'ring ring-red-500 ring-opacity-40' : ''} `}
        type="password"
        id="confirmpswd"
        value={confirmpswd}
        label="Confirm Password"
        setValue={setConfirmpswd}
        autoComplete="new-password"
      />
      <span className="text-sm text-gray-500">
        By proceeding, you agree to the{' '}
        <span className="text-blue-500">Terms and Conditions</span>
      </span>
      <button
        className="text-white font-medium text-lg tracking-tighter bg-blue-500 rounded chario__custom-shadow-blue p-4 mt-4 focus:ring"
        type="submit"
        disabled={Boolean(isMissMatch)}
      >
        Sign up
      </button>
    </form>
  );
}
