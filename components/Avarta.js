import React, { useContext, useEffect, useState } from "react";
import Line from "./projectpics/line.svg";
import Bio from "./Bio";
import { Context } from "./Context";
import { useFetch } from "../pages/api/useFetch";

function Avarta() {
  const { noAuthRoutes } = useContext(Context);

  // get profile
  const [profile, setProfile] = useState();
  // useEffect(() => {
  //   noAuthRoutes.getAvartas().then((profile) => {
  //     setProfile(profile);
  //   });
  // }, []);

  const { data: avartas, error } = useFetch("/avartas");
  useEffect(() => {
    setProfile(avartas);
  }, [avartas]);

  return (
    <div className="grid grid-rows-2">
      <div className="flex justify-center lg:justify-end">
        {profile ? (
          profile.map((p, i) => (
            <div
              key={i}
              className="relative w-[360px] mt-8 h-[350px] min-w-[300px] md:h-[30em] md:w-[25em] m-auto lg:mt-10"
            >
              <img
                src={p.from === "2022-11-25" ? p.pictureUrl : ""}
                alt=""
                // layout="fill"
              />
            </div>
          ))
        ) : (
          <></>
        )}
        <span className="font-semibold absolute w-[219px] right-10 top-[90px] text-lg hidden xl:block text-gray-600">
          {`"Let's create an amazing web experince together."`}
        </span>
        <div className="absolute top-[250px] right-16 hidden xl:block">
          <div
            className="text-gray-400 "
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
          >
            <Line className="md:mr-2.5 mb-6 inline " />
            <span className="animate-bounce inline-block">Scroll Down</span>
          </div>
        </div>
      </div>
      <div className="mt-6 z-10">
        <Bio />
      </div>
    </div>
  );
}

export default Avarta;
