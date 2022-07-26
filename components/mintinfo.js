import React from "react";
import Container from "./container";
import MintBox from "./MintBox";
export default function MintInfo() {
  return (
    <>
      <div className="overflow-y-hidden relative z-50">
        <div className="mx-auto container">
          <div className="w-full flex justify-center">
            <div className="w-full md:w-11/12 xl:w-10/12">
              <div className="sm:flex sm:flex-col lg:grid overflow-hidden lg:grid-cols-2 lg:grid-rows-1 gap-4 lg:grid-flow-row mb-10 px-4">
                <div className="box">
                  <MintBox />
                </div>
                <div className="w-full flex justify-end">
                  <img
                    src="./img/show.gif"
                    alt="Moo World"
                    className="rounded-xl shadow-xl border-[1px] border-white/20 w-[500px] h-[500px] lg:h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
