import { useState, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import Alert from "../components/Alert";
import connectContract from "../utils/connectContract";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import Home from ".";
import { Input, TextArea, FileInput, Button } from "../components";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const token = await getToken({ req: context.req });
  const address = token?.sub ?? null;

  return {
    props: {
      address: address,
      session: session
    }
  }
}

export default function CreateAccount({ address, session }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState<string>();

  const [success, setSuccess] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);

  const thumbnailRef = useRef<HTMLInputElement>(null)

  if (!session) {
    return <Home />
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const ipfsData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      organization: organization,
      profilePicUrl: profilePicUrl || "/2022_giving_logo_v01-01.png"
    };

    try {
      const response = await fetch("/api/store-account-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ipfsData),
      });
      if (response.status !== 200) {
        alert("Oops! Something went wrong. Please refresh and try again.");
      } else {
        console.log("Form successfully submitted!");
        let responseJSON = await response.json();
        await createAccount(responseJSON.cid);
      }
    } catch (error) {
      alert(
        `Oops! Something went wrong. Please refresh and try again. Error ${error}`
      );
    }
  }

  const createAccount = async (cid: string) => {
    try {
      const contract = connectContract();
      if (contract) {
        const txn = await contract.createAccount(
          cid,
          '0',
        );
        setLoading(true);
        console.log("Creating Account...", txn.hash);
        let account = await txn.wait();
        console.log("Account Created -- ", txn.hash);

        setAccountId(account.events[0].args.accountId);
        setSuccess(true);
        setLoading(false);
        setMessage("Your account has been created successfully.");
      } else {
        console.log("Error getting contract.");
      }
    } catch (error) {
      setSuccess(false);
      setMessage(`There was an error creating your account: ${error}`);
      setLoading(false);
      console.log(error);
    }
  };


  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Create your profile | The Giving</title>
        <meta
          name="description"
          content="Create your profile"
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
            Create your profile
          </h1>
        )}
        {!success && (
          <form
            onSubmit={handleSubmit}
            className="space-y-8 divide-y divide-gray-200"
          >
            <div className="mx-auto grid max-w-screen-xl py-8 px-4 pt-16 text-primary">
              <Input
                placeholderText={'Your first name'}
                id={'last-name'}
                label={'Your First Name'}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                placeholderText={'Your last name'}
                id={'last-name'}
                label={'Your last Name'}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextArea
                label={'Email'}
                id={'email'}
                placeholderText={
                  'you@example.com'
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextArea
                label={'Organization Description'}
                id={'org-description'}
                placeholderText={
                  'Please provide some information about yourself or your oraganization'
                }
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
              <FileInput
                label={'Upload Images and Videos related to the Fundraiser'}
                id={'file-input'}
                value={profilePicUrl}
                onChange={(e) => setProfilePicUrl(e.target.value)}
              />
              <div className="flex justify-end space-x-8">
                <Button text={`Cancel`} buttonType={'Secondary'} onClick={e => window.history.back()} />
                <Button text={`Create Accoumt`} buttonType={'Primary'} onClick={handleSubmit} />
              </div>
            </div>
          </form>
        )}
        {success && accountId && (
          <div>
            Success! Please wait a few minutes, then check out your profile page{" "}
            <span className="font-bold">
              <Link href={`/account/${accountId}`}>here</Link>
            </span>
          </div>
        )}
      </section>
    </div >
  );
}
