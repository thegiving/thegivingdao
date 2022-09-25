import { gql } from "@apollo/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import Home from "..";

import client from "../../apollo-client";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Account({ account, session }: Props) {
  const [profile, setProfile] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [organization, setOrganization] = useState("")

  useEffect(() => {
    if (!account.profilePicURL) {
      const fetchData = async () => {
        const response = await getIPFSData(account.dataCID);
        const responseJSON = await response.json();
        const params = responseJSON.file
        setters(params)
      }
      fetchData().catch(console.error);
    } else {
      setters(account)
    }
  }, [])

  function setters(params: any) {
    setProfile(params.profilePicURL || params.image)
    setFirstName(params.firstName)
    setLastName(params.lastName)
    setEmail(params.email)
    setOrganization(params.organization)
  }

  if (!session) {
    return <Home />
  }

  async function getIPFSData(cid: string) {
    try {
      const response = await fetch(`/api/ipfs-data?cid=${cid}`, {
        method: "GET",
      });
      if (response.status !== 200) {
        alert("Oops! Something went wrong. Please refresh and try again.");
      } else {
        console.log("Got it!");
        return response;
      }
    } catch (error) {
      alert(
        `Oops! Something went wrong. Please refresh and try again. Error ${error}`
      );
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full px-6 py-6 mx-auto text-slate-500">
        <div className="relative flex flex-col flex-auto overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4" draggable="true">
          <div className="flex">
            <div className="w-full max-w-full px-1 mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12">
              <img src={profile} alt="profile_image" className="w-50 h-25 shadow-soft-sm rounded-xl" />
            </div>
            <div className="flex-none w-auto max-w-full px-3 my-auto">
              <div className="h-full">
                <h5 className="mb-1">
                  {`${firstName} ${lastName}`}
                </h5>
                <p className="mb-0 font-semibold leading-normal text-size-sm">Organziation: {organization}</p>
                <p className="mb-0 font-semibold leading-normal text-size-sm">Email: {email}</p>
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
      organization
      profilePicURL
      totalCampaigns
      totalDonations
      campaigns
    }
  }
`

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const token = await getToken({ req: context.req });
  const address = token?.sub ?? null;

  const { id } = context.params as ParsedUrlQuery;
  console.log(id);

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
      address: address
    },
  };
}
