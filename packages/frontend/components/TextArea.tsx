import React from "react";

interface TextAreaInterface {
  label: string
  id: string
  placeholderText: string
  width?: string
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  optional?: boolean
}

export default function Input({
  label,
  id,
  placeholderText,
  width = 'w-full',
  value,
  onChange,
  optional = false,
}: TextAreaInterface): JSX.Element {
  return (
    <>
      <div className={`${width} pb-10`}>
        <label
          htmlFor={id}
          className="text-m mb-2 block font-medium text-gray-900"
        >
          {label}
          {!optional && ' *'}
        </label>
        <textarea
          id={id}
          rows={4}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-black placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
          placeholder={placeholderText}
          value={value}
          onChange={onChange}
        ></textarea>
      </div>
    </>
  )
}
