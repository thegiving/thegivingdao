import { gql } from '@apollo/client'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getToken } from 'next-auth/jwt'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import Home from '..'
import client from '../../apollo-client'
import Button from '../../components/Button'
import formatTimestamp from '../../utils/formatTimestamp'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Fundraiser({campaign, address, session}: Props) {
  const router = useRouter();

  if (!session) {
    return <Home />
  }
  return (
    <>
      <div className="mx-auto grid max-w-screen-xl py-8 px-4 pt-16 text-primary">
        <div className={'flex justify-between'}>
          <h1 className="mb-4 w-1/2 text-4xl  font-extrabold leading-none tracking-tight text-black md:text-5xl lg:text-4xl">
            {campaign.name}
          </h1>
          <div className={'w-1/4 justify-end'}>
            <div className={'flex justify-between'}>
              <p className=" text-sm  font-normal text-gray-700 text-gray-400 ">
                Goal
              </p>
              <p className="  text-sm font-normal text-gray-700 text-gray-400 ">
                ${campaign.goal}
              </p>
            </div>

            <div className={'flex justify-between'}>
              <p className=" text-sm font-normal text-gray-700 text-gray-400 ">
                Funds Raised
              </p>
              <p className="  text-sm font-normal text-gray-700 text-gray-400 ">
                ${campaign.donated}
              </p>
            </div>

            <div className={'flex justify-between'}>
              <p className=" text-sm font-normal text-gray-700 text-gray-400 ">
                Starts At
              </p>
              <p className="  text-sm font-normal text-gray-700 text-gray-400 ">
                {formatTimestamp(campaign.startAt)}
                {!campaign.startAt && '-'}
              </p>
            </div>

            <div className={'flex justify-between'}>
              <p className=" text-sm font-normal text-gray-700 text-gray-400 ">
                Ends At
              </p>
              <p className="  text-sm font-normal text-gray-700 text-gray-400 ">
                {formatTimestamp(campaign.endAt)}
                {!campaign.endAt && '-'}
              </p>
            </div>
          </div>
        </div>

        <p className={'pt-8 pb-8 text-gray-900'}>{campaign.description}</p>
        <img
          className="rounded-t-lg"
          src={campaign.imageURL}
        />
        <div className="flex justify-center space-x-8 pt-8">
          <Button text={`Back`} buttonType={'Secondary'} onClick={e => router.push('/') } />
          <Button text={`Donate`} buttonType={'Primary'} />
        </div>
      </div>
    </>
  )
}

const CAMPAIGN_QUERY = gql`
  query Campaign($id: String!) {
    campaign(id: $id) {
      id
      name
      description
      goal
      donated
      imageURL
      startAt
      endAt
      category {
        id
        name
      }
    }
  }
`

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const token = await getToken({ req: context.req });
  const address = token?.sub ?? null;

  const { id } = context.params as ParsedUrlQuery;
  const { data } = await client.query({
    query: CAMPAIGN_QUERY,
    variables: {
      id: id,
    },
  });

  return {
    props: {
      campaign: data.campaign,
      session: session,
      address: address
    },
  };
}
