import React, { useContext, useEffect, useState } from "react";
import RestHead from "../../components/RestHead";
import { useRouter } from "next/router";
import { Context } from "../../components/Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Image from "next/image";
function Profiles() {
  const router = useRouter();
  const { noAuthRoutes } = useContext(Context);
  const [personalStatement, setPersonalStatement] = useState([]);
  const [avartas, setAvarta] = useState([]);
  useEffect(() => {
    noAuthRoutes.getAvartas().then((res) => {
      setAvarta(res);
    });
  }, []);

  useEffect(() => {
    noAuthRoutes.getPersonalStatement().then((res) => {
      setPersonalStatement(res);
    });
  }, []);
  // add statement to the avartas object if from is the same
  avartas.map((avarta) => {
    personalStatement.map((statement) => {
      if (avarta.from === statement.from && avarta.to === statement.to) {
        avarta.statement = statement.statement;
      }
    });
  });

  return (
    <div>
      <RestHead />
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
        <div className="flex justify-around">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            My Profiles
          </h2>
          <div className="flex gap-5">
            <button
              className="p-3 bg-gray-500 rounded-lg shadow-lg text-white font-bold"
              onClick={() => router.push("newprofile")}
            >
              Create New Profile
            </button>
            <button
              className="p-3 bg-gray-400 rounded-lg hover:bg-gray-500 shadow-lg text-white font-bold"
              onClick={() => router.push("/restapi")}
            >
              Back
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${
          personalStatement && avartas
            ? "grid mt-6 grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 max-w-7xl mx-auto "
            : ""
        }`}
      >
        {personalStatement && avartas ? (
          avartas.map((avarta, i) => (
            <div key={i} className="group relative border mx-4">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80 ">
                <Image
                  layout="fill"
                  src={avarta.pictureUrl}
                  alt=""
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="text-center text-gray-500 my-4">
                <div className="mx-4 ">
                  From:
                  <p className="font-bold my-2 mx-1 inline">{avarta.from}</p>
                </div>
                <div className="mx-4">
                  To:
                  <p className="font-bold my-2 mx-1 inline">{avarta.to}</p>
                </div>
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
  );
}

export default Profiles;
