import React from "react";
import Container from "./container";
import MintBox from "./MintBox";

export default function MintInfo() {
  return (
    <>
      <div className="overflow-y-hidden relative z-50">
        <div className="mx-auto container py-6 px-4">
          <div className="w-full flex justify-center">
            <div className="w-full md:w-11/12 xl:w-10/12">
              <MintBox />
              <div>
                <Container>
                  <div className="grid overflow-hidden lg:grid-cols-4 lg:grid-rows-1 gap-4 lg:grid-flow-row">
                    <div className="backdrop-blur-lg rounded-xl border-[1px] border-white/10 bg-blue/75 flex flex-row justify-center items-center">
                      <img src="./img/supply.gif" className="w-32 h-32" />
                      <div className={`flex flex-col`}>
                        <div className="text-sm font-bold tracking-wider text-white uppercase">
                          Supply
                        </div>

                        <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight lg:leading-tight lg:text-4xl text-white">
                          2000
                        </h2>
                      </div>
                    </div>
                    <div className="backdrop-blur-lg rounded-xl border-[1px] border-white/10 bg-blue/75 flex flex-row justify-center items-center">
                      <img src="./img/price.png" className="w-32 h-32" />
                      <div className={`flex flex-col`}>
                        <div className="text-sm font-bold tracking-wider text-white uppercase">
                          Price
                        </div>

                        <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight lg:leading-tight lg:text-4xl text-white">
                          1 AVAX
                        </h2>
                      </div>
                    </div>
                    <div className="backdrop-blur-lg rounded-xl border-[1px] border-white/10 bg-blue/75 flex flex-row justify-center items-center">
                      <img src="./img/calendar.png" className="w-32 h-32" />
                      <div className={`flex flex-col`}>
                        <div className="text-sm font-bold tracking-wider text-white uppercase">
                          Date
                        </div>

                        <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight lg:leading-tight lg:text-4xl text-white">
                          07/20
                        </h2>
                      </div>
                    </div>
                    <div className="backdrop-blur-lg rounded-xl border-[1px] border-white/10 bg-blue/75 flex flex-row justify-center items-center">
                      <img src="./img/joepegs.png" className="w-16 h-16 mr-6" />

                      <div className={`flex flex-col`}>
                        <div className="text-sm font-bold tracking-wider text-white uppercase">
                          Launchpad
                        </div>

                        <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight lg:leading-tight lg:text-4xl text-white">
                          Joepegs
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
