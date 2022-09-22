import { fallbackHttpConfig } from '@apollo/client'
interface InputInterface {
  placeholderText: string
  label: string
  id: string
  width?: string
  optional?: boolean
}

export default function Input({
  placeholderText,
  label,
  id,
  width = 'w-1/2',
  optional = false,
}: InputInterface): JSX.Element {
  return (
    <>
      <div className={`${width}  pb-10`}>
        {label && (
          <label
            htmlFor={id}
            className="text-m mb-2 block font-medium text-gray-900"
          >
            {label}
            {!optional && ' *'}
          </label>
        )}
        <input
          type="text"
          id={id}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-black placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
          placeholder={placeholderText}
          required
        />
      </div>
    </>
  )
}
