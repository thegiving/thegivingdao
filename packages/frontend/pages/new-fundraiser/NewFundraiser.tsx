import Input from '../components/Input'
import Select from '../components/Select'
import TextArea from '../components/TextArea'
import FileInput from '../components/FileInput'
import DateRangePicker from '../components/DateRangePicker'
import ToggleSwitch from '../components/ToggleSwitch'
import { fundraiserOptions } from '../../constants/FundraiserOptions'
import Button from '../components/Button'

export default function NewFundraiser() {
  return (
    <>
      <div className="mx-auto grid max-w-screen-xl py-8 px-4 pt-16 text-primary">
        <Input
          placeholderText={'Donate to end World Hunger'}
          id={'fundraiser-name'}
          label={'Name of Fundraiser'}
        />
        <Select
          options={fundraiserOptions}
          label={'Select a Category for the fundraiser'}
          id={'fundraiser-category'}
        />
        <DateRangePicker
          label={'Select a Date Range for the Fundraiser'}
          optional={true}
        />
        <Input
          placeholderText={'100'}
          id={'fundraiser-amount'}
          label={'Fundraiser Goal in USD'}
        />
        <ToggleSwitch
          label={'Accept only stablecoins?'}
          id={'accept-only-stablecoins'}
          offText={'No'}
          onText={'Yes'}
        />
        <TextArea
          label={'Fundraiser Description'}
          id={'fundraiser-description'}
          placeholderText={
            'Please provide a description about who funds gathered from the fundraiser will be used'
          }
        />
        <FileInput
          label={'Upload Images and Videos related to the Fundraiser'}
          id={'file-input'}
        />
        <div className="flex justify-end space-x-8">
          <Button text={`Cancel`} buttonType={'Secondary'} />
          <Button text={`Start Fundraiser`} buttonType={'Primary'} />
        </div>
      </div>
    </>
  )
}
