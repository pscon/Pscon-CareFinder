"use client";

import { RootState } from "@/app/GlobalRedux/store";
import React from "react";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";

const ExportCSV = () => {
  const hospitals = useSelector(
    (state: RootState) => state.hospitals.hospitals
  );
  const headers = [
    { label: "Hospital Name", key: "name" },
    { label: "Address", key: "address" },
    { label: "Phone Number", key: "phone" },
    { label: "Email", key: "email" },
    { label: "Website", key: "website" },
    { label: "State", key: "state" },
    { label: "City", key: "city" },
  ];

  return (
    <div>
      <button className="btn w-full max-w-sm">
        <CSVLink data={hospitals} headers={headers} filename={"CareFinder.csv"}>
          Export Data
        </CSVLink>
      </button>
    </div>
  );
};

export default ExportCSV;
