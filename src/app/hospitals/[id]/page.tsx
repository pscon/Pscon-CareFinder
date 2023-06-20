"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../GlobalRedux/store";
import {
  deleteHospital,
  fetchHospitals,
} from "@/app/GlobalRedux/slice/hospitalSlice";
import Modal from "react-modal";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { BsFacebook, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { AiOutlineLink, AiOutlineSwapRight } from "react-icons/ai";
import { BiMapPin, BiTrash } from "react-icons/bi";
import Link from "next/link";

// import EditHospital from "../edit/page";

const Page = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  const modalStyle = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.8)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "none",
      border: "none",
    },
  };

  const hospitals: Hospital[] = useSelector(
    (state: RootState) => state.hospitals.hospitals
  );

  useEffect(() => {
    dispatch(fetchHospitals() as any);
  }, [dispatch]);

  const hospital = hospitals.find((hospital) => hospital.id === params.id);

  if (!hospital) {
    return (
      <div className="mt-32 h-screen text-center mx-6">Hospital not found</div>
    );
  }

  const handleDelete = () => {
    dispatch(deleteHospital(hospital.id) as any);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };
  const URL = window.location.href;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(URL);
    setCopySuccess("Copied to clipboard!");
  };

  const handleCall = () => {
    window.open(`tel:${hospital.phoneNumber}`);
  };

  return (
    <section className="flex flex-col lg:grid lg:grid-cols-6 lg:gap-6 mx-6 mt-32 mb-10 sm:mb-20 lg:mb-0 md:h-[34rem]">
      <div className="col-span-5">
        <div>
          <h1 className="uppercase font-bold text-3xl text-center">
            {hospital.name} ({hospital.nickname})
          </h1>
          <h3 className="my-5 font-semibold text-lg md:text-xl">
            Address: {hospital.address}, {hospital.city}, {hospital.state}
          </h3>

          <p className="my-3 lg:my-5 lg:w-[80%]">{hospital.description}</p>
          <p className="my-2">
            Phone Number:{" "}
            <span onClick={handleCall} className="underline cursor-pointer">
              {hospital.phoneNumber}
            </span>
          </p>

          <div className="lg:grid lg:grid-cols-3 flex flex-col gap-4 lg:mr-5">
            <Link href={hospital.website} target="_blank" className="btn my-3">
              Visit Website
              <AiOutlineSwapRight className="ml-2 w-7 h-7" />
            </Link>

            <Link
              className="btn my-3"
              target="_blank"
              href={`https://www.google.com/maps/search/${hospital.name} ${hospital.city}`}
            >
              View on Google Map
              <BiMapPin className="ml-2 w-7 h-7" />
            </Link>
            <button onClick={openModal} className="btn my-3">
              Delete
              <BiTrash className="ml-2 w-6 h-6" />
            </button>
          </div>

          <div>
            <Modal
              style={modalStyle}
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
            >
              <div className="modal-box">
                <h2 className="text-center text-xl font-bold">
                  Are you sure you want to delete this hospital?
                </h2>
                <div className="flex justify-center items-center gap-4 mt-4">
                  <Link href="/hospitals">
                    <button onClick={handleDelete} className="btn">
                      Yes
                    </button>
                  </Link>
                  <button onClick={closeModal} className="btn">
                    No
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
      <div className="mt-12 flex flex-col items-center ">
        <h3 className="text-center font-bold text-lg mb-4">Share webpage</h3>
        <div className="flex justify-center items-center">
          <button onClick={copyToClipboard}>
            <AiOutlineLink className="w-7 h-7 mx-2" />
          </button>
          <EmailShareButton
            url={URL}
            subject={`Wish to know more about ${hospital.name} visit this link`}
            body={hospital.description}
          >
            <MdOutlineMail className="w-7 h-7 mx-2 hover:text-red-500" />
          </EmailShareButton>
          <TwitterShareButton
            url={URL}
            title={`Wish to know more about ${hospital.name} visit this link`}
          >
            <BsTwitter className="w-7 h-7 mx-2 hover:text-blue-400" />
          </TwitterShareButton>
          <FacebookShareButton
            url={URL}
            quote={`Wish to know more about ${hospital.name} visit this link`}
          >
            <BsFacebook className="w-7 h-7 mx-2 hover:text-blue-600" />
          </FacebookShareButton>
          <WhatsappShareButton
            url={URL}
            title={`Wish to know more about ${hospital.name} visit this link`}
          >
            <BsWhatsapp className="w-7 h-7 mx-2 hover:text-green-300" />
          </WhatsappShareButton>
        </div>
        <p className="text-center text-green-500 mt-2">{copySuccess}</p>
      </div>
    </section>
  );
};

export default Page;
