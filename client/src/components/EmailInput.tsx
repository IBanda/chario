import React, { useState, useEffect } from 'react';
import validator from 'email-validator';

interface Props {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export default function EmailInput({ email, setEmail }: Props) {
  const [isValid, setValidity] = useState(true);

  useEffect(() => {
    if (email.length > 4) {
      setValidity(validator.validate(email));
    }
  }, [email]);

  return (
    <>
      <label
        htmlFor="email"
        className="text-gray-500 text-sm font-medium tracking-tighter mb-2"
      >
        Email
      </label>
      <input
        className={`border border-gray-50 shadow rounded p-3 focus:outline-none focus:ring mb-2 ${
          isValid ? '' : 'ring ring-red-500 ring-opacity-40'
        }`}
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </>
  );
}
