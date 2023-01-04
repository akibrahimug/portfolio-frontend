import React, { useContext, useEffect, useState } from "react";
import { Context } from "./Context";

export default function TechStack() {
  const { backend } = useContext(Context);
  const [techStack, setTechStack] = useState([]);
  useEffect(() => {
    backend.getTechnologies().then((res) => setTechStack(res));
  }, []);

  return (
    <div className="relative rounded-2xl md:w-[800px] xl:w-[1200px] xl:grid-cols-7 mb-4 shadow-md m-auto grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2">
      {techStack ? (
        techStack.map((tech, i) => (
          <div
            key={i}
            className="flex flex-col border m-6 rounded-md shadow-sm h-[180px] justify-center items-center"
          >
            <img src={tech.pictureUrl} className="w-16 m-4" />
            <div className="border-t">
              <p className="py-2 text-center">{tech.techTitle}</p>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
