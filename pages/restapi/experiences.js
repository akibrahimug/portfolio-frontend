import React, { useContext, useEffect, useState } from "react";
import RestHead from "../../components/RestHead";
import { useRouter } from "next/router";
import { Context } from "../../components/Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
function Experiences() {
  const router = useRouter();
  const { backend } = useContext(Context);

  const [experience, setExperience] = useState([]);
  useEffect(() => {
    backend.getExperience().then((res) => {
      setExperience(res);
    });
  }, []);

  return (
    <div>
      <RestHead />
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
        <div className="flex justify-around">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            My Experiences
          </h2>
          <div className="flex gap-5">
            <button
              className="p-3 bg-gray-500 rounded-lg shadow-lg text-white font-bold"
              onClick={() => router.push("newexperience")}
            >
              Add New Experience
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
          experience
            ? "grid mt-6 grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-2 xl:gap-x-8 max-w-7xl mx-auto place-items-center "
            : ""
        }`}
      >
        {experience ? (
          experience.map((exp, i) => (
            <div
              key={i}
              className="group relative border w-[500px] p-4 lg:h-[400px]"
            >
              <h2 className="font-bold text-[30px]">{exp.company}</h2>
              <p className="text-md text-gray-500 mt-0">{exp.position}</p>
              <p className="mt-4">{exp.description}</p>
              <div className="flex justify-between items-end">
                <p className="mt-4 text-gray-500">
                  {new Date(exp.startDate).getFullYear()}/
                  {new Date(exp.startDate).getMonth() + 1} -{" "}
                  {new Date(exp.endDate).getFullYear()}/
                  {new Date(exp.endDate).getMonth() + 1}
                </p>
                <button className="bg-gray-700 text-white p-2 rounded-md px-4 hover:bg-gray-600">
                  Edit
                </button>
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

export default Experiences;
