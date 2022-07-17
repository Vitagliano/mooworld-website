import React, { useState, useEffect } from "react";
import Container from "../components/container";
import Navbar from "../components/navbar";
import { ethers } from "ethers";

import Particles from "react-tsparticles";
import useWeb3 from "../hooks/useWeb3";
import useMilk from "../hooks/useMilk";
import useMooWorld from "../hooks/useMooWorld";
import useStake from "../hooks/useStake";
import { toast } from "react-toastify";

const StakePage = () => {
  const [milk, setMilk] = useState(0);
  const [mooNft, setMooNft] = useState([]);
  const [isApproved, setIsApproved] = useState(false);
  const [stakedTokens, setStakedTokens] = useState([]);
  const { activate, deactivate, active, account, web3 } = useWeb3();

  const { getMilkBalance } = useMilk(web3, account);
  const { getUserMoosTokens, getIsApproved, setApproveForAll, getMooMetadata } =
    useMooWorld(web3, account);
  const { stakeNft, tokensOfOwner } = useStake(web3, account);

  useEffect(async () => {
    if (active) {
      const milk = await getMilkBalance();
      setMilk(milk);
      // const nfts = await getUserMoosTokens();
      // setMooNft(nfts);
      const isApprovedOnContract = await getIsApproved();
      setIsApproved(isApprovedOnContract);
      const tokensStaked = await tokensOfOwner();
      setStakedTokens(tokensStaked);
      if (mooNft.length === 0) {
        const getMooPromise = new Promise((resolve, reject) => {
          getUserMoosTokens()
            .then((moos) => {
              if (moos) {
                Promise.all(
                  moos.map((moo) =>
                    getMooMetadata(ethers.utils.formatUnits(moo, 0))
                  )
                )
                  .then((metadatas) => {
                    setMooNft(metadatas);
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

        toast.promise(getMooPromise, {
          pending: "Loading Moos...",
          success: "Loaded Moos",
          error: "Error loading Moos ... Try again!",
        });
      }
    }
  }, [active]);

  const handleStake = async (tokenId) => {
    await stakeNft(Number(tokenId));
  };

  const handleApprove = async () => {
    await setApproveForAll();
    setApproveForAll(true);
  };

  console.log({ stakedTokens });

  const disconectedContent = () => {
    return (
      <div className="flex justify-center items-center w-full mt-4 lg:mt-0 z-50">
        <div className="w-full backdrop-blur-lg border-[1px] border-white/10 rounded-xl md:w-11/12 xl:w-10/12 bg-gradient-to-r from-indigo-300/10 to-blue/10 md:py-8 md:px-8 px-5 py-4 xl:px-12 xl:py-16 xl:pb-8">
          <h4 className="text-white text-[28px] text-center">
            Connect your wallet
          </h4>
          <p className="text-white text-[20px] text-center">
            We couldn’t detect a wallet. Connect a wallet to stake.
          </p>
          <button className="text-white text-[20px]" onClick={activate}>
            Connect
          </button>
        </div>
      </div>
    );
  };

  const connectedContent = () => {
    return (
      <div className="grid overflow-hidden grid-cols-2 grid-rows-2 gap-2">
        <div className="grid justify-center align-center text-white box row-start-1 row-end-2 backdrop-blur-lg border-[1px] border-white/10 rounded-xl bg-gradient-to-r from-indigo-300/10 to-blue/10 md:py-8 md:px-8 px-5 py-4 xl:px-12 xl:py-16 xl:pb-8">
          <h4 className="text-[20px] text-center">Account balance</h4>
          <span className="text-[28px] text-center w-full block">{`${ethers.utils.formatUnits(
            milk,
            18
          )} $MILK`}</span>
        </div>
        <div className="text-white box row-start-1 row-end-3 backdrop-blur-lg border-[1px] border-white/10 rounded-xl bg-gradient-to-r from-indigo-300/10 to-blue/10 md:py-8 md:px-8 px-5 py-4 xl:px-12 xl:py-16 xl:pb-8">
          {isApproved && mooNft.length === 0 && (
            <h4 className="text-[28px] font-semibold  text-center mb-5">
              You don't have Moos yet :(
            </h4>
          )}

          {isApproved && mooNft.length > 0 && (
            <>
              <h4 className="text-[28px] font-semibold  text-center mb-5">
                Your moos
              </h4>
              <div className="grid grid-cols-4 gap-4">
                {mooNft.map((moo) => {
                  if (!moo) return null;
                  return (
                    <div className="grid align-middle justify-center">
                      <img
                        src={moo.image.replace(
                          "ipfs://",
                          "https://cloudflare-ipfs.com/ipfs/"
                        )}
                        alt={moo.name}
                        className="w-20 h-20 rounded-xl mb-6 justify-self-center"
                      />
                      <span className="w-full font-bold py-2">{moo.name}</span>
                      <button onClick={() => handleStake(moo.id)}>Stake</button>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {!isApproved && (
            <>
              <h4 className="text-[28px] font-semibold  text-center mb-5">
                Staking liquidity rewards
              </h4>
              <span className="text-[22px] font-light">
                Step 1: Approve the contract to enable staking.
              </span>
              <br />
              <span className="text-[22px] font-light">
                Step 2: Once complete, stake your tokens.
              </span>
              <div className="grid justify-center align-center">
                <button onClick={handleApprove}>Approve</button>
              </div>
            </>
          )}
        </div>
        <div className="text-white box col-start-1 backdrop-blur-lg border-[1px] border-white/10 rounded-xl bg-gradient-to-r from-indigo-300/10 to-blue/10 md:py-8 md:px-8 px-5 py-4 xl:px-12 xl:py-16 xl:pb-8">
          <span className="text-[22px] font-light text-center w-full block">
            {`${stakedTokens?.length} moo staked`}
          </span>
          <span className="text-[28px] text-center w-full block font-semibold">
            {`0 $MILK`}
          </span>
          <div className="grid justify-center align-center">
            <button>Claim</button>
          </div>
          <span className="text-[28px] text-center w-full block font-normal">
            Earning 6 $MILK / DAY
          </span>
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
        {!active && disconectedContent()}
        <div className="w-full z-50">{active && connectedContent()}</div>
      </Container>
    </>
  );
};

export default StakePage;
