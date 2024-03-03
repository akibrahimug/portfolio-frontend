import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../components/Context";
import { useRouter } from "next/router";
import RestHead from "../../components/RestHead";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Image from "next/image";
function Pictures() {
  const { googleUpload } = useContext(Context);
  const router = useRouter();
  const [pictureURL, setPictureURL] = useState();
  useEffect(() => {
    googleUpload.getPictures().then((res) => setPictureURL(res[0]));
  }, []);

  const [picture, setPicture] = useState(null);
  useEffect(() => {
    if (pictureURL) {
      setPicture(
        pictureURL.map((pic) => {
          const url =
            pic.storage.apiEndpoint + "/" + pic.bucket.id + "/" + pic.id;
          return url;
        })
      );
    }
  }, [pictureURL]);

  return (
    <>
      <RestHead />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
          <div className="flex justify-around">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Uploaded pictures
            </h2>
            <div className="flex gap-5">
              <button
                className="p-3 bg-gray-500 rounded-lg shadow-lg text-white font-bold"
                onClick={() => router.push("upload")}
              >
                Upload New Picture
              </button>
              <button
                className="p-3 bg-gray-400 rounded-lg hover:bg-gray-500 shadow-lg text-white font-bold"
                onClick={() => router.push("/restapi")}
              >
                Back
              </button>
            </div>
          </div>

          <div
            className={`${
              picture
                ? "grid mt-6 grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
                : ""
            }`}
          >
            {picture ? (
              picture.map((pic, i) => (
                <div key={i} className="group relative">
                  <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                    <Image
                      layout="fill"
                      src={pic}
                      alt=""
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                </div>
              ))
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                <CircularProgress className="text-gray-500 " />
              </Box>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Pictures;
