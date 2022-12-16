import React, { useContext, useEffect, useState } from "react";
import RestHead from "../../components/RestHead";
import { useRouter } from "next/router";
import { Context } from "../Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function message() {
  const router = useRouter();
  const { backend } = useContext(Context);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    backend.getMessage().then((res) => {
      setMessages(res);
    });
  }, []);

  return (
    <div>
      <RestHead />
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
        <div className="flex justify-around">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            My Messages
          </h2>
          <div className="flex gap-5">
            <button
              disabled
              className="p-3 bg-gray-300 rounded-lg shadow-lg text-white font-bold"
              onClick={() => router.push("newmessage")}
            >
              Create New Message
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
      <main className="max-w-[1250px] m-auto p-[1rem]">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {messages.length ? (
            messages.map((message, i) => (
              <div
                key={i}
                className="  mb-4 relative border py-8 px-3 rounded-md bg-gray-200 text-black"
              >
                <span className="text-[13px] mb-2">Email: {message.email}</span>
                <p className="text-[14px] bg-white p-4 rounded-md">
                  {message.message}
                </p>
                <span className="text-[12px] absolute bottom-2 right-2">
                  {new Date(message.createdAt).toLocaleString().split(",")[0]}
                </span>
                <span className="absolute text-[14px] top-[-10px] left-[-10px] text-sm text-white rounded-md p-1 bg-gray-700">
                  {message.name}
                </span>
                <button
                  className="p-2 bg-gray-400 rounded-md absolute text-[14px] top-2 right-2 text-sm hover:bg-gray-500 shadow-lg text-white font-bold"
                  onClick={() => {
                    backend.deleteMessage(message.messageID);
                    setMessages(messages.filter((m) => m !== message));
                  }}
                >
                  Delete
                </button>
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
      </main>
    </div>
  );
}

export default message;
