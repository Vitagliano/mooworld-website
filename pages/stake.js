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
  const [mooIds, setMooIds] = useState([]);
  const [rewards, setRewards] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const [stakedTokens, setStakedTokens] = useState([]);
  const { activate, deactivate, active, account, web3 } = useWeb3();

  const { getMilkBalance } = useMilk(web3, account);
  const { getUserMoosTokens, getIsApproved, setApproveForAll, getMooMetadata } =
    useMooWorld(web3, account);
  const {
    stakeNft,
    tokensOfOwner,
    unstakeNft,
    stakeAll,
    unstakeAll,
    claimMilkAndUnstake,
    claimMilk,
    getStakeBalance,
    isConfirmated,
  } = useStake(web3, account);

  useEffect(() => {
    activate();
  }, []);

  useEffect(async () => {
    if (active || isConfirmated) {
      const milk = await getMilkBalance();
      setMilk(milk);
      const isApprovedOnContract = await getIsApproved();
      setIsApproved(isApprovedOnContract);
      const rewardsResult = await getStakeBalance();
      setRewards(rewardsResult);

      const getMooPromise = new Promise((resolve, reject) => {
        getUserMoosTokens().then((moos) => {
          setMooIds(moos);
          tokensOfOwner()
            .then((tokens) => {
              setStakedTokens(tokens);
              moos.push(...tokens);
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
          toast.promise(getMooPromise, {
            pending: "Loading Moos...",
            success: "Loaded Moos",
            error: "Error loading Moos ... Try again!",
          });
        });
      });

      if (isConfirmated) {
        toast.success("You have confirmed!");
      }
    }
  }, [active, isConfirmated]);

  const handleStake = async (tokenId) => {
    await stakeNft(Number(tokenId));
  };

  const handleUnstake = async (tokenId) => {
    await unstakeNft(Number(tokenId));
  };

  const handleStakeAll = async () => {
    await stakeAll(mooIds);
  };

  const handleUnstakeAll = async () => {
    await unstakeAll(stakedTokens);
  };

  const handleClaim = async () => {
    await claimMilk();
  };

  const handleClaimAndUnstake = async () => {
    await claimMilkAndUnstake();
  };

  const handleApprove = async () => {
    await setApproveForAll();
    setApproveForAll(true);
  };

  const DisconectedContent = () => {
    return (
      <div className="flex justify-center items-center w-full mt-4 lg:mt-0 z-50">
        <div className="w-full backdrop-blur-lg border-[1px] border-white/10 rounded-xl md:w-11/12 xl:w-10/12 bg-gradient-to-r from-indigo-300/10 to-blue/10 md:py-8 md:px-8 px-5 py-4 xl:px-12 xl:py-16 xl:pb-8">
          <h4 className="text-white text-[28px] text-center">
            Connect your wallet
          </h4>
          <p className="text-white text-[20px] text-center">
            We couldn’t detect a wallet. Connect a wallet to stake.
          </p>
          <div className="flex justify-center">
            <button
              className="mt-4 p-[12px] px-10 mr-4 backdrop-blur-lg rounded-xl border-[1px] border-white/10 bg-blue/75 text-white ease-in-out hover:bg-blue hover:border-white duration-300 text-[22px]"
              onClick={activate}
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    );
  };

  const connectedContent = () => {
    return (
      <div className="grid overflow-hidden grid-cols-2 grid-rows-1 gap-4 grid-flow-row w-full mt-4 lg:mt-0 z-50">
        <div></div>
        <div className="w-full backdrop-blur-lg border-[1px] border-white/10 rounded-xl md:w-11/12 xl:w-10/12 bg-gradient-to-r from-indigo-300/10 to-blue/10 md:py-8 md:px-8 px-5 py-4 xl:px-12 xl:py-16 xl:pb-8">
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
              <div className="flex justify-between">
                <h4 className="text-[28px] font-semibold  text-center mb-5">
                  Your moos
                </h4>
                <div>
                  <button
                    className="border-[1px] border-white rounded-[4px] bg-[#9490BB] mr-5 p-[4px] hover:bg-[#4e4e52]"
                    onClick={handleStakeAll}
                  >
                    Stake All
                  </button>
                  <button
                    className="border-[1px] border-white rounded-[4px] bg-[#9490BB] p-[4px] hover:bg-[#4e4e52] hover:bg-[#4e4e52]"
                    disabled={stakedTokens.length === 0}
                    onClick={handleUnstakeAll}
                  >
                    Unstake All
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {mooNft.map((moo) => {
                  if (!moo) return null;
                  return (
                    <div
                      key={moo.id}
                      className="border-[1px] border-white p-[1rem] rounded-[8px] grid align-middle justify-center"
                    >
                      <img
                        src={moo.image.replace(
                          "ipfs://",
                          "https://cloudflare-ipfs.com/ipfs/"
                        )}
                        alt={moo.name}
                        className="w-20 h-20 rounded-xl mb-6 justify-self-center"
                      />
                      <span className="w-full font-bold py-2">{moo.name}</span>
                      {stakedTokens.includes(moo.edition) ? (
                        <button
                          className="border-[1px] border-white rounded-[4px] bg-[#9490BB] hover:bg-[#4e4e52]"
                          onClick={() => handleUnstake(moo.id)}
                        >
                          Unstake
                        </button>
                      ) : (
                        <button
                          className="border-[1px] border-white rounded-[4px] bg-[#9490BB] hover:bg-[#4e4e52]"
                          onClick={() => handleStake(moo.id)}
                        >
                          Stake
                        </button>
                      )}
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
            {`${rewards} $MILK`}
          </span>
          <div className="grid justify-center align-center">
            <button
              className="border-[1px] border-white rounded-[4px] bg-[#9490BB] p-[4px] hover:bg-[#4e4e52] hover:bg-[#4e4e52] mb-2 disabled:opacity-75"
              disabled={Number(rewards) == 0}
              onClick={handleClaim}
            >
              Claim
            </button>
            <button
              className="border-[1px] border-white rounded-[4px] bg-[#9490BB] p-[4px] hover:bg-[#4e4e52] hover:bg-[#4e4e52] disabled:opacity-75"
              disabled={Number(rewards) == 0}
              onClick={handleClaimAndUnstake}
            >
              Claim and unstake
            </button>
          </div>
          <span className="text-[28px] text-center w-full block font-normal disabled:opacity-75">
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
        {!active && DisconectedContent()}
        {active && connectedContent()}
      </Container>
    </>
  );
};

export default StakePage;
