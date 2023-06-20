"use client";

import { useState } from "react";
import { addHospitalToFirestore } from "../lib/firestore";

const AddHospitalForm = () => {
  const [hospitalData, setHospitalData] = useState<HospitalData>({
    name: "",
    address: "",
    phoneNumber: "",
    website: "",
    state: "",
    city: "",
    description: "",
    nickname: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setHospitalData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !hospitalData.name ||
      !hospitalData.address ||
      !hospitalData.phoneNumber ||
      !hospitalData.website ||
      !hospitalData.state ||
      !hospitalData.city ||
      !hospitalData.description
    ) {
      setErrorMessage("Please fill all the fields");
      return;
    }
    try {
      await addHospitalToFirestore(hospitalData);
      setHospitalData({
        name: "",
        address: "",
        phoneNumber: "",
        website: "",
        state: "",
        city: "",
        description: "",
        nickname: "",
      });
      setErrorMessage("");
      setSuccessMessage("Hospital added successfully!");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(String(error));
      }
    }
  };

  return (
    <section className="md:h-screen mt-32 mx-3 mb-10">
      <h2 className="text-center uppercase text-xl font-extrabold">
        Add a Hospital
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <div className="form-control mx-3 my-4 w-full max-w-3xl">
          <label className="label" htmlFor="HospitalName">
            <span className="label-text">
              Hospital Name<span className="text-red-500">*</span>
            </span>
          </label>{" "}
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className="input input-bordered w-full"
            value={hospitalData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-control mx-3 my-4 w-full max-w-3xl">
          <label className="label" htmlFor="Nickname">
            <span className="label-text">Nickname</span>
          </label>{" "}
          <input
            type="text"
            id="nickname"
            name="nickname"
            placeholder="Nickname"
            className="input input-bordered w-full"
            value={hospitalData.nickname}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-control my-4 w-full max-w-3xl">
          <label className="label" htmlFor="address">
            <span className="label-text">
              Hospital Address<span className="text-red-500">*</span>
            </span>
          </label>
          <input
            type="text"
            id="address"
            onChange={handleInputChange}
            value={hospitalData.address}
            name="address"
            placeholder="Address"
            className="input input-bordered w-full"
          />
        </div>

        <div className="w-full max-w-3xl flex md:flex-row flex-col gap-5">
          <div className="form-control w-full">
            <label className="label" htmlFor="city">
              <span className="label-text">
                City<span className="text-red-500">*</span>
              </span>
            </label>{" "}
            <input
              type="text"
              id="city"
              name="city"
              value={hospitalData.city}
              onChange={handleInputChange}
              placeholder="City"
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full">
            <label className="label" htmlFor="state">
              <span className="label-text">
                State<span className="text-red-500">*</span>
              </span>
            </label>{" "}
            <input
              type="text"
              id="state"
              name="state"
              value={hospitalData.state}
              onChange={handleInputChange}
              placeholder="State"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="w-full max-w-3xl flex mt-4 md:flex-row flex-col gap-5">
          <div className="form-control w-full">
            <label className="label" htmlFor="phoneNumber">
              <span className="label-text">
                Phone Number<span className="text-red-500">*</span>
              </span>
            </label>{" "}
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              value={hospitalData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="input input-bordered w-full placeholder-opacity-70"
            />
          </div>
          <div className="form-control w-full">
            <label className="label" htmlFor="website">
              <span className="label-text">
                website<span className="text-red-500">*</span>
              </span>
            </label>{" "}
            <div className="flex items-center input input-bordered w-full">
              <span className="text-gray-500 text-sm">https://</span>
              <input
                type="text"
                id="website"
                name="website"
                value={hospitalData.website}
                onChange={handleInputChange}
                className="w-full ml-2 placeholder-opacity-70"
              />
            </div>
          </div>
        </div>
        <div className="form-control my-4 w-full max-w-3xl">
          <label className="label" htmlFor="description">
            <span className="label-text">
              description <span className="text-red-500">*</span>
            </span>
          </label>
          <textarea
            id="description"
            name="description"
            value={hospitalData.description}
            onChange={handleInputChange}
            className="textarea textarea-bordered h-24"
            placeholder="Details about the hospital"
          ></textarea>
        </div>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <button className="btn w-full max-w-3xl mt-4 md:mb-4" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default AddHospitalForm;
