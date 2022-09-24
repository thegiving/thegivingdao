import DatePicker from "./Datepicker";
interface DatePickerInterface {
  label: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string
  width?: string
  placeholderText?: string
  optional?: boolean
}

export default function Input({
  label,
  id,
  value,
  onChange,
  placeholderText,
  width = 'w-1/2',
  optional = false,
}: DatePickerInterface): JSX.Element {
  return (
    <>
      <div className={'pb-10'}>
        <label
          htmlFor={id}
          className="text-m mb-2 block font-medium text-gray-900"
        >
          {label}
          {!optional && ' *'}
        </label>
        <div className={`${width} flex space-x-4 `}>
          <DatePicker id={'start-date'} placeholderText={'Select Start Date'} value={value} onChange={onChange}/>
          <DatePicker id={'start-end'} placeholderText={'Select End Date'} value={value} onChange={onChange}/>
        </div>
      </div>
    </>
  )
}
