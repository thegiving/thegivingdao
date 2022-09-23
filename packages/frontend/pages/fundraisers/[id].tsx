import Image from 'next/image'
import Button from '../../components/Button'

const title = 'Donation for Kids'
const goal = 1500
const fundsRaised = 100
const image = '/placeholder-1.jpg'
const fundraiserTill = ''
const description =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

export default function Fundraiser() {
  return (
    <>
      <div className="mx-auto grid max-w-screen-xl py-8 px-4 pt-16 text-primary">
        <div className={'flex justify-between'}>
          <h1 className="mb-4 w-1/2 text-4xl  font-extrabold leading-none tracking-tight text-black md:text-5xl lg:text-4xl">
            {title}
          </h1>
          <div className={'w-1/4 justify-end'}>
            <div className={'flex justify-between'}>
              <p className=" text-sm  font-normal text-gray-700 text-gray-400 ">
                Goal
              </p>
              <p className="  text-sm font-normal text-gray-700 text-gray-400 ">
                {goal} $
              </p>
            </div>

            <div className={'flex justify-between'}>
              <p className=" text-sm font-normal text-gray-700 text-gray-400 ">
                Funds Raised
              </p>
              <p className="  text-sm font-normal text-gray-700 text-gray-400 ">
                {fundsRaised} $
              </p>
            </div>

            <div className={'flex justify-between'}>
              <p className=" text-sm font-normal text-gray-700 text-gray-400 ">
                Fundraiser Till
              </p>
              <p className="  text-sm font-normal text-gray-700 text-gray-400 ">
                {fundraiserTill}
                {!fundraiserTill && '-'}
              </p>
            </div>
          </div>
        </div>

        <p className={'pt-8 pb-8 text-gray-900'}>{description}</p>
        <Image
          className="rounded-t-lg"
          src={image}
          layout="responsive"
          width={10}
          height={5}
        />
        <div className="flex justify-center space-x-8 pt-8">
          <Button text={`Back`} buttonType={'Secondary'} />
          <Button text={`Donate`} buttonType={'Primary'} />
        </div>
      </div>
    </>
  )
}
