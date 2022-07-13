import React from "react";
import Container from "./container";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import SectionTitle from "./sectionTitle";

export default function Roadmap() {
  return (
    <>
      <div className="overflow-y-hidden relative z-50">
        <div className="mx-auto container py-6 px-4">
          <div className="w-full flex justify-center">
            <div className="w-full md:w-11/12 xl:w-10/12">
              <div>
                <div className="backdrop-blur-lg rounded-xl border-[1px] border-white/10 px-12 mt-4 bg-blue/75">
                  <SectionTitle
                    className="!p-0"
                    pretitle="Know each step of the Moos"
                    title="Roadmap"
                    align="left"
                  ></SectionTitle>
                </div>
                <Container>
                  <div className="relative z-50 px-6 py-6 sm:px-6 sm:py-6 lg:px-12 lg:py-12  mb-4  bg-gradient-to-r from-indigo-300/10 to-blue/10 backdrop-blur-lg border-[1px] border-white/10  rounded-xl">
                    <p className="text-xl font-regular  text-white">
                      Phase 1 - 🐮 The first Moo
                    </p>
                    <span className="inline-flex items-center text font-normal text-gray-400">
                      01. Dissemination of Moo through the 🔺 $AVAX network
                      <br />
                      02. Discord server launch
                      <br />
                      03. Be Moolish!
                      <br />
                      04. Partnerships with projects
                      <br />
                      05. Events with Moo community
                      <br />
                      06. NFT Mint on Joepegs launchpad
                      <br />
                      07. See your Moo on the Moo World website
                      <br />
                    </span>
                  </div>
                  <div className="relative z-50 px-6 py-6 sm:px-6 sm:py-6 lg:px-12 lg:py-12  mb-4  bg-gradient-to-r from-indigo-300/10 to-blue/10 backdrop-blur-lg border-[1px] border-white/10  rounded-xl">
                    <p className="text-xl font-regular  text-white">
                      Phase 2 - 🌍 Opening of the world
                    </p>
                    <span className="inline-flex items-center text font-normal text-gray-400">
                      This phase will be revealed when the project gets to that
                    </span>
                  </div>
                  <div className="relative z-50 px-6 py-6 sm:px-6 sm:py-6 lg:px-12 lg:py-12  mb-4  bg-gradient-to-r from-indigo-300/10 to-blue/10 backdrop-blur-lg border-[1px] border-white/10  rounded-xl">
                    <p className="text-xl font-regular  text-white">
                      Phase 3 - 💰 Putting the Moo to Work
                    </p>
                    <span className="inline-flex items-center text font-normal text-gray-400">
                      This phase will be revealed when the project gets to that
                    </span>
                  </div>
                  <div className="relative z-50 px-6 py-6 sm:px-6 sm:py-6 lg:px-12 lg:py-12  mb-4  bg-gradient-to-r from-indigo-300/10 to-blue/10 backdrop-blur-lg border-[1px] border-white/10  rounded-xl">
                    <p className="text-xl font-regular  text-white">
                      Phase 4 - 🪐 New worlds for the Moo
                    </p>
                    <span className="inline-flex items-center text font-normal text-gray-400">
                      This phase will be revealed when the project gets to that
                    </span>
                  </div>
                  <div className="relative z-50 px-6 py-6 sm:px-6 sm:py-6 lg:px-12 lg:py-12  mb-4  bg-gradient-to-r from-indigo-300/10 to-blue/10 backdrop-blur-lg border-[1px] border-white/10  rounded-xl">
                    <p className="text-xl font-regular  text-white">
                      Phase 5 - 👨‍👩‍👧‍👦 Exploration, population growth and new
                      generations
                    </p>
                    <span className="inline-flex items-center text font-normal text-gray-400">
                      This phase will be revealed when the project gets to that
                    </span>
                  </div>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
