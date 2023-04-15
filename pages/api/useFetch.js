/* eslint-disable react-hooks/rules-of-hooks */
import useSWR from "swr";
import { api } from "./Config";
const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("An error occurred while fetching the data");
  }
  return response.json();
};

export const useFetch = (path, requiresAuth = false, credentials = null) => {
  const url = `${api.apiBaseUrl}${path}`;

  if (requiresAuth) {
    const encodedCredentials = btoa(
      `${credentials.emailAddress}:${credentials.password}`
    );
    const options = {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Basic ${encodedCredentials}`,
      },
    };
    return useSWR([url, options], (url, options) => fetcher(url, options));
  } else {
    return useSWR(url, fetcher);
  }
};
