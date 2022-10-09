import Image from "next/image";
import Button from '../components/Button';
import type { NextPage } from 'next'
import FundraiserButton from "../components/FundraiserButton";
import router from "next/router";

const Home: NextPage = () => {
  return (
    <section className="bg-alt_green min-h-screen">
      <div className="text-primary pt-32 grid py-8 px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="place-self-center mr-auto lg:col-span-7">
          <h1 className="mb-4 max-w-2xl text-5xl font-extrabold md:text-4xl xl:text-6xl">
            <span>Help a cause today by making a donation with </span>
            <span className="text-secondary">crypto</span>
          </h1>
          <p className="mb-6 mt-6 max-w-2xl font-medium lg:mb-8 md:text-lg lg:text-2xl">
            Join the world&apos;s most trusted decentralized crowdfunding community.
          </p>
          <div className='flex space-x-5 justify-start'>
            <FundraiserButton />
            <Button text={`Make a Donation`} buttonType={'Primary'} onClick={e => router.push('/fundraisers')} />
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <Image
            className="flex-1 justify-end"
            src={"/landing_page_graphic.svg"}
            width={700}
            height={700}
          />
        </div>
      </div>
    </section>
  );
}
export default Home;
