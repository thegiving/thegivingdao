import { gql } from '@apollo/client';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import Home from '..';
import client from '../../apollo-client';
import Card from '../../components/Card'
import formatTimestamp from '../../utils/formatTimestamp';
const fundraisers = [
  {
    id: 1,
    title: 'Donation for Kids',
    goal: 1500,
    fundsRaised: 100,
    fundraiserTill: '2022-12-12',
    image: '/placeholder-1.jpg',
  },
  {
    id: 1,
    title: 'Donation for Kids',
    goal: 1500,
    fundsRaised: 100,
    fundraiserTill: '2022-12-12',
    image: '/placeholder-1.jpg',
  },
  {
    id: 2,
    title: 'Donation for Kids',
    goal: 1500,
    fundsRaised: 100,
    fundraiserTill: '2022-12-12',
    image: '/placeholder-1.jpg',
  },
  {
    id: 3,
    title: 'Donation for Kids',
    goal: 1500,
    fundsRaised: 100,
    fundraiserTill: '2022-12-12',
    image: '/placeholder-1.jpg',
  },
  {
    id: 1,
    title: 'Donation for Kids',
    goal: 1500,
    fundsRaised: 100,
    fundraiserTill: '2022-12-12',
    image: '/placeholder-1.jpg',
  },
  {
    id: 2,
    title: 'Donation for Kids',
    goal: 1500,
    fundsRaised: 100,
    fundraiserTill: '2022-12-12',
    image: '/placeholder-1.jpg',
  },
  {
    id: 3,
    title: 'Donation for Kids',
    goal: 1500,
    fundsRaised: 100,
    image: '/placeholder-1.jpg',
  },
]
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;



export default function Fundraisers({campaigns, address, session}: Props) {
  const router = useRouter();

  if (!session) {
    return <Home />
  }


  return (
    <>
      <div className="mx-auto grid max-w-screen-xl py-8 px-4 pt-16 text-primary">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-black md:text-5xl lg:text-4xl">
          Fundraisers
        </h1>
        <div className={'flex max-w-screen-xl'}>
          {campaigns.map((fundraiser) => (
            <Card
              id={fundraiser.id}
              key={fundraiser.id}
              title={fundraiser.name}
              owner={`${fundraiser.account.firstName} ${fundraiser.account.lastName}`}
              description={fundraiser.description}
              goal={fundraiser.goal}
              fundsRaised={fundraiser.donated}
              endAt={formatTimestamp(fundraiser.endAt)}
              image={fundraiser.imageURL}
            />
          ))}
        </div>
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
      }
    }
  }
`

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const token = await getToken({ req: context.req });
  const address = token?.sub ?? null;

  const { data } = await client.query({
    query: CAMPAIGN_QUERY
  });

  return {
    props: {
      campaigns: data.campaigns,
      session: session,
      address: address
    },
  };
}

