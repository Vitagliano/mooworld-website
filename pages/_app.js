import { ThemeProvider } from "next-themes";
import "../css/tailwind.css";
import Particles from "react-tsparticles";
import particlesOptions from "../components/particles.json";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function getLibrary(provider) {
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
      <ToastContainer />
    </Web3ReactProvider>
  );
}

export default MyApp;
