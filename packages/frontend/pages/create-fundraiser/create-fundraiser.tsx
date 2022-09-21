import Input from '../../components/Input'
import Select from '../../components/Select'
import TextArea from '../../components/TextArea'
import FileInput from '../../components/FileInput'
import DateRangePicker from '../../components/DateRangePicker'

const fundraiserOptions = [
  { fundraiser_type: 'Environment', value: 'environment', key: 1 },
  { fundraiser_type: 'Business', value: 'business', key: 2 },
  { fundraiser_type: 'Education', value: 'education', key: 3 },
  { fundraiser_type: 'Medical', value: 'medical', key: 4 },
  { fundraiser_type: 'Animal Rights', value: 'animal_rights', key: 5 },
  { fundraiser_type: 'Human Rights', value: 'human_rights', key: 6 },
]

export default function CreateFundraiser() {
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
        <TextArea
          label={'Fundraiser Description'}
          id={'fundraiser-description'}
          placeholderText={
            'Please provide a description about who funds gathered from the fundraiser will be used'
          }
        />
        <FileInput label={'FileInput'} id={'file-input'} />
        <DateRangePicker />
      </div>
    </>
  )
}
