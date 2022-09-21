import type { NextPage } from 'next'
import Button from './components/Button'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <section className="min-h-screen bg-alt_green">
      <div className="mx-auto grid max-w-screen-xl py-8 px-4 pt-32 text-primary lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="mb-4 max-w-2xl text-3xl font-medium leading-none leading-none md:text-3xl xl:text-6xl">
            <span>Help a cause today by making a donation with </span>
            <span className="text-secondary">crypto</span>
          </h1>
          <p className="mb-6 mt-6 max-w-2xl font-medium md:text-lg lg:mb-8 lg:text-xl">
            Join the world&apos;s most trusted decentralized crowdfunding
            platform.
          </p>
          <div className="flex justify-start space-x-8">
            <Button text={`Start a Fundraiser`} buttonType={'Secondary'} />
            <Button text={`Make a Donation`} buttonType={'Primary'} />
          </div>
        </div>
        <div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
          <Image
            className="flex-1 justify-end"
            src={'/landing_page_graphic.svg'}
            width={700}
            height={700}
          />
        </div>
      </div>
    </section>
  )
}
export default Home
