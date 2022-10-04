import { gql } from '@apollo/client';
import client from '../../apollo-client';
import Card from '../../components/Card';
import { Campaign } from '../../models/subgraph-entities/campaign';
import formatTimestamp from '../../utils/formatTimestamp';
import { InferGetServerSidePropsType } from 'next';
import type { TCampaign } from '../../models/subgraph-entities/campaign';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Fundraisers({ campaigns }: Props) {
  return (
    <>
      <div className="mx-auto max-w-screen-xl py-8 px-5 pt-16 text-primary">
        <h1 className="mb-7 text-4xl font-extrabold leading-none tracking-tight text-black md:text-5xl lg:text-4xl">
          Fundraisers
        </h1>
        {!campaigns && <p>No fundraisers found</p>}
        {campaigns && (
          <ul
            role="list"
            className="py-5 grid gap-y-6 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3"
          >
            {campaigns.map((fundraiser) => (
              <li key={fundraiser.id}>
                <Card
                  id={fundraiser.id}
                  name={fundraiser.name}
                  accountName={fundraiser.account.firstName && fundraiser.account.lastName ? `${fundraiser.account.firstName} ${fundraiser.account.lastName}` : null}
                  accountId={fundraiser.account.id}
                  description={fundraiser.description}
                  goal={fundraiser.goal}
                  raised={fundraiser.donated}
                  endAt={formatTimestamp(fundraiser.endAt)}
                  image={fundraiser.imageURL}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

const CAMPAIGN_QUERY = gql`
  query Campaigns($id: String)  {
    campaigns {
      id
      name
      description
      goal
      donated
      imageURL
      dataCID
      startAt
      endAt
      category {
        id
        name
      }
      account {
        id
        firstName
        lastName
        organization
        dataCID
      }
    }
  }
`

export async function getServerSideProps({req, res}) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=14400, stale-while-revalidate=86400'
  )

  const { data } = await client.query({
    query: CAMPAIGN_QUERY
  });

  const campaigns = data.campaigns.map(async (c: TCampaign) => {
    const serialized = await serializeCampaign(c);
    return serialized
  })
  const allCampaigns = await Promise.all(campaigns);
  return {
    props: {
      campaigns: allCampaigns
    },
  };
}

async function serializeCampaign(attributes: TCampaign) {
  const campaign = new Campaign(attributes);
  const json = await campaign.serialize()
  return json;
}
