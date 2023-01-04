import React, { useRef, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Context } from "../../components/Context";
function UploadPictures() {
  const { googleUpload } = useContext(Context);
  const uuidv4 = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  };

  // get the input element
  // create the change function
  const inputEl = useRef(null);
  const [file, setFile] = useState(null);
  useEffect(() => {
    let file = inputEl.current;
    setFile(file ? file : null);
  });

  const router = useRouter();
  const [response, setResponse] = useState(null);
  //   create a submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postID = uuidv4();
    if (file) {
      // edit the blob to be sent to the api
      //   get the files from the input element
      const files = file.files[0];
      let blob;
      let newFile;
      if (
        files &&
        (files.type === "image/png" || files.type === "image/jpeg")
      ) {
        blob = files.slice(0, files.size, "image/jpeg");
        newFile = new File([blob], `${postID}_post.jpeg`, {
          type: " image/jpeg",
        });

        let formData = new FormData();
        formData.append("imgfile", newFile);

        //   make a post request to the api
        googleUpload
          .createPicture(formData)
          .then((res) => (res ? router.push("/restapi") : null));
      } else if (files && files.type === "image/svg+xml") {
        blob = files.slice(0, files.size, "image/svg+xml");
        newFile = new File([blob], `${postID}.svg`, {
          type: " image/svg+xml",
        });

        let formData = new FormData();
        formData.append("imgfile", newFile);

        //   make a post request to the api
        googleUpload
          .createPicture(formData)
          .then((res) => (res ? router.push("/restapi") : null));
      }
    } else {
      setResponse("Please select a file to upload");
    }
  };

  return (
    <div className="mt-20">
      <div className="max-w-[800px] m-auto">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Photo Bucket
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                All the pictures uploaded here are stored in Cloud Storage
                Bucket.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={handleSubmit}>
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-3 gap-6"></div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Upload photo
                    </label>
                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="imgfile"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="imgfile"
                              name="imgfile"
                              type="file"
                              className="sr-only"
                              ref={inputEl}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 flex justify-between items-center">
                  <button
                    type="submit"
                    className={`inline-flex justify-center rounded-md border border-transparent bg-gray-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none 
                    }`}
                  >
                    Save
                  </button>
                  <button
                    type="submit"
                    className={`inline-flex justify-center rounded-md border border-transparent bg-gray-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none
                    }`}
                    onClick={() => router.push("pictures")}
                  >
                    Back
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadPictures;
