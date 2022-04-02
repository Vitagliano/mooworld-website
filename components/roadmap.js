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
                  <div className="relative z-50 px-12 py-12  mb-4  bg-gradient-to-r from-indigo-300/10 to-blue/10 backdrop-blur-lg border-[1px] border-white/10  rounded-xl">
                    <p className="text-xl font-regular  text-white">
                      Phase 1 - 🐮 The first Moo
                    </p>
                    <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                      <li>
                        <a className="block items-center p-3 sm:flex hover:bg-blue/80 rounded-xl">
                          <img
                            className="mr-3 mb-3 w-12 h-12 rounded-full sm:mb-0"
                            src="./img/planetIcon.png"
                          />
                          <div className="text-gray-600 dark:text-gray-400">
                            <div className="text-base font-normal">
                              <span className="font-medium text-gray-900 dark:text-white">
                                Project presentation
                              </span>
                            </div>
                            <span className="inline-flex items-center text-xs font-normal text-green-400">
                              Done
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a className="block items-center p-3 sm:flex hover:bg-blue/80 rounded-xl">
                          <img
                            className="mr-3 mb-3 w-12 h-12 rounded-full sm:mb-0"
                            src="./img/planetIcon.png"
                          />
                          <div className="text-gray-600 dark:text-gray-400">
                            <div className="text-base font-normal">
                              <span className="font-medium text-gray-900 dark:text-white">
                                Community creation on Discord
                              </span>
                            </div>
                            <span className="inline-flex items-center text-xs font-normal text-yellow-400">
                              Doing
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a className="block items-center p-3 sm:flex hover:bg-blue/80 rounded-xl">
                          <img
                            className="mr-3 mb-3 w-12 h-12 rounded-full sm:mb-0"
                            src="./img/planetIcon.png"
                          />
                          <div className="text-gray-600 dark:text-gray-400">
                            <div className="text-base font-normal">
                              <span className="font-medium text-gray-900 dark:text-white">
                                Roadmap
                              </span>
                            </div>
                            <span className="inline-flex items-center text-xs font-normal text-green-400">
                              Done
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a className="block items-center p-3 sm:flex hover:bg-blue/80 rounded-xl">
                          <img
                            className="mr-3 mb-3 w-12 h-12 rounded-full sm:mb-0"
                            src="./img/planetIcon.png"
                          />
                          <div className="text-gray-600 dark:text-gray-400">
                            <div className="text-base font-normal">
                              <span className="font-medium text-gray-900 dark:text-white">
                                Beginning of the story [1/5]
                              </span>
                            </div>
                            <span className="inline-flex items-center text-xs font-normal text-gray-400">
                              Waiting
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a className="block items-center p-3 sm:flex hover:bg-blue/80 rounded-xl">
                          <img
                            className="mr-3 mb-3 w-12 h-12 rounded-full sm:mb-0"
                            src="./img/planetIcon.png"
                          />
                          <div className="text-gray-600 dark:text-gray-400">
                            <div className="text-base font-normal">
                              <span className="font-medium text-gray-900 dark:text-white">
                                Development of landing page for project
                                presentation
                              </span>
                            </div>
                            <span className="inline-flex items-center text-xs font-normal text-green-400">
                              Done
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a className="block items-center p-3 sm:flex hover:bg-blue/80 rounded-xl">
                          <img
                            className="mr-3 mb-3 w-12 h-12 rounded-full sm:mb-0"
                            src="./img/planetIcon.png"
                          />
                          <div className="text-gray-600 dark:text-gray-400">
                            <div className="text-base font-normal">
                              <span className="font-medium text-gray-900 dark:text-white">
                                Whitelist Mint
                              </span>
                            </div>
                            <span className="inline-flex items-center text-xs font-normal text-gray-400">
                              Waiting
                            </span>
                          </div>
                        </a>
                      </li>
                    </ol>
                  </div>
                  <div className="relative z-50 px-12 py-12  mb-4  bg-gradient-to-r from-indigo-300/10 to-blue/10 backdrop-blur-lg border-[1px] border-white/10  rounded-xl">
                    <p className="text-xl font-regular  text-white">
                      Phase 2 - 🌍 Opening of the world
                    </p>
                    <span className="inline-flex items-center text-xs font-normal text-gray-400">
                      This phase will be revealed when the project gets to that
                    </span>
                  </div>
                  <div className="relative z-50 px-12 py-12  mb-4  bg-gradient-to-r from-indigo-300/10 to-blue/10 backdrop-blur-lg border-[1px] border-white/10  rounded-xl">
                    <p className="text-xl font-regular  text-white">
                      Phase 3 - 💰 Putting the Moo to Work
                    </p>
                    <span className="inline-flex items-center text-xs font-normal text-gray-400">
                      This phase will be revealed when the project gets to that
                    </span>
                  </div>
                  <div className="relative z-50 px-12 py-12  mb-4  bg-gradient-to-r from-indigo-300/10 to-blue/10 backdrop-blur-lg border-[1px] border-white/10  rounded-xl">
                    <p className="text-xl font-regular  text-white">
                      Phase 4 - 🪐 New worlds for the Moo
                    </p>
                    <span className="inline-flex items-center text-xs font-normal text-gray-400">
                      This phase will be revealed when the project gets to that
                    </span>
                  </div>
                  <div className="relative z-50 px-12 py-12  mb-4  bg-gradient-to-r from-indigo-300/10 to-blue/10 backdrop-blur-lg border-[1px] border-white/10  rounded-xl">
                    <p className="text-xl font-regular  text-white">
                      Phase 5 - 👨‍👩‍👧‍👦 Exploration, population growth and new
                      generations
                    </p>
                    <span className="inline-flex items-center text-xs font-normal text-gray-400">
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
