import Link from "next/link";
import Container from "./container";

export default function Navbar() {
  return (
    <Container>
      <nav className="relative z-50 px-8 sm:px-4 md:px-8 lg:py-8 lg:px-32 flex flex-wrap items-center justify-center sm:justify-center mx-auto lg:justify-between ">
        <div className="transition-all space-x-4 nav__item hidden sm:hidden md:hidden lg:flex xl:relative ">
          <Link href="https://twitter.com/mooworldsol">
            <a className="hover:scale-125 transition-all">
              <img src="./img/followUsButton.png" />
            </a>
          </Link>
          <Link href="https://discord.gg/mooworld">
            <a className="hover:scale-125 transition-all">
              <img src="./img/discordButton.png" />
            </a>
          </Link>
        </div>

        <Link href="/">
          <a className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
            <img src="/img/logo.png" alt="Moo World" className="w-64" />
          </a>
        </Link>

        <div className="flex flex-row sm:flex mt-4 sm:mt-4 md:mt-4 lg:mt-0 sm:flex-row md:flex-row transition-all space-x-4 lg:flex nav__item hover:scale-125">
          <Link href="https://twitter.com/mooworldnft">
            <a className="relative sm:relative md:relative xl:hidden lg:hidden">
              <img src="./img/followUsButton.png" />
            </a>
          </Link>
          <Link href="#chapter-one">
            <a className="">
              <img src="./img/aboutUsButton.png" />
            </a>
          </Link>

          <Link href="https://discord.gg/mooworld">
            <a className="relative sm:relative md:relative xl:hidden lg:hidden">
              <img src="./img/discordButton.png" />
            </a>
          </Link>
        </div>
      </nav>
    </Container>
  );
}
