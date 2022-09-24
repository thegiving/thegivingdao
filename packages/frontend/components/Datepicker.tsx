interface DatePickerInterface {
  label?: string
  id: string
  placeholderText: string
}

const get_today = (id: string) => {
  if (id === 'start-date') {
    return new Date().toISOString().slice(0, 10)
  } else return ''
}

export default function DatePicker({
  label,
  id,
  placeholderText,
}: DatePickerInterface): JSX.Element {
  return (
    <>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="date"
          value={get_today(id)}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-black placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder={placeholderText}
        />
      </div>
    </>
  )
}
