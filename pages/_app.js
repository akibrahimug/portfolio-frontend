import "../styles/globals.css";
import { Provider } from "./Context";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
