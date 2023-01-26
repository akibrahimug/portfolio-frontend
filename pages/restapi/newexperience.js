import React, { useState, useContext, useEffect } from "react";
import RestHead from "../../components/RestHead";
import { useRouter } from "next/router";
import { Context } from "../../components/Context";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

function Newexperience() {
  const { noAuthRoutes, authenticatedUser } = useContext(Context);
  const router = useRouter();
  const [value, setValue] = useState([null, null]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  // get the data from the form
  const [data, setData] = useState({
    company: "",
    position: "",
    description: "",
    startDate: "",
    endDate: "",
    userID: authenticatedUser ? authenticatedUser.userID : "",
  });

  // create a change method
  const change = (e) => {
    // create name and value to store the event targets
    const { name, value } = e.target;
    // set the course an object with the current courses spread, and name and value stored
    // as key value pairs
    setData((project) => ({ ...project, [name]: value }));
  };
  const [errors, setErrors] = useState([]);
  const submit = (e) => {
    e.preventDefault();
    if (!authenticatedUser) {
      router.push("/signin");
    } else {
      noAuthRoutes
        .createExperience(data)
        .then((errors) => {
          if (errors.length) {
            // set the errors array to display them
            setErrors(errors);
            // else signIn with user emailAddress and password
          } else {
            router.push("experiences");
          }
        })
        // catch any errors thrown by the api and log them to the console
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [date, setDate] = useState();
  useEffect(() => {
    if (value) {
      setDate({
        from: startDate.toISOString().slice(0, 10),
        to: endDate.toISOString().slice(0, 10),
      });
    }
  }, [value]);

  data.startDate = date ? date.from : "";
  data.endDate = date ? date.to : "";

  return (
    <div>
      <RestHead />
      <div className="mx-auto max-w-2xl py-8 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px- ">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                New Experience
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be saved in a postgresql database. You can
                edit it later.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={submit}>
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Company Title
                      </label>
                      <div className="my-2 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="company"
                          id="company"
                          className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Facebook"
                          onChange={change}
                        />
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="position"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Position
                        </label>
                        <div className="my-2 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="position"
                            id="position"
                            className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Developer"
                            onChange={change}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="This is a project that does...."
                        defaultValue={""}
                        onChange={change}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description of what you did, what you learned, and
                      how you contributed.
                    </p>
                  </div>
                  <div className=" my-4 ">
                    <DateRangePicker
                      ranges={[selectionRange]}
                      rangeColors={["rgb(107 114 128 )"]}
                      onChange={handleSelect}
                    />
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 flex gap-4 justify-end">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none max-h-10"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => router.push("experiences")}
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none max-h-10"
                  >
                    Back
                  </button>
                  {errors.length ? (
                    <div className="p-4 border border-red-500 rounded-2xl w-[70%] m-auto mt-4 ">
                      <h3 className="text-center underline text-xl font-medium text-red-600">
                        Validation errors
                      </h3>
                      <ul>
                        {errors.map((error, index) => (
                          <li
                            key={index}
                            className="mt-2 font-semibold text-gray-600 text-center"
                          >
                            {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newexperience;
