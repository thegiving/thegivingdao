import { gql } from '@apollo/client'
import { useQuery } from '@tanstack/react-query'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import client from '../../apollo-client'
import Button from '../../components/Button'
import formatTimestamp from '../../utils/formatTimestamp'
import type { TCampaign } from '../../models/subgraph-entities/campaign'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Fundraiser({ campaign }: Props) {
  const router = useRouter();
  const { data, error, isError, isLoading } = useQuery([campaign.dataCID], fetchCampaign)

  async function fetchCampaign(): Promise<TCampaign> {
    const cid = campaign.dataCID;
    const response = await fetch(`/api/ipfs-data?cid=${cid}`, {
      method: "GET",
    })
    if (!response.ok) {
      throw new Error("There was an error getting campaign metadata")
    }
    const json = await response.json();
    return json.file;
  }

  if (isError) {
    return <p>error</p>
  }

  if (isLoading) {
    return (
      <div className="mx-auto grid max-w-screen-xl py-8 px-4 pt-16 text-primary">
        <p>Loading... this could take a few minutes</p>
      </div>
    );
  }

  return (
    <>
      {campaign && (
        <div className="mx-auto grid max-w-screen-xl py-8 px-4 pt-16 text-primary">
          <div className={'flex justify-between'}>
            <h1 className="mb-4 w-1/2 text-4xl  font-extrabold leading-none tracking-tight text-black md:text-5xl lg:text-4xl">
              {campaign.name || data.name}
            </h1>
            <div className={'w-1/4 justify-end'}>
              <div className={'flex justify-between'}>
                <p className=" text-sm  font-normal text-gray-700">
                  Goal
                </p>
                <p className="  text-sm font-normal text-gray-700">
                  ${campaign.goal}
                </p>
              </div>

              <div className={'flex justify-between'}>
                <p className=" text-sm font-normal text-gray-700">
                  Raised
                </p>
                <p className="  text-sm font-normal text-gray-700">
                  ${campaign.donated}
                </p>
              </div>

              <div className={'flex justify-between'}>
                <p className=" text-sm font-normal text-gray-700">
                  Starts At
                </p>
                <p className="  text-sm font-normal text-gray-700">
                  {campaign.startAt ? formatTimestamp(campaign.startAt) : '-'}
                </p>
              </div>

              <div className={'flex justify-between'}>
                <p className=" text-sm font-normal text-gray-700">
                  Ends At
                </p>
                <p className="  text-sm font-normal text-gray-700 ">
                  {campaign.endAt ? formatTimestamp(campaign.endAt) : '-'}
                </p>
              </div>
            </div>
          </div>

          <p className={'pt-8 pb-8 text-gray-900'}>{campaign.description || data.description}</p>
          <img
            className="rounded-t-lg"
            src={campaign.imageURL || data.imageURL}
          />
          <div className="flex justify-center space-x-8 pt-8">
            <Button text={`Back`} buttonType={'Secondary'} onClick={e => router.push('/fundraisers')} />
            <Button text={`Donate`} buttonType={'Primary'} />
          </div>
        </div>
      )}
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
      dataCID
      category {
        id
        name
      }
    }
  }
`

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as ParsedUrlQuery;
  // TODO: useQuery with gql to leverage query caching
  const { data } = await client.query({
    query: CAMPAIGN_QUERY,
    variables: {
      id: id,
    },
  });

  return {
    props: {
      campaign: data.campaign,
    },
  };
}
