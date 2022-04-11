import React from "react";
import Container from "./container";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import SectionTitle from "./sectionTitle";

export default function MintInfo() {
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
                    pretitle="All important information is here"
                    title="Mint Info"
                    align="left"
                  ></SectionTitle>
                </div>
                <Container>
                  <div class="grid overflow-hidden lg:grid-cols-4 lg:grid-rows-1 gap-4 lg:grid-flow-row">
                    <div class="backdrop-blur-lg rounded-xl border-[1px] border-white/10 bg-blue/75 flex flex-row justify-center items-center">
                      <img src="./img/supply.gif" className="w-32 h-32" />
                      <div className={`flex flex-col`}>
                        <div className="text-sm font-bold tracking-wider text-white uppercase">
                          Supply
                        </div>

                        <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight lg:leading-tight lg:text-4xl text-white">
                          888
                        </h2>
                      </div>
                    </div>
                    <div class="backdrop-blur-lg rounded-xl border-[1px] border-white/10 bg-blue/75 flex flex-row justify-center items-center">
                      <img src="./img/price.png" className="w-32 h-32" />
                      <div className={`flex flex-col`}>
                        <div className="text-sm font-bold tracking-wider text-white uppercase">
                          Price
                        </div>

                        <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight lg:leading-tight lg:text-4xl text-white">
                          2 SOL
                        </h2>
                      </div>
                    </div>
                    <div class="backdrop-blur-lg rounded-xl border-[1px] border-white/10 bg-blue/75 flex flex-row justify-center items-center">
                      <img src="./img/calendar.png" className="w-32 h-32" />
                      <div className={`flex flex-col`}>
                        <div className="text-sm font-bold tracking-wider text-white uppercase">
                          Date
                        </div>

                        <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight lg:leading-tight lg:text-4xl text-white">
                          04/14
                        </h2>
                      </div>
                    </div>
                    <div class="backdrop-blur-lg rounded-xl border-[1px] border-white/10 bg-blue/75 flex flex-row justify-center items-center">
                      <div className={`flex flex-col`}>
                        <div className="text-sm font-bold tracking-wider text-white uppercase">
                          Launchpad
                        </div>

                        <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight lg:leading-tight lg:text-4xl text-white">
                          Monkelabs
                        </h2>
                      </div>
                    </div>
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
