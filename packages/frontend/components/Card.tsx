interface CardInterface {
  id: string
  title: string
  goal: number
  owner: string
  fundsRaised: number
  image: string
  description?: string
  endAt?: string
}

export default function Card({
  id,
  owner,
  title,
  goal,
  fundsRaised,
  endAt,
  image,
  description
}: CardInterface): JSX.Element {
  return (
    <div key={id} className={`w-1/3 transition ease-in ease-out hover:scale-105 duration-5`}>
      <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow-md">
        <a href={`/fundraisers/${id}`}>
          <img className="rounded-t-lg max-h-screen" src={image} />
        </a>
        <svg className={'sr-only'}>{title}</svg>
        <div className="p-3">
          <h1 className="mb-0.5 -mt-1.5 text-2xl tracking-tight text-black">
            {title}
          </h1>
          <h5 className="mb-2 text-sm tracking-tight text-secondary">
            {owner}
          </h5>

          <p className="mb-6 text-md tracking-tight text-gray-500">
            {description}
          </p>
          <div className={'flex justify-between'}>
            <p className="mb-1 text-sm text-gray-700 text-gray-400 ">
              Goal
            </p>
            <p className=" mb-1 text-sm text-gray-700 text-gray-400 ">
              ${goal}
            </p>
          </div>

          <div className={'flex justify-between'}>
            <p className="mb-1 text-sm text-gray-700 text-gray-400 ">
              Funds Raised
            </p>
            <p className=" mb-1 text-sm text-gray-700 text-gray-400 ">
              ${fundsRaised}
            </p>
          </div>

          <div className={'flex justify-between'}>
            <p className="text-sm text-gray-700 text-gray-400 ">
              Ends At
            </p>
            <p className="text-sm text-gray-700 text-gray-400 ">
              {endAt}
              {!endAt && '-'}
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
    </div>
  )
}
