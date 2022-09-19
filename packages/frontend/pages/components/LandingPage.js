import Image from "next/image";
 export default function LandingPage() {
     return (
         <div className="p-24 absolute bg-green w-screen h-full	">
            <div className="flex">
              <div>
                <p className='text-6xl w-3/5 pt-24 font-semibold antialiased	'>Help a cause today by making a donation with Crypto</p>
                <div className='p-12 flex space-x-8 justify-start'>
                  <button type="button" className="inline-block px-6 py-2.5 bg-white text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Start a Fundraiser</button>
                  <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Make a Donation</button>
                </div>
              </div>
              <section className="flex justify-end	 w-full">
                <Image  src={"/landing_page_graphic.svg"} width={500} height={500} />
              </section>
            </div>
         </div>
     );
 }