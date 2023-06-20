"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHospitals } from "../GlobalRedux/slice/hospitalSlice";
import { AppDispatch, RootState } from "../GlobalRedux/store";
import ExportCSV from "../components/ExportData/ExportCSV";
import Link from "next/link";
import axios from "axios";
import LoadingAnimation from "../components/loadingAnimation";
import { BiLocationPlus } from "react-icons/bi";
import { setCity, setCountry } from "../GlobalRedux/slice/locationSlice";
import { Puff } from "react-loader-spinner";

const Hospitals = () => {
  const dispatch = useDispatch<AppDispatch>();
  const hospitals: Hospital[] = useSelector(
    (state: RootState) => state.hospitals.hospitals
  );
  const city = useSelector(
    (state: RootState) => state.findHospitalsNearMe.city
  );
  const status = useSelector((state: RootState) => state.hospitals.status);
  const error = useSelector((state: RootState) => state.hospitals.error);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  // Add state for search term
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchHospitals() as any);
    if (city) {
      setSearchTerm(city);
    }
  }, [dispatch, city]);

  const handleFindHospitalsNearMe = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await axios.get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        const data = response.data;
        const city = data.city;
        const country = data.countryCode;

        dispatch(setCountry(country));
        dispatch(setCity(city));
        setSearchTerm(city);
        setLoading(false);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  if (status === "failed") {
    return (
      <div className="h-screen flex justify-center items-center">
        Error: {error}
      </div>
    );
  }

  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter the hospitals array to only include items that match the search term
  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (hospital.nickname &&
        hospital.nickname.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Slice the hospitals array to only include items for the current page
  const currentItems = filteredHospitals.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  // Add a function to handle changing pages
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      {status === "loading" ? (
        <div className="h-screen flex justify-center items-center">
          <div className="w-16 h-16">
            <LoadingAnimation />
          </div>
        </div>
      ) : (
        <div className="mt-[7.5rem] mb-10 text-center md:mx-6 mx-3">
          <h1 className="uppercase text-2xl font-extrabold mb-5">
            List of Hospitals
          </h1>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-center">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Search by city, state, nickname or name"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <button
              className="btn md:mt-0 md:ml-2 mt-2"
              onClick={handleFindHospitalsNearMe}
            >
              Nearby Hospitals&nbsp;
              {loading ? (
                <div className="flex items-center ml-2 w-6 h-6">
                  <Puff
                    height={20}
                    width={20}
                    radius={1}
                    color="#fff"
                    ariaLabel="puff-loading"
                    visible={true}
                  />
                </div>
              ) : (
                <div>
                  <BiLocationPlus className="ml-2 w-6 h-6" />
                </div>
              )}
            </button>
          </div>

          <ul className="text-left">
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <LoadingAnimation />
              </div>
            ) : (
              <>
                {currentItems.length === 0 && (
                  <div className="flex flex-col justify-center items-center text-center h-96">
                    <h2 className="text-2xl font-bold text-center">
                      No Hospitals Found in {city}
                    </h2>
                    <p>
                      Please try searching for another city or add a hospital{" "}
                      <Link href="/add">
                        <button className="text-blue-500">here</button>
                      </Link>
                    </p>
                  </div>
                )}
                {currentItems.map((hospital) => (
                  <li
                    key={hospital.id}
                    className="p-3 border border-solid border-black rounded-md mt-2 mb-5"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="font-bold">{hospital.name}</h2>

                      <Link className="ml-1" href={`/hospitals/${hospital.id}`}>
                        <button className="btn">Details</button>
                      </Link>
                    </div>
                    <p className="md:w-[60%] w-[70%] md:text-base text-xs">
                      {hospital.address}, {hospital.city}, {hospital.state}
                    </p>
                  </li>
                ))}
              </>
            )}
          </ul>

          <div className="flex md:flex-row flex-col justify-between items-center my-4">
            <ExportCSV />
            <div className="flex items-center md:mt-0 mt-3">
              <button
                className="mx-2 btn"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>

              <p className="mx-2">
                Current Page: {currentPage} /{" "}
                {Math.ceil(hospitals.length / itemsPerPage)}
              </p>
              <button
                className="mx-2 btn"
                disabled={currentItems.length < itemsPerPage}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>

              <p className="mx-2 hidden md:flex ">
                Total Hospitals: {hospitals.length}
              </p>

              <p className="mx-2 hidden md:flex">
                Total Pages: {Math.ceil(hospitals.length / itemsPerPage)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hospitals;
