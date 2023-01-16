import React from "react";

export default function Resume() {
  return (
    <>
      <div className="hidden h-[83vh] overflow-scroll scrollbar-hide 2xl:flex flex-col relative">
        <a
          href="https://storage.googleapis.com/my-rest-api-2022-kasoma/KASOMA%20IBRAHIM%20_CV%202022%20(1).pdf"
          className=" mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded m-auto absolute bottom-10 right-[50%]"
        >
          View and Download Resume as PDF
        </a>
        <iframe
          src="https://docs.google.com/document/d/e/2PACX-1vTT4w-5NYp7iHC-YqY7tPrzgJ8P2n1HEUyzPDppXIdLzqJpts6-NzRm3e38wIX4UKu0swcme42bIKae/pub?embedded=true"
          className=" w-[800px] h-[100vh] m-auto"
        ></iframe>
      </div>
      <div className="2xl:hidden h-[9vh] flex flex-col ">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://storage.googleapis.com/my-rest-api-2022-kasoma/KASOMA%20IBRAHIM%20_CV%202022%20(1).pdf"
          className=" mt-10 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded m-auto "
        >
          View and Download Resume as PDF
        </a>
      </div>
    </>
  );
}
