import { useState } from 'react';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpswd, setConfirmpswd] = useState('');
  return (
    <form className="flex flex-col max-w-sm md:w-96 w-full  p-2  ">
      <label
        htmlFor="name"
        className="text-gray-500 text-sm font-medium tracking-tighter mb-2"
      >
        Name
      </label>
      <input
        className="border border-gray-50 shadow rounded p-3 focus:outline-none focus:ring mb-2"
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label
        htmlFor="email"
        className="text-gray-500 text-sm font-medium tracking-tighter mb-2"
      >
        Email
      </label>
      <input
        className="border border-gray-50 shadow rounded p-3 focus:outline-none focus:ring mb-2"
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label
        htmlFor="password"
        className="text-gray-500 text-sm font-medium tracking-tighter mb-2"
      >
        Password
      </label>
      <input
        className="border border-gray-50 shadow rounded p-3 focus:outline-none focus:ring mb-2"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label
        htmlFor="confirmpswd"
        className="text-gray-500 text-sm font-medium tracking-tighter mb-2"
      >
        Confirm Password
      </label>
      <input
        className="border border-gray-50 shadow rounded p-3 focus:outline-none focus:ring mb-2"
        type="password"
        id="confirmpswd"
        value={confirmpswd}
        onChange={(e) => setConfirmpswd(e.target.value)}
        required
      />
      <span className="text-sm text-gray-500">
        By proceeding, you agree to the{' '}
        <span className="text-blue-500">Terms and Conditions</span>
      </span>
      <button
        className="text-white font-medium text-lg tracking-tighter bg-blue-500 rounded chario__custom-shadow-blue p-4 mt-4 focus:ring"
        type="submit"
      >
        Sign up
      </button>
    </form>
  );
}
