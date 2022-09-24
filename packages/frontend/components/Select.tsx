interface OptionsInterface {
  fundraiser_type: string
  value: string
  key: number
}

interface InputInterface {
  options: Array<OptionsInterface>
  label: string
  id: string
  width?: string
  optional?: boolean
}

export default function Input({
  label,
  options,
  id,
  width = 'w-1/2',
  optional = false,
}: InputInterface): JSX.Element {
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
        <select
          id={id}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        >
          {options.map((option) => (
            <option key={option.key} value={option.value}>
              {option.fundraiser_type}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}
