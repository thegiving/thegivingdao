import { useState } from 'react'
import { Switch } from '@headlessui/react'
import Image from 'next/image'

interface CardInterface {
  title: string
  goal: number
  fundsRaised: number
  fundraiserTill?: string
  image: string
}

export default function Card({
  title,
  goal,
  fundsRaised,
  fundraiserTill,
  image,
}: CardInterface): JSX.Element {
  return (
    <div className={`w-1/3 pb-10`}>
      <a href="#">
        <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow-md ">
          <img className="rounded-t-lg" src={image} />
          <svg className={'sr-only'}>{title}</svg>
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">
              {title}
            </h5>
            <div className={'flex justify-between'}>
              <p className="mb-3 font-normal text-gray-700 text-gray-400 ">
                Goal
              </p>
              <p className=" mb-3 font-normal text-gray-700 text-gray-400 ">
                {goal} $
              </p>
            </div>

            <div className={'flex justify-between'}>
              <p className="mb-3 font-normal text-gray-700 text-gray-400 ">
                Funds Raised
              </p>
              <p className=" mb-3 font-normal text-gray-700 text-gray-400 ">
                {fundsRaised} $
              </p>
            </div>

            <div className={'flex justify-between'}>
              <p className="mb-3 font-normal text-gray-700 text-gray-400 ">
                Fundraiser Till
              </p>
              <p className=" mb-3 font-normal text-gray-700 text-gray-400 ">
                {fundraiserTill}
                {!fundraiserTill && '-'}
              </p>
            </div>

            {/*<a*/}
            {/*  href="#"*/}
            {/*  className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"*/}
            {/*>*/}
            {/*  Read more*/}
            {/*  <svg*/}
            {/*    aria-hidden="true"*/}
            {/*    className="ml-2 -mr-1 h-4 w-4"*/}
            {/*    fill="currentColor"*/}
            {/*    viewBox="0 0 20 20"*/}
            {/*    xmlns="http://www.w3.org/2000/svg"*/}
            {/*  >*/}
            {/*    <path*/}
            {/*      fillRule="evenodd"*/}
            {/*      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"*/}
            {/*      clipRule="evenodd"*/}
            {/*    ></path>*/}
            {/*  </svg>*/}
            {/*</a>*/}
          </div>
        </div>
      </a>
    </div>
  )
}
