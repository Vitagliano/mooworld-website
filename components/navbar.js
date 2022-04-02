import Link from "next/link";
import Container from "./container";

export default function Navbar() {
  return (
    <Container>
      <nav className="relative z-50 px-8 sm:px-4 md:px-8 lg:py-8 lg:px-32 flex flex-wrap items-center justify-between mx-auto lg:justify-between ">
        <div className="transition-all space-x-4 lg:flex nav__item hover:scale-125">
          <Link href="https://twitter.com/mooworldnft">
            <a className="">
              <img src="./img/followUsButton.png" />
            </a>
          </Link>
        </div>

        <Link href="/">
          <a className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
            <img src="/img/logo.png" alt="Moo World" className="w-64" />
          </a>
        </Link>

        <div className="transition-all space-x-4 lg:flex nav__item hover:scale-125">
          <Link href="#chapter-one">
            <a className="">
              <img src="./img/aboutUsButton.png" />
            </a>
          </Link>
        </div>
      </nav>
    </Container>
  );
}
