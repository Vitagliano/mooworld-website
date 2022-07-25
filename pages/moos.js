import React, { useState, useEffect } from "react";
import Container from "../components/container";
import Navbar from "../components/navbar";
import { ethers } from "ethers";

import Particles from "react-tsparticles";
import useWeb3 from "../hooks/useWeb3";
import useMoos from "../hooks/useMoos";

import { toast } from "react-toastify";

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
          <h1 className="text-xl sm:text-3xl mt-8 font-extrabold text-white mb-6">
            My Moos
          </h1>
          <ul className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {userMoos.map((moo, index) => {
              if (moo.length === 0 && balance > 0) {
                <li
                  key="moo world unrevealed"
                  className="flex flex-col items-center justify-center"
                >
                  <button type="button" onClick={() => handleOpenModal(moo)}>
                    <img
                      src={
                        "https://ipfs.io/ipfs/bafybeicsxlgdsvw7xeni4wavifengbdhonwihdxhwsm5n4kmwodyw7ls3m/moo-world-unrevealed.gif"
                      }
                      alt="moo world unrevealed"
                      className="w-60 h-60 rounded-xl mb-6"
                    />
                    <span className="font-bold py-2 text-white">{`Moo #${index}`}</span>
                  </button>
                </li>;
              }

              return (
                <li
                  key={moo.name}
                  className="flex flex-col items-center justify-center"
                >
                  <button type="button" onClick={() => handleOpenModal(moo)}>
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
                      className="w-60 h-60 rounded-xl mb-6"
                    />
                    <span className="font-bold py-2 text-white">{`Moo #${index}`}</span>
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
        className="bg-semitransparent backdrop-blur-xl w-full h-screen absolute top-0 left-0 right-0 flex items-center justify-center"
        onClick={() => setMooSelected(null)}
      >
        <div
          className="w-3/4 h-3/4 rounded-xl bg-brown-100 shadow-2xl p-5 flex flex-row "
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={mooSelected.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
            alt={mooSelected.name}
            className="w-96 h-96 mx-auto rounded-xl"
          />
          <div className="w-2/4 p-5">
            <h2 className="font-extrabold text-xl text-white pb-5">
              {mooSelected.name}
            </h2>
            <table className="w-full">
              <tr>
                <th className="text-left text-white">Attribute</th>
                <th className="text-left text-white">Value</th>
                <th className="text-left text-white">Rarity</th>
              </tr>
              {mooSelected.attributes.map((attr) => {
                return (
                  <tr>
                    <td className="text-white">{attr.trait_type}</td>
                    <td className="text-white">{attr.value}</td>
                    <td className="text-white">Soon!</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
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
