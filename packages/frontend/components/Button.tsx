interface ButtonInterface {
	buttonType: string;
	text: string;
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function Button({
	buttonType,
	text,
	onClick
}: ButtonInterface): JSX.Element {
	if (buttonType === 'Secondary') {
		return (
			<>
				<button
					type="button"
					onClick={onClick}
					className="transition ease hover:scale-105 duration-75 bg-white text-primary text-md font-bold inline-flex justify-center items-center py-2 px-5 text-center rounded-md border border-primary dark:border-gray-400 dark:focus:ring-primary"
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
					onClick={onClick}
					className="transition ease hover:scale-105 duration-75 hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900 mr-3 items-center justify-center rounded-lg border border-gray-300 bg-primary py-3 px-5 text-center text-base font-medium text-white text-white shadow-md hover:shadow-lg focus:ring-4"
				>
					{text}
				</button>
			</>
		)
	} else {
		return <></>
	}
}
