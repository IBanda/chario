import React from 'react';

interface Props {
  id: string;
  type?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  className?: string;
  autoComplete?: string | undefined;
}

export default function AuthInput({
  id,
  type = 'text',
  value,
  setValue,
  label,
  className,
  autoComplete,
}: Props) {
  return (
    <>
      <label
        htmlFor={id}
        className="text-gray-500 text-sm font-medium tracking-tighter mb-2"
      >
        {label}
      </label>
      <input
        className={`border border-gray-50 shadow rounded p-3 focus:outline-none focus:ring mb-2 ${className}`}
        type={type}
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        autoComplete={autoComplete}
      />
    </>
  );
}
