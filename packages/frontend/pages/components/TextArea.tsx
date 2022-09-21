interface TextAreaInterface {
  label: string
  id: string
  placeholderText: string
  width?: string
}

export default function Input({
  label,
  id,
  placeholderText,
  width = 'w-full',
}: TextAreaInterface): JSX.Element {
  return (
    <>
      <div className={`${width} pt-2 pb-2`}>
        <label
          htmlFor={id}
          className="text-m mb-2 block font-medium text-gray-900"
        >
          {label}
        </label>
        <textarea
          id={id}
          rows={4}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          placeholder={placeholderText}
        ></textarea>
      </div>
    </>
  )
}
