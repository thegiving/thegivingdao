import DatePicker from './Datepicker';

interface DatePickerInterface {
	label?: string
	id?: string
	width?: string
	placeholderText?: string
}

export default function Input({
	label,
	id,
	placeholderText,
	width = 'w-1/2',
}: DatePickerInterface): JSX.Element {
	return (
		<>
			<div className={`${width} flex pt-2 pb-2`}>
				<DatePicker id={'start-date'} placeholderText={'Select Start Date'} />
				<DatePicker id={'start-end'} placeholderText={'Select End Date'} />
			</div>
		</>
	)
}