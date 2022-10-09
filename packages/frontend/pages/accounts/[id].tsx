import { gql } from "@apollo/client";
import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import type { TAccount } from '../../models/subgraph-entities/account'

import { ParsedUrlQuery } from "querystring";
import Home from "..";

import client from "../../apollo-client";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Account({ account, session }: Props) {
  const { data, isError, isLoading } = useQuery([account.dataCID], fetchAccount)

  async function fetchAccount(): Promise<TAccount> {
    const cid = account.dataCID;
    const response = await fetch(`/api/ipfs-data?cid=${cid}`, {
      method: "GET",
    })
    if (!response.ok) {
      throw new Error("There was an error getting account metadata")
    }
    const json = await response.json();
    console.log(json)
    return json.file;
  }

  const name = (account: TAccount) => {
    if (account.firstName && account.lastName) return `${account.firstName} ${account.lastName}`
    return `${data.firstName} ${data.lastName}`
  }

  if (isError) {
    return <p>Something went wrong. Please try to refresh in a few minutes</p>
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-screen-xl py-8 px-4 pt-16 text-primary">
        <p>Loading... this could take a few minutes</p>
      </div>
    );
  }

  if (!session) {
    return <Home />
  }

  return (
    <div className="mx-auto max-w-screen-xl py-8 px-4 pt-16 text-primary">
      <div className="w-full px-6 py-6 mx-auto text-slate-500">
        <div className="relative flex flex-col flex-auto overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4" draggable="true">
          <div className="flex">
            <div className="w-full max-w-full px-1 mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12">
              <img src={account.profilePicURL || data.profilePicURL} alt="profile_image" className="w-50 h-25 shadow-soft-sm rounded" />
            </div>
            <div className="flex-none w-auto max-w-full px-3 my-auto">
              <div className="h-full">
                <h5 className="text-xl font-bold">
                  {name(account)}
                </h5>
                <p className="text-gray-400 text-md">{account.email || data.email}</p>
                <p className="mb-4 text-gray-400 text-md">{account.owner}</p>
                <p className="text-md">{account.organization || data.organization}</p>
                <p className="mb-0 font-semibold leading-normal text-size-sm">Total Campaigns: {account.totalCampaigns}</p>
                <p className="mb-0 font-semibold leading-normal text-size-sm">Total Donations: {account.totalDonations}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

const ACCOUNT_QUERY = gql`
  query Account($id: String!) {
    account(id: $id) {
      id
      dataCID
      firstName
      lastName
      email
      owner
      organization
      profilePicURL
      totalCampaigns
      totalDonations
    }
  }
`

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  const { id } = context.params as ParsedUrlQuery;
  const { data } = await client.query({
    query: ACCOUNT_QUERY,
    variables: {
      id: id,
    },
  });

  return {
    props: {
      account: data.account,
      session: session,
    },
  };
}
