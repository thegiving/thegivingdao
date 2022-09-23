import { useState } from 'react'
import { Switch } from '@headlessui/react'

interface ToggleInterface {
  label: string
  id: string
  offText: string
  onText: string
  optional?: boolean
}

export default function ToggleSwitch({
  label,
  id,
  onText,
  offText,
  optional = false,
}: ToggleInterface): JSX.Element {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className={`pb-10`}>
      <label
        htmlFor={id}
        className="text-m mb-2 block font-medium text-gray-900"
      >
        {label}
        {!optional && ' *'}
      </label>

      <div className={'flex space-x-2'}>
        <p className={'text-black'}>{offText}</p>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
        <p className={'text-black'}>{onText}</p>
      </div>
    </div>
  )
}
