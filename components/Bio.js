import React from "react";

function Bio() {
  return (
    <div className=" m-auto rounded-lg shadow-md py-2 max-w-[500px] border-t-8 border-black  2xl:w-[500px] w-[460px] lg:w-[450px] lg:ml-8  xl:m-auto">
      <h4 className="text-2xl text-gray-600 mb-3 w-64  text-center mt-4 ">
        About me
      </h4>
      <div className="px-10 mb-10 text-gray-600">
        <p>
          I am a lifelong learner and analytical Full stack Javascript developer
          with 2 years commercial experience building web applications using
          modern tools and libraries. I am looking for a Mid Frontend developer
          role at a mid - sized company.
        </p>
        <p>
          In my previous role I created internal systems that helped increase
          company productivity by 80% in 4 months. For one application I created
          a workflow that reduced time spent from 3-4 hours to 6 minutes while
          creating an app that was intuitive and easy to use.
        </p>
        <p>
          Prior to my career in software development, I spent my time in the
          fashion & education world, where I was starting projects from scratch
          with the goal of making a positive impact in my community.
        </p>
        <p>
          In an ideal world, I am surrounded by smart and high-performing people
          whom I can learn from! In my free time, I am either learning a new
          technology or playing basketball.
        </p>
      </div>
    </div>
  );
}

export default Bio;
