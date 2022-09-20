import Image from "next/image";
export default function LandingPage() {
  return (
    <section className="bg-alt_green min-h-screen">  
      <div className="text-primary pt-32 grid py-8 px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="place-self-center mr-auto lg:col-span-7">
          <h1 className="leading-none mb-4 max-w-2xl text-3xl font-medium leading-none md:text-3xl xl:text-6xl">
            <span>Help a cause today by making a donation with </span>
            <span className="text-secondary">crypto</span>
          </h1>
          <p className="mb-6 mt-6 max-w-2xl font-medium lg:mb-8 md:text-lg lg:text-xl">
            Join the world's most trusted decentralized crowdfunding platform. 
          </p>
          <div className='flex space-x-8 justify-start'>
            <button type="button" className="bg-white dark:text-primary-200 inline-flex justify-center items-center py-3 px-5 font-medium text-center rounded-lg border border-gray-200 shadow-md hover:shadow-lg dark:border-gray-400 dark:focus:ring-primary">Start a Fundraiser</button>
            <button type="button" className="bg-primary text-white justify-center items-center py-3 px-5 mr-3 text-base font-medium text-center text-white rounded-lg shadow-md border border-gray-300 hover:shadow-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">Make a Donation</button>
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <Image className="flex-1 justify-end" src={"/landing_page_graphic.svg"} width={700} height={700} />
        </div>
      </div>
    </section>

  );
}