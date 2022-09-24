import {
  Input,
  Select,
  Button,
  TextArea,
  DateRangePicker,
  ToggleSwitch,
  Alert,
  DatePicker
} from '../components/';

import Home from '.'
import NoAccountModal from '../components/NoAccountModal'
import { getSession } from 'next-auth/react'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { gql, useQuery } from "@apollo/client";
import client from "../apollo-client";
import { getToken } from 'next-auth/jwt'
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import connectContract from '../utils/connectContract';
import Head from 'next/head';
import Link from 'next/link';
import { start } from 'repl';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

function CreateFundraiser({ accounts, session, address }: Props) {
  const [imageURL, setImageURL] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [startAt, setStartAt] = useState("")
  const [endAt, setEndAt] = useState("")
  const [goal, setGoal] = useState("")
  const [category, setCategory] = useState("")
  const { data: campaignCategories, loading: campaignCategoriesLoading } = useQuery(GET_CATEGORIES);
  const [categories, setCategories] = useState<[]>();

  const [success, setSuccess] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [campaignId, setCampaignId] = useState<string | null>(null);

  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles: any) => {
      setImageURL(acceptedFiles[0]),
        setFiles(
          acceptedFiles.map((file: any) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
    },
  });

  useEffect(() => {
    if (!campaignCategoriesLoading) {
      const ccMap = campaignCategories.campaignCategories.map((category: any) => ({
        key: category.categoryId,
        fundraiser_type: category.name,
        value: category.categoryId
      }))
      setCategories(ccMap);
    }

    // Make sure to revoke the data uris to avoid memory leaks
    return () => files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files, campaignCategoriesLoading]);

  const thumbs = files.map((file: any) => (
    <div className="h-full w-full" key={file.name}>
      <img
        src={file.preview}
        className="mx-auto max-h-full max-w-full object-contain"
        alt="uploaded image"
        //Revoke data uri after image is loaded
        onLoad={() => { URL.revokeObjectURL(file.preview) }}
      />
    </div>
  ));

  async function handleSubmit(e: any) {
    e.preventDefault();
    const data = new FormData();
    data.append("image", imageURL);
    data.append("name", name);
    data.append("description", description);
    data.append("startAt", startAt)
    data.append("endAt", endAt);
    data.append("goal", goal);
    data.append("category", category)

    try {
      const response = await fetch("/api/ipfs-data", {
        method: "POST",
        body: data,
      });
      if (response.status !== 200) {
        alert("Oops! Something went wrong. Please refresh and try again.");
      } else {
        console.log("Form successfully submitted!");
        let responseJSON = await response.json();
        console.log('cid ' + responseJSON.cid)
        createCampaign(responseJSON.cid);
      }
    } catch (error) {
      alert(
        `Oops! Something went wrong. Please refresh and try again. Error ${error}`
      );
    }
  }

  const createCampaign = async (cid: string) => {
    try {
      const contract = connectContract();
      if (contract) {

        const txn = await contract.createCampaign(
          cid,
          '1',
          category,
          new Date(startAt).getTime(),
          new Date(endAt).getTime(),
          goal
        );
        setLoading(true);
        console.log("Creating Fundraiser...", txn.hash);
        let campaign = await txn.wait();
        console.log("Fundraiser Created -- ", txn.hash);

        setCampaignId(campaign.events[0].args[0].id);
        setSuccess(true);
        setLoading(false);
        setMessage("Your fundraiser has been created successfully.");
      } else {
        console.log("Error getting contract.");
      }
    } catch (error) {
      setSuccess(false);
      setMessage(`There was an error creating your fundraiser: ${error}`);
      setLoading(false);
      console.log(error);
    }
  };

  if (!accounts.length) {
    return <NoAccountModal />
  }

  if (!session) {
    return <Home />
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Create Fundraiser | The Giving</title>
        <meta
          name="description"
          content="Create your fundraiser on the blockchain"
        />
      </Head>
      <section className="relative py-12">
        {loading && (
          <Alert
            alertType={"loading"}
            alertBody={"Please wait"}
            triggerAlert={true}
            color={"white"}
          />
        )}
        {success && (
          <Alert
            alertType={"success"}
            alertBody={message}
            triggerAlert={true}
            color={"palegreen"}
          />
        )}
        {success === false && (
          <Alert
            alertType={"failed"}
            alertBody={message}
            triggerAlert={true}
            color={"palevioletred"}
          />
        )}
        {!success && (
          <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl mb-4">
            Create Fundraiser
          </h1>
        )}
        {!success && (
          <form
            onSubmit={handleSubmit}
            className="space-y-8 divide-y divide-gray-200"
          >
            <div className="mx-auto grid max-w-screen-xl py-8 px-4 pt-16 text-primary">
              <Input
                placeholderText={'Donate to end World Hunger'}
                id={'fundraiser-name'}
                label={'Name of Fundraiser'}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Select
                options={categories || []}
                label={'Select a Category for the fundraiser'}
                id={'fundraiser-category'}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <div className={'pb-10'}>
                <label
                  htmlFor={'date-range'}
                  className="text-m mb-2 block font-medium text-gray-900"
                >
                  Select a date range for the fundraiser
                </label>
                <div className="w-1/2 flex space-x-4">
                  <DatePicker
                    id={'start-date'}
                    placeholderText={'Select Start Date'}
                    value={startAt}
                    onChange={(e) => setStartAt(e.target.value)}
                  />
                  <DatePicker
                    id={'start-end'}
                    placeholderText={'Select End Date'}
                    value={endAt}
                    onChange={(e) => setEndAt(e.target.value)}
                  />
                </div>
              </div>
              <Input
                placeholderText={'100'}
                id={'fundraiser-amount'}
                label={'Fundraiser Goal in USD'}
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className='w-full pb-10'>
                <label
                  htmlFor={'upload-image'}
                  className="text-m mb-2 block font-medium text-gray-900"
                >
                  Upload a picture or video for your fundraiser
                </label>
                <div className="rounded-lg border bg-white p-4 sm:p-6">
                  <div
                    {...getRootProps({
                      className: "flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                    })}
                  >
                    <input {...getInputProps()} />
                    {thumbs.length > 0 ? (
                      thumbs
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          aria-hidden="true"
                          className="mb-3 h-10 w-10 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span> or drag
                          and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-8">
                <Button text={`Cancel`} buttonType={'Secondary'} onClick={e => window.history.back()} />
                <Button text={`Start Fundraiser`} buttonType={'Primary'} onClick={handleSubmit} />
              </div>
            </div>
          </form>
        )}
        {success && campaignId && (
          <div>
            Success! Please wait a few minutes, then check out your fundraiser page{" "}
            <span className="font-bold">
              <Link href={`/fundraisers/${campaignId}`}>here</Link>
            </span>
          </div>
        )}
      </section>
    </div>
  )
}

const GET_ACCOUNTS = gql`
  query Account($owner: String!) {
    accounts(where: { owner: $owner}) {
      id
      owner
      kind
    }
  }
`
const GET_CATEGORIES = gql`
  query CampaignCategory {
    campaignCategories {
      categoryId
      name
    }
  }
`
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const token = await getToken({ req: context.req });
  const address = token?.sub ?? null;

  let { data } = await client.query({
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

export default CreateFundraiser;

