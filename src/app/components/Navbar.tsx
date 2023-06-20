"use client";
import { useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const country = useSelector(
    (state: RootState) => state.findHospitalsNearMe.country
  );

  return (
    <>
      <nav
        className="bg-[#191d24] text-white flex w-full items-center justify-between p-2 lg:px-8 fixed top-0 left-0 right-0 z-50 shadow-sm"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Link href="/" className="flex justify-center items-center">
              <Image width={50} height={50} src="/hospital.png" alt="Logo" />
              <h2 className="pl-2 text-lg text-bold">Care Finder</h2>
              <p className="text-slate-400 text-xs pl-1">{country}</p>
            </Link>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <AiOutlineMenu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12 items-center">
          <Link href="/hospitals" className="text-sm font-semibold leading-6 ">
            Hospitals
          </Link>
          <Link
            href="https://medium.com/@philipnwabuwa/carefinder-app-documentation-f93f5ba76eb6"
            className="text-sm font-semibold leading-6 "
          >
            Documentaion
          </Link>

          <Link href="/add" className="text-sm font-semibold leading-6 ">
            Add Hospital
          </Link>

          <ThemeToggle />
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <button>
              <Link
                href="/sign-in"
                className="text-sm font-semibold leading-6 mr-2"
              >
                Sign up
              </Link>
            </button>
            <button>
              <Link
                href="/sign-up"
                className="text-sm font-semibold leading-6 "
              >
                Log in
              </Link>
            </button>
          </SignedOut>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden "
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-[80]" />
        <Dialog.Panel className=" fixed z-[80] inset-y-0 bg-[#191d24] right-0 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image width={50} height={50} src="/hospital.png" alt="Logo" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 "
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <AiOutlineClose
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  href="/hospitals"
                  className="-mx-3 text-white block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-gray-50 hover:text-gray-900"
                >
                  Hospitals
                </Link>
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  href="https://medium.com/@philipnwabuwa/carefinder-app-documentation-f93f5ba76eb6"
                  className="-mx-3 text-white block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-gray-50 hover:text-gray-900"
                >
                  Documentation
                </Link>

                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  href="/add"
                  className="-mx-3 text-white block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-gray-50 hover:text-gray-900"
                >
                  Add Hospital
                </Link>
              </div>
              <div className="py-6">
                <ThemeToggle />
              </div>
              <div className="py-6">
                <SignedOut>
                  <button>
                    <Link
                      href="/sign-in"
                      className="text-sm font-semibold leading-6 text-white"
                    >
                      Log in
                    </Link>
                  </button>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

export default Navbar;
