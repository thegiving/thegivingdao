import Card from '../../components/Card'
const fundraisers = [
  {
    id: 1,
    title: 'Donation for Kids',
    goal: 1500,
    fundsRaised: 100,
    fundraiserTill: '2022-12-12',
    image: '/placeholder-1.jpg',
  },
  {
    id: 1,
    title: 'Donation for Kids',
    goal: 1500,
    fundsRaised: 100,
    fundraiserTill: '2022-12-12',
    image: '/placeholder-1.jpg',
  },
  {
    id: 2,
    title: 'Donation for Kids',
    goal: 1500,
    fundsRaised: 100,
    fundraiserTill: '2022-12-12',
    image: '/placeholder-1.jpg',
  },
  {
    id: 3,
    title: 'Donation for Kids',
    goal: 1500,
    fundsRaised: 100,
    fundraiserTill: '2022-12-12',
    image: '/placeholder-1.jpg',
  },
  {
    id: 1,
    title: 'Donation for Kids',
    goal: 1500,
    fundsRaised: 100,
    fundraiserTill: '2022-12-12',
    image: '/placeholder-1.jpg',
  },
  {
    id: 2,
    title: 'Donation for Kids',
    goal: 1500,
    fundsRaised: 100,
    fundraiserTill: '2022-12-12',
    image: '/placeholder-1.jpg',
  },
  {
    id: 3,
    title: 'Donation for Kids',
    goal: 1500,
    fundsRaised: 100,
    image: '/placeholder-1.jpg',
  },
]

export default function Fundraisers() {
  return (
    <>
      <div className="mx-auto grid max-w-screen-xl py-8 px-4 pt-16 text-primary">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-black md:text-5xl lg:text-4xl">
          Fundraisers
        </h1>
        <div className={'flex max-w-screen-xl flex-wrap	'}>
          {fundraisers.map((fundraiser) => (
            <Card
              key={fundraiser.id}
              title={fundraiser.title}
              goal={fundraiser.goal}
              fundsRaised={fundraiser.fundsRaised}
              fundraiserTill={fundraiser.fundraiserTill}
              image={fundraiser.image}
            />
          ))}
        </div>
      </div>
    </>
  )
}
