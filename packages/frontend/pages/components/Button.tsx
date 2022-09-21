interface ButtonInterface {
  buttonType: string
  text: string
}

export default function Button({
  buttonType,
  text,
}: ButtonInterface): JSX.Element {
  if (buttonType === 'Secondary') {
    return (
      <>
        <button
          type="button"
          className="dark:text-primary-200 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white py-3 px-5 text-center font-medium shadow-md hover:shadow-lg dark:border-gray-400 dark:focus:ring-primary"
        >
          {text}
        </button>
      </>
    )
  } else if (buttonType === 'Primary') {
    return (
      <>
        <button
          type="button"
          className="hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900 mr-3 items-center justify-center rounded-lg border border-gray-300 bg-primary py-3 px-5 text-center text-base font-medium text-white text-white shadow-md hover:shadow-lg focus:ring-4"
        >
          {text}
        </button>
      </>
    )
  } else {
    return <></>
  }
}
