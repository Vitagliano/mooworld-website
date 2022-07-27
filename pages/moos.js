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
      <div className="flex justify-center items-center w-full mt-4 lg:mt-0 z-50">
        <div className="w-full backdrop-blur-lg border-[1px] border-white/10 rounded-xl md:w-11/12 xl:w-10/12 bg-gradient-to-r from-indigo-300/10 to-blue/10 md:py-8 md:px-8 px-5 py-4 xl:px-12 xl:py-16 xl:pb-8">
          <h4 className="text-white text-[28px] text-center">
            Connect your wallet
          </h4>
          <div className="flex justify-center">
            <button className="text-white text-[20px]" onClick={activate}>
              Connect
            </button>
          </div>
        </div>
      </div>
    );
  };

  const MooListContent = () => {
    return (
      <div className="flex justify-center items-center w-full mt-4 lg:mt-0 z-50">
        <div className="w-full backdrop-blur-lg border-[1px] border-white/10 rounded-xl md:w-11/12 xl:w-10/12 bg-gradient-to-r from-indigo-300/10 to-blue/10 md:py-8 md:px-8 px-5 py-4 xl:px-12 xl:py-16 xl:pb-8">
          <div className="flex items-center pb-[1rem] pt-[1rem] justify-between">
            <h1 className="text-xl sm:text-3xl font-extrabold text-white">
              My Moos
            </h1>
            <MooTag mooQuantity={userMoos.length} />
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {userMoos.length === 0 && balance > 0 && (
              <li
                key="moo world unrevealed"
                className="flex flex-col items-center justify-center"
              >
                <img
                  src={
                    "https://ipfs.io/ipfs/bafybeicsxlgdsvw7xeni4wavifengbdhonwihdxhwsm5n4kmwodyw7ls3m/moo-world-unrevealed.gif"
                  }
                  alt="moo world unrevealed"
                  className="w-60 h-60 rounded-xl mb-6"
                />
                <span className="font-bold py-2 text-white">
                  Moo World unrevealed
                </span>
              </li>
            )}
            {userMoos.map((moo, index) => {
              return (
                <li
                  key={moo.name}
                  className="flex flex-col items-center justify-center p-[1rem] bg-white rounded-[8px] hover:scale-[1.04] transition-all duration-200"
                >
                  <button
                    className="outline-none border-none outline-0 focus:outline-none"
                    type="button"
                    onClick={() => handleOpenModal(moo)}
                  >
                    <img
                      src={
                        moo.image
                          ? moo.image.replace(
                              "ipfs://",
                              "https://cloudflare-ipfs.com/ipfs/"
                            )
                          : "https://ipfs.io/ipfs/bafybeicsxlgdsvw7xeni4wavifengbdhonwihdxhwsm5n4kmwodyw7ls3m/moo-world-unrevealed.gif"
                      }
                      alt={moo.name}
                      className="w-[100%] rounded-xl mb-6"
                    />
                    <span className="py-2 text-black">{`Moo #${index}`}</span>
                  </button>
                </li>
              );
            })}
          </ul>
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
          className="bg-white rounded-xl bg-brown-100 shadow-2xl p-5 flex flex-row  w-[50%]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={mooSelected.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
            alt={mooSelected.name}
            className="w-96 h-96 rounded-xl"
          />

          <div className="w-full p-5">
            <h2 className="font-bold text-[48px] text-black pb-[1rem]">
              {`Moo #${mooSelected.edition}`}
            </h2>
            <div className="mb-[1rem]">
              <span className="text-[#aeafc2] mb-[1rem] text-[1.5rem] block">
                Description
              </span>
              <p className="text-[#242424] text-[1.1rem]">
                2000 Cows discovering the universe of $AVAX. Now they must
                exploit the biodiversity of these planets to survive and build a
                community!
              </p>
            </div>
            <div className="bg-[#F6F6FF] border-[1px] border-[rgb(235, 235, 245)] rounded-[0.75rem] p-[1rem]">
              <span className="mb-[1rem] block text-[1.3rem]">
                Properties {mooSelected?.attributes.length}
              </span>
              <div className="grid gap-4 grid-cols-3 ">
                {mooSelected.attributes.map((attr) => {
                  return (
                    <div className="border-[1px] border-[rgb(235, 235, 245)] p-[1rem] flex flex-col rounded-[0.75rem] bg-white text-center">
                      <span className="text-[#aeafc2]">{attr.trait_type}</span>
                      <span className="text-[#242424]">{attr.value}</span>
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
