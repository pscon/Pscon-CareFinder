"use client";

import { BsHospital } from "react-icons/bs";
import { BiLocationPlus } from "react-icons/bi";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdLocalHospital } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import injection from "../assets/Images/heroImg.png";

const Page = () => {
  const features = [
    {
      name: "Location-Based Search",
      description:
        "Easily search for and find healthcare centers near you based on your current location or a specified address.",
      icon: BiLocationPlus,
    },
    {
      name: "Detailed Center Profiles",
      description:
        "View detailed profiles of healthcare centers, including their services, hours of operation, contact information, and patient reviews.",
      icon: BsHospital,
    },
    {
      name: "Convenient Scheduling",
      description:
        "Quickly and easily schedule appointments with healthcare centers directly through the app.",
      icon: AiOutlineSchedule,
    },
    {
      name: "Insurance Compatibility",
      description:
        "Filter your search results to only show healthcare centers that accept your insurance plan.",
      icon: MdLocalHospital,
    },
  ];
  return (
    <div className="">
   <div className="bg-[#E0E4EC] ">
      <div className=" px-6 pb-4 lg:flex  mx-auto w-5/6 items-center justify-center md:h-5/6">
        <div className="z-10 mt-10 md:basis-3/5" >


          <h1 className="text-4xl font-bold tracking-tight text-[#08299B]  sm:text-6xl">
            Find the nearest hospital to you and make an appointment

          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
          Discover Your Perfect Care: Find Your Hospital, Anytime, Anywhere!
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/hospitals"
              className="rounded-md bg-[#08299B] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm border hover:bg-transparent hover:text-[#08299B] hover:border-[#08299B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
Get Started            </Link>
            <Link
              href="https://github.com/pscon/Pscon-CareFinder"
              className="text-sm font-semibold leading-6"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div style={{width: '100%', height: '100%'}} className="mt-8 flex w-3/5 justify-center md:z-10 lg:ml-40 md:mt-16 lg:justify-items-end">
  <Image
    src={injection} alt="bcg-Img"
    />
</div>
    </div> 

        
      </div>
      {/* </div> */}
      <div
        className="absolute inset-x-0 top-[calc(100%-8rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(30%+1rem)] aspect-[1155/678] w-[16.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className=" py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              CareFinder Features
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight  sm:text-4xl">
              Start your search today and take control of your health.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              CareFinder is a free, easy-to-use tool that allows you to search
              for and connect with top-rated healthcare providers in your area.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="bg-white shadow-lg rounded-md p-3 relative pl-16">
                  <dt className="text-base font-semibold leading-7">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#08299B]">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
