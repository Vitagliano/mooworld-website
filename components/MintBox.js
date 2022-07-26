import React, { useState, useEffect } from "react";
import useWeb3 from "../hooks/useWeb3";
import MooAbi from "../abi/mooAbi.json";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { GrCircleAlert } from "react-icons/gr";

const MintBox = () => {
  const [mintQuantity, setMintQuantity] = useState(1);
  const [mintPrice, setMintPrice] = useState(1);
  const [supply, setSupply] = useState(0);
  const [isMinting, setIsMinting] = useState(false);
  const [contract, setContract] = useState(null);

  const { activate, deactivate, active, account, web3 } = useWeb3();

  const changeQuantity = (operation) => {
    if (operation === "add" && mintQuantity < 4) {
      setMintQuantity(mintQuantity + 1);
    }
    if (operation === "subtract" && mintQuantity > 0) {
      setMintQuantity(mintQuantity - 1);
    }
  };

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_MINT_ADDRESS;

  useEffect(() => {
    if (active && web3) {
      let c = new ethers.Contract(
        contractAddress,
        MooAbi,
        web3.getSigner(account)
      );

      setContract(c);
      c.totalSupply()
        .then((supply) => {
          setSupply(supply);
        })
        .catch((err) => {
          setSupply(0);
          setContract(null);
          toast.error("Check if you are using Avax Network", {
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            theme: "colored",
          });
        });
    }
  }, [active, web3]);

  console.log("contract", contract);

  async function mint() {
    if (account) {
      setIsMinting(true);
      let _price = ethers.utils.parseUnits(
        String(mintPrice * mintQuantity),
        18
      );

      const mintPromise = new Promise((resolve, reject) => {
        contract
          .publicSaleMint(mintQuantity, {
            value: _price,
          })
          .then((receipt) => {
            setIsMinting(false);
            loadData();

            const link = `https://snowtrace.io/tx/${receipt.transactionHash}`;

            resolve(link);
          })
          .catch((err) => {
            setIsMinting(false);
            reject();
            console.log("error", err);
            toast.error(err.data.message, {
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              theme: "colored",
            });
          });
      });

      toast.promise(mintPromise, {
        pending: "Minting...",
        success: {
          render: (link) => `Minted!`,
        },
        error: "Something went wrong... Try again!",
      });
    }
  }

  const MintContent = () => {
    return (
      <div className="flex flex-col w-full">
        <div className="p-8 backdrop-blur-lg rounded-xl border-[1px] border-white/10 px-12 bg-blue/75 text-white mb-6">
          <div className="flex justify-between ">
            <h1 className="text-4xl sm:text-4xl md:text-4xl lg:text-4x mb-4">
              Mint a Moo
            </h1>

            <p className="text-4xl flex flex-row gap-2 items-center p-0 m-0 mb-4">
              <svg width="24" height="24" viewBox="0 0 17 15" fill="white">
                <path
                  d="M12.4833 8.73993C12.8744 8.0642 13.5057 8.0642 13.8968 8.73993L16.3331 13.0165C16.7242 13.6923 16.4042 14.2436 15.6218 14.2436H10.7139C9.94036 14.2436 9.62028 13.6923 10.0026 13.0165L12.4833 8.73993ZM7.77094 0.506787C8.16214 -0.168929 8.78452 -0.168929 9.17572 0.506787L9.71809 1.48481L10.9984 3.73426C11.3096 4.3744 11.3096 5.13015 10.9984 5.77031L6.70401 13.2121C6.31281 13.8167 5.66376 14.1991 4.94358 14.2436H1.37826C0.59584 14.2436 0.275751 13.7012 0.666969 13.0165L7.77094 0.506787Z"
                  fill="current"
                ></path>
              </svg>
              1 AVAX
            </p>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-base font-medium text-white">Minted</span>
              <span className="text-sm font-medium text-white">
                {(supply / 2000) * 100}%{" "}
                <span className="text-white/60">({`${supply} / 2000`})</span>
              </span>
            </div>
            <div className="w-full h-2.5 bg-white/20 rounded-xl">
              <div
                className="bg-white h-2.5 w-full rounded-xl"
                style={{ width: (supply / 2000) * 100 + "%" }}
              ></div>
            </div>
          </div>
        </div>
        <div className=" p-8 backdrop-blur-lg rounded-xl border-[1px] border-white/10 px-12 bg-blue/75 text-white">
          <div className="flex flex-row justify-between gap-4">
            <div className="">
              <span className="text-base font-medium text-white">Price</span>
              <div className="flex justify-between mt-[24px]">
                <p className="text-4xl flex flex-row gap-2 items-center p-0 m-0">
                  <svg width="24" height="24" viewBox="0 0 17 15" fill="white">
                    <path
                      d="M12.4833 8.73993C12.8744 8.0642 13.5057 8.0642 13.8968 8.73993L16.3331 13.0165C16.7242 13.6923 16.4042 14.2436 15.6218 14.2436H10.7139C9.94036 14.2436 9.62028 13.6923 10.0026 13.0165L12.4833 8.73993ZM7.77094 0.506787C8.16214 -0.168929 8.78452 -0.168929 9.17572 0.506787L9.71809 1.48481L10.9984 3.73426C11.3096 4.3744 11.3096 5.13015 10.9984 5.77031L6.70401 13.2121C6.31281 13.8167 5.66376 14.1991 4.94358 14.2436H1.37826C0.59584 14.2436 0.275751 13.7012 0.666969 13.0165L7.77094 0.506787Z"
                      fill="current"
                    ></path>
                  </svg>
                  1 AVAX
                </p>
              </div>
            </div>
            <div>
              <span className="text-base font-medium text-white">Amount</span>
              <div className="flex justify-between gap-4 mt-[12px]">
                <button
                  onClick={() => changeQuantity("subtract")}
                  className="flex items-center justify-center h-[64px] w-[64px] sm:text-[44px] md:text-[48px] lg:text-[48px] px-[16px] pt-[16px] pb-[10px] text-shadow backdrop-blur-lg rounded-xl border-[1px] border-white/10 bg-blue/75 text-white ease-in-out hover:bg-blue hover:border-white duration-300"
                >
                  -
                </button>
                <div className="flex justify-center flex-row items-center">
                  <h2 className="text-3xl sm:text-3xl md:text-3xl lg:text-5xl text-center">
                    {mintQuantity}/
                  </h2>
                  <h3 className="text-white/70 text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-center">
                    4 max
                  </h3>
                </div>
                <button
                  onClick={() => changeQuantity("add")}
                  className="flex items-center justify-center h-[64px] w-[64px] sm:text-[44px] md:text-[48px] lg:text-[48px] px-[16px] pt-[16px] pb-[10px] text-shadow backdrop-blur-lg rounded-xl border-[1px] border-white/10 bg-blue/75 text-white ease-in-out hover:bg-blue hover:border-white duration-300"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-[32px]">
            {active ? (
              <button
                onClick={mint}
                className="p-[16px] w-full backdrop-blur-lg rounded-xl border-[1px] border-white/10 px-10 bg-burple text-white ease-in-out duration-300 hover:bg-burple/80 hover:border-white"
              >
                {isMinting
                  ? "Minting..."
                  : `MINT (${mintQuantity * mintPrice} AVAX)`}
              </button>
            ) : (
              <button
                onClick={activate}
                className="p-[16px] w-full backdrop-blur-lg rounded-xl border-[1px] border-white/10 px-10 bg-burple text-white ease-in-out duration-300 hover:bg-burple/80 hover:border-white"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
        <div className="p-4 backdrop-blur-lg rounded-xl border-[1px] flex items-center border-white/10 px-12 bg-blue/75 text-white mt-4">
          <span className="text-base font-medium text-white flex flex-row gap-2 items-center m-0 p-0">
            <GrCircleAlert size={24} style={{ fill: "#fff" }} />
            This collection is randomly revealed in batches of 400 NFTs.
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex align-middle justify-center w-full">
      {active ? MintContent() : MintContent()}
    </div>
  );
};

export default MintBox;
