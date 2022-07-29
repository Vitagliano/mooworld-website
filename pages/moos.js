import React, { useState, useEffect } from "react";
import Container from "../components/container";
import Navbar from "../components/navbar";
import { ethers } from "ethers";
import Head from "next/head";
import Particles from "react-tsparticles";
import useWeb3 from "../hooks/useWeb3";
import useMoos from "../hooks/useMoos";

import { toast } from "react-toastify";
import MooTag from "../components/MooTag";
import SectionTitle from "../components/sectionTitle";
import { FaTwitter } from "react-icons/fa";

const MooPage = () => {
  const [userMoos, setUserMoos] = useState([]);
  const [mooSelected, setMooSelected] = useState(null);
  const [balance, setBalance] = useState(0);
  const { activate, deactivate, active, account, web3 } = useWeb3();

  const { mooContract, getUserMoosTokens, getMooMetadata, getBalanceOf } =
    useMoos(web3, account);

  useEffect(async () => {
    if (active && mooContract && userMoos.length === 0) {
      const userBalance = await getBalanceOf();
      setBalance(userBalance);
      const getMoosPromise = new Promise((resolve, reject) => {
        getUserMoosTokens()
          .then((moos) => {
            if (moos) {
              Promise.all(
                moos.map((moo) =>
                  getMooMetadata(ethers.utils.formatUnits(moo, 0))
                )
              )
                .then((metadatas) => {
                  setUserMoos(metadatas);
                  resolve();
                })
                .catch((error) => {
                  console.log(error);
                  reject();
                });
            } else {
              reject();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });

      toast.promise(getMoosPromise, {
        pending: "Loading Moos...",
        success: "Moos loaded",
        error: "Error loading Moos... Try again!",
      });
    }
  }, [mooContract]);

  const handleOpenModal = (moo) => {
    setMooSelected(moo);
  };

  const DisconectedContent = () => {
    return (
      <>
        <div className="flex justify-center items-center w-full mt-4 lg:mt-0 z-50">
          <div className="w-full flex-row flex justify-between backdrop-blur-lg border-[1px] border-white/10 rounded-xl md:w-11/12 xl:w-10/12 bg-gradient-to-r from-indigo-300/10 to-blue/10 md:py-8 md:px-8 px-5 py-4 xl:px-12 xl:py-16">
            <h4 className="text-white text-[42px] text-center">View Moos</h4>
            <div className="flex justify-center">
              <button
                className="p-[16px] mt-2 backdrop-blur-lg rounded-xl border-[1px] border-white/10 px-16 bg-burple text-white ease-in-out duration-300 hover:bg-burple/80 hover:border-white"
                onClick={activate}
              >
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const MooListContent = () => {
    return (
      <div className="flex justify-center items-center w-full mt-4 lg:mt-0 z-50">
        <div className="w-full flex-col flex justify-between backdrop-blur-lg border-[1px] border-white/10 rounded-xl md:w-11/12 xl:w-10/12 bg-gradient-to-r from-indigo-300/10 to-blue/10 md:py-8 md:px-8 px-5 py-4 xl:px-12 xl:py-16">
          <div className="w-full flex-row flex justify-between items-center">
            <h4 className="text-white text-[42px] text-center">
              View Moos ({userMoos.length})
            </h4>
            <div className="flex justify-center">
              <MooTag mooQuantity={userMoos.length} />
            </div>
          </div>
          <div className="w-full mt-8">
            <ul className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {userMoos.length === 0 && balance > 0 && (
                <ul className="flex flex-row gap-10">
                  <li className="flex flex-col ">
                    <div className="bg-blue/90 w-60 h-60 animate-pulse rounded-xl mb-6"></div>
                    <span className="font-bold w-full text-center py-2 text-white">
                      Loading Moos...
                    </span>
                  </li>
                  <li className="flex flex-col ">
                    <div className="bg-blue/90 w-60 h-60 animate-pulse rounded-xl mb-6"></div>

                    <span className="font-bold w-full text-center py-2 text-white">
                      Loading Moos...
                    </span>
                  </li>
                  <li className="flex flex-col ">
                    <div className="bg-blue/90 w-60 h-60 animate-pulse rounded-xl mb-6"></div>

                    <span className="font-bold w-full text-center py-2 text-white">
                      Loading Moos...
                    </span>
                  </li>
                  <li className="flex flex-col ">
                    <div className="bg-blue/90 w-60 h-60 animate-pulse rounded-xl mb-6"></div>

                    <span className="font-bold w-full text-center py-2 text-white">
                      Loading Moos...
                    </span>
                  </li>
                </ul>
              )}
              {userMoos.map((moo, index) => {
                return (
                  <li
                    key={index}
                    className="flex flex-col items-center justify-center p-[1rem] bg-blue border-[1px] border-white/10 text-white rounded-[8px] hover:scale-[1.04] transition-all duration-200"
                  >
                    <button
                      className="outline-none border-none outline-0 focus:outline-none"
                      type="button"
                      onClick={() => handleOpenModal(moo)}
                    >
                      <img
                        src={
                          moo?.image
                            ? moo?.image.replace(
                                "ipfs://",
                                "https://cloudflare-ipfs.com/ipfs/"
                              )
                            : "https://ipfs.io/ipfs/bafybeicsxlgdsvw7xeni4wavifengbdhonwihdxhwsm5n4kmwodyw7ls3m/moo-world-unrevealed.gif"
                        }
                        alt={moo?.name}
                        className="w-[100%] rounded-xl mb-6"
                      />
                      <span className="py-2">{`Moo #${index}`}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const MooModal = () => {
    return (
      <div
        className="bg-semitransparent backdrop-blur-xl fixed h-screen w-full top-0 left-0 right-0 flex items-center justify-center z-50"
        onClick={() => setMooSelected(null)}
      >
        <div
          className="backdrop-blur-lg rounded-xl border-[1px] border-white/10 bg-blue/75 text-white shadow-2xl p-5 flex flex-row w-[50%]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={mooSelected.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
            alt={mooSelected.name}
            className="w-96 h-96 rounded-xl"
          />

          <div className="w-full ml-5">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-[48px] text-white">
                {`Moo #${mooSelected.id}`}
              </h2>

              <div className="flex flex-row">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://twitter.com/share?text=Check%20out%20Moo%20World%20%23${mooSelected.id}%20on%20@0xCampfire&hashtags=AVAX,MooWorld&url=https://campfire.exchange/collections/0xcfd8402927f07a4d1e4dfe7f9c60f6ebf9ed3673/${mooSelected.id}`}
                  data-show-count="false"
                >
                  <button className="p-[10px] px-6 mr-4 backdrop-blur-lg rounded-xl border-[1px] border-white/10 bg-blue/75 text-white ease-in-out flex flex-row gap-2 justify-center items-center hover:bg-blue hover:border-white duration-300">
                    <FaTwitter size={18} /> Share
                  </button>
                </a>
              </div>
            </div>

            <div className="mt-2">
              <span className="text-white/80 text-[1.5rem] block  mb-2">
                Description
              </span>
              <p className="text-white text-[1rem]">
                2000 Cows discovering the universe of $AVAX. Now they must
                exploit the biodiversity of these planets to survive and build a
                community!
              </p>
            </div>
            <div className="mt-6">
              <span className="text-white/80 text-[1.5rem] flex gap-2 mb-2">
                Properties <span>({mooSelected?.attributes.length})</span>
              </span>
              <div className="grid gap-4 grid-cols-3 ">
                {mooSelected.attributes.map((attr) => {
                  return (
                    <div
                      key={attr.trait_type}
                      className="border-[1px] border-[rgb(235, 235, 245)] p-[1rem] flex flex-row justify-between rounded-xl backdrop-blur-xl border-[1px] border-white/10 bg-gradient-to-r from-indigo-300/10 to-blue/10"
                    >
                      <div className="flex flex-col">
                        <span className="text-white/60 text-sm">
                          {attr.trait_type}
                        </span>
                        <span className="text-white text-lg">{attr.value}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>View Moos - Moo World</title>
        <meta
          name="description"
          content="2000 Cows discovering the universe of Avalanche.
        But now they must exploit the biodiversity of these planets to survive!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Particles
        id="tsparticles"
        options={{
          fullScreen: {
            enable: true,
          },
          fpsLimit: 60,
          particles: {
            groups: {
              z5000: {
                number: {
                  value: 70,
                },
                zIndex: {
                  value: 5000,
                },
              },
              z7500: {
                number: {
                  value: 30,
                },
                zIndex: {
                  value: 75,
                },
              },
              z2500: {
                number: {
                  value: 50,
                },
                zIndex: {
                  value: 25,
                },
              },
              z1000: {
                number: {
                  value: 40,
                },
                zIndex: {
                  value: 10,
                },
              },
            },
            number: {
              value: 200,
              density: {
                enable: false,
                value_area: 800,
              },
            },
            color: {
              value: "#fff",
              animation: {
                enable: false,
                speed: 10,
                sync: true,
              },
            },
            shape: {
              type: "star",
            },
            opacity: {
              value: 1,
              random: false,
              animation: {
                enable: false,
                speed: 3,
                minimumValue: 0.1,
                sync: false,
              },
            },
            size: {
              value: 3,
            },
            links: {
              enable: false,
              distance: 100,
              color: "#ffffff",
              opacity: 0.4,
              width: 1,
            },
            move: {
              angle: {
                value: 10,
                offset: 0,
              },
              enable: true,
              speed: 5,
              direction: "right",
              random: false,
              straight: true,
              outModes: {
                default: "out",
              },
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
            zIndex: {
              value: 5,
              opacityRate: 0.5,
            },
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              onHover: {
                enable: false,
                mode: "repulse",
              },
              onClick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 400,
                links: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 0.8,
              },
              repulse: {
                distance: 200,
              },
              push: {
                quantity: 4,
                groups: ["z5000", "z7500", "z2500", "z1000"],
              },
              remove: {
                quantity: 2,
              },
            },
          },
          detectRetina: true,
          background: {
            color: "#131329",
            image: "./img/Stars.png",
            position: "50% 50%",
            repeat: "repeat",
            size: "cover",
          },
          emitters: {
            position: {
              y: 55,
              x: -30,
            },
            rate: {
              delay: 7,
              quantity: 1,
            },
            size: {
              width: 0,
              height: 0,
            },
            particles: {
              shape: {
                type: "images",
                options: {
                  images: [
                    {
                      src: "./img/GreenMoo.png",
                      width: 205,
                      height: 267,
                    },
                    {
                      src: "./img/YellowMoo.png",
                      width: 205,
                      height: 267,
                    },
                    {
                      src: "./img/PinkMoo.png",
                      width: 205,
                      height: 267,
                    },
                    {
                      src: "./img/RedMoo.png",
                      width: 305,
                      height: 367,
                    },
                    {
                      src: "./img/BlueMoo.png",
                      width: 405,
                      height: 467,
                    },
                  ],
                },
              },
              size: {
                value: 40,
              },
              move: {
                speed: 10,
                outModes: {
                  default: "destroy",
                  left: "none",
                },
                straight: false,
              },
              zIndex: {
                value: 0,
              },
              rotate: {
                value: {
                  min: 0,
                  max: 360,
                },
                animation: {
                  enable: true,
                  speed: 10,
                  sync: true,
                },
              },
            },
          },
        }}
      />
      <Container className="flex flex-wrap p-0">
        {!active && DisconectedContent()}
        {active && MooListContent()}
        {mooSelected != null && MooModal()}
      </Container>
    </>
  );
};

export default MooPage;
