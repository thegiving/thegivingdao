import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Alert from "../components/Alert";
import connectContract from "../utils/connectContract";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import Home from ".";
import { useDropzone } from 'react-dropzone';
import { Input, TextArea, Button } from "../components";


export default function CreateAccount({ address, session }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [profilePic, setProfilePic] = useState<File>();

  const [success, setSuccess] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);

  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles: any) => {
      setProfilePic(acceptedFiles[0]),
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
    // Make sure to revoke the data uris to avoid memory leaks
    return () => files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

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
    data.append("image", profilePic);
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("email", email);
    data.append("organization", organization);

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

  if (!session) {
    return <Home />
  }

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
              <div className='w-full pb-10'>
                <label
                  htmlFor={'upload-image'}
                  className="text-m mb-2 block font-medium text-gray-900"
                >
                  Upload Profile Pic
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
                <Button text={`Create Account`} buttonType={'Primary'} onClick={handleSubmit} />
              </div>
            </div>
          </form>
        )}
        {success && accountId && (
          <div>
            Success! Please wait a few minutes, then check out your profile page{" "}
            <span className="font-bold">
              <Link href={`/accounts/${accountId}`}>here</Link>
            </span>
          </div>
        )}
      </section>
    </div >
  );
}

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
