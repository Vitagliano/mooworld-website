import React from "react";
import Container from "./container";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import SectionTitle from "./sectionTitle";

export default function Faq() {
  return (
    <>
      <div className="overflow-y-hidden relative z-50">
        <div className="mx-auto container py-6 px-4">
          <div className="w-full flex justify-center">
            <div className="w-full rounded-xl md:w-11/12 xl:w-10/12">
              <div>
                <Container>
                  <div className="grid overflow-hidden grid-cols-1 grid-rows-2 gap-5 grid-flow-row sm:grid-cols-1 sm:grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 ">
                    <div className="w-full h-full sm:h-full lg:h-[448px] flex justify-center items-center self-center flex-col">
                      <div className="backdrop-blur-lg rounded-xl border-[1px] border-white/10 px-4 mb-4 bg-blue/75 flex sm:flex sm:mb-4 md:mb-4 md:flex lg:hidden">
                        <SectionTitle
                          className="!p-0"
                          pretitle="Have a question? FIND THE ANSWERS HERE"
                          title="F.A.Q."
                          align="left"
                        ></SectionTitle>
                      </div>
                      <img
                        src="./img/thinkMoo.png"
                        alt="Moo World"
                        width="55%"
                      />
                    </div>

                    <div className="relative z-50 w-full max-w-2xl rounded-2xl">
                      <div className="backdrop-blur-lg rounded-xl border-[1px] border-white/10 px-4 mb-4 bg-blue/75 hidden sm:hidden md:hidden lg:flex">
                        <SectionTitle
                          className="!p-0"
                          pretitle="Have a question? FIND THE ANSWERS HERE"
                          title="F.A.Q."
                          align="left"
                        ></SectionTitle>
                      </div>

                      {faqdata.map((item, index) => (
                        <div key={item.question} className="mb-5">
                          <Disclosure>
                            {({ open }) => (
                              <>
                                <Disclosure.Button
                                  className={`${
                                    open
                                      ? "rounded-t-xl rounded-b-none"
                                      : "rounded-xl "
                                  } flex backdrop-blur-lg border-[1px] border-white/10 items-center justify-between w-full px-4 py-4 text-lg text-left text-white  hover:bg-blue transition-all focus:outline-none focus-visible:ring focus-visible:ring-purple focus-visible:ring-opacity-75 bg-blue/75 `}
                                >
                                  <span>{item.question}</span>
                                  <ChevronUpIcon
                                    className={`${
                                      open ? "transform rotate-180" : ""
                                    } w-5 h-5 text-indigo-500  transition-all `}
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-white backdrop-blur-lg border-[1px] border-white/10 rounded-b-xl">
                                  {item.answer}
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        </div>
                      ))}
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

const faqdata = [
  {
    question: "What is the collection size and price of Moo World?",
    answer: "The Moo collection consists of 888 NFTs and the price is TBA.",
  },
  {
    question: "When is the launch date?",
    answer:
      "The Moo Mint date will be announced on Discord",
  },
  {
    question: "What is the utility behind holding Moos?",
    answer: "Read our roadmap to know everything about the Moo's utilities.",
  },
];
