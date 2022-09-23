import {
  Input,
  Select,
  Button,
  TextArea,
  FileInput,
  DateRangePicker,
  ToggleSwitch
} from '../components/';

import Home from '.'
import NoAccountModal from '../components/NoAccountModal'
import { fundraiserOptions } from '../constants/FundraiserOptions';;
import { getSession } from 'next-auth/react'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { getToken } from 'next-auth/jwt'


const GET_ACCOUNTS = gql`
  query Account($owner: String!) {
    accounts(where: { owner: $owner}) {
      id
      owner
      kind
    }
  }
`
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const token = await getToken({ req: context.req });
  const address = token?.sub ?? null;

  const { data } = await client.query({
    query: GET_ACCOUNTS,
    variables: {
      owner: address,
    },
  });

  return {
    props: {
      accounts: data.accounts,
      address: address,
      session: session
    }
  }
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

function CreateFundraiser({ accounts, session, address }: Props) {
  if (!accounts.length) {
    return <NoAccountModal />
  }

  if (!session) {
    return <Home />
  }

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

export default CreateFundraiser;

