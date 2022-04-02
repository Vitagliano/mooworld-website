import { ThemeProvider } from "next-themes";
import "../css/tailwind.css";
import Particles from "react-tsparticles";
import particlesOptions from "../components/particles.json";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />

    </ThemeProvider>
  );
}

export default MyApp;
