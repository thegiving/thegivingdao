import Link from "next/link"
import Image from "next/image";
import Button from "./Button";
import router from "next/router";

interface ICard {
  id: string
  goal: number
  accountId?: string
  raised: number
  accountName?: string
  name?: string
  image?: string
  endAt?: string
  description?: string
}

export default function Card({
  id,
  accountName,
  accountId,
  name,
  goal,
  raised,
  image,
  description,
}: ICard): JSX.Element {
  return (
    <div className={"group bg-white max-w-s relative shadow-md border rounded-lg focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-lightblue-400 transition ease-in ease-out hover:scale-105 duration-5"}>
      <div className="w-full rounded-t-lg bg-gray-100 aspect-h-7 aspect-w-9  overflow-hidden relative group-hover:opacity-75">
        {image && <Image src={image} priority={true} alt="fundraiser image" layout="fill" />}
        <Link href={`/fundraisers/${id}`}>
          <a></a>
        </Link>
      </div>
      <div className="p-5 block">
        <h1 className="text-base font-medium text-gray-900 mb-0.5 -mt-1.5 lg:text-lg">
          {name}
        </h1>
        <p className="text-sm text-gray-400 hover:underline">
          <Link href={`/account/${accountId}`}>
            <a className="hover:underline">
              {accountName}
            </a>
          </Link>
        </p>
        <p className="pb-3 pt-3 lg:text-md text-base text-gray-600">
          {description}
        </p>
        <hr className="mb-2" />
        <div className="grid grid-cols-3 pb-1 pt-2 text-md">
          <div className="col-span-2">
            <span className="font-bold">${raised} raised of</span>
            <span className="pl-1">${goal}</span>
          </div>

          <span className="justify-self-center ">
            <button
              type="button"
              onClick={(e) => router.push(`/fundraisers/${id}`)}
              className="transition ease hover:scale-105 duration-75 hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900 items-center justify-center rounded-lg bg-primary py-1 px-5 text-center text-sm font-normal text-white hover:shadow-lg focus:ring-4"
            >
              Donate
            </button>
          </span>
        </div>
      </div>
    </div>
  )
}
