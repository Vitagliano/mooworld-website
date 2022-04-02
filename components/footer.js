import Link from "next/link";
import Image from "next/image";
import React from "react";
import Container from "./container";

export default function Footer() {
  const navigation = ["Product", "Features", "Pricing", "Company", "Blog"];
  const legal = ["Terms", "Privacy", "Legal"];
  return (
    <div className="overflow-y-hidden relative z-50">
      <div className="mx-auto container py-6 px-4">
        <div className="w-full flex justify-center">
          <div className="w-full backdrop-blur-lg border-[1px] border-white/10  rounded-xl md:w-11/12 xl:w-10/12 bg-gradient-to-r from-indigo-300/10 to-blue/10 md:py-8 md:px-8 px-5 py-4 xl:px-12 xl:py-4 xl:pb-16">
            <div>
              <Container>
                <div className="grid max-w-screen-xl grid-cols-1 gap-10 mx-auto mt-5 lg:grid-cols-4">
                  <div className="lg:col-span-0">
                    <div>
                      {" "}
                      <Link href="/">
                        <a>
                          <img
                            src="/img/logo.png"
                            alt="Moo World"
                            className="w-52"
                          />
                        </a>
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-2 flex justify-center items-center ">
                    <div className="w-full -mt-2 -ml-3 lg:ml-0">
                      <div className="max-w-md mt-4 text-white">
                        888 Cows discovering the universe of #solana But now
                        they must exploit the biodiversity of these planets to
                        survive! Staking, Breeding and Tamagotchi System.
                      </div>
                    </div>
                  </div>

                  <div className=" flex justify-center flex-col">
                    <div>Follow us</div>
                    <div className="flex mt-5 space-x-5 text-gray-400 hover:">
                      <a
                        href="https://twitter.com/mooworldnft"
                        target="_blank"
                        rel="noopener"
                      >
                        <span className="sr-only">Twitter</span>
                        <Twitter />
                      </a>
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Twitter = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M24 4.37a9.6 9.6 0 0 1-2.83.8 5.04 5.04 0 0 0 2.17-2.8c-.95.58-2 1-3.13 1.22A4.86 4.86 0 0 0 16.61 2a4.99 4.99 0 0 0-4.79 6.2A13.87 13.87 0 0 1 1.67 2.92 5.12 5.12 0 0 0 3.2 9.67a4.82 4.82 0 0 1-2.23-.64v.07c0 2.44 1.7 4.48 3.95 4.95a4.84 4.84 0 0 1-2.22.08c.63 2.01 2.45 3.47 4.6 3.51A9.72 9.72 0 0 1 0 19.74 13.68 13.68 0 0 0 7.55 22c9.06 0 14-7.7 14-14.37v-.65c.96-.71 1.79-1.6 2.45-2.61z" />
  </svg>
);
