import React, { useState, useEffect } from "react";
import { Container, PhysiotherapistCard } from "../components";

const doctorsData = [
  {
    fullName: "Dr. Snehal Patel",
    address: "102 Shreenath Complex, C.G. Road, Ahmedabad",
    contactNumber: "+91 9876543210",
  },
  {
    fullName: "Dr. Kunal Mehta",
    address: "201 Sunrise Residency, Ring Road, Surat",
    contactNumber: "+91 9823456789",
  },
  {
    fullName: "Dr. Rupal Shah",
    address: "304 Ashirwad Plaza, Racecourse Road, Vadodara",
    contactNumber: "+91 8765432190",
  },
  {
    fullName: "Dr. Ankit Joshi",
    address: "56 Anjali Society, Paldi, Ahmedabad",
    contactNumber: "+91 9123456780",
  },
  {
    fullName: "Dr. Neha Desai",
    address: "12 Shubham Villa, Kalawad Road, Rajkot",
    contactNumber: "+91 9988776655",
  },
  {
    fullName: "Dr. Hitesh Trivedi",
    address: "27 Laxmi Nagar, Adajan, Surat",
    contactNumber: "+91 9456789012",
  },
  {
    fullName: "Dr. Priya Bhatt",
    address: "67 Lotus Greens, Bhavnagar Road, Bhavnagar",
    contactNumber: "+91 9321456789",
  },
  {
    fullName: "Dr. Mihir Shukla",
    address: "14 Royal Enclave, Anand Nagar, Ahmedabad",
    contactNumber: "+91 8887654321",
  },
  {
    fullName: "Dr. Dipika Gohil",
    address: "98 Gokul Dham Society, Akota, Vadodara",
    contactNumber: "+91 9345678901",
  },
  {
    fullName: "Dr. Parth Vyas",
    address: "22 Greenfield Apartment, Vesu, Surat",
    contactNumber: "+91 9012345678",
  },
];

const Physiotherapy = () => {
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"> */}
          {doctorsData.map((doc) => (
            <div key={doc.fullName} className="p-2 w-1/4">
              <PhysiotherapistCard {...doc} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Physiotherapy;
