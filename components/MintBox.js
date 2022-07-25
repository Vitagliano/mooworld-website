import React, { useState, useEffect } from "react";
import useWeb3 from "../hooks/useWeb3";
import MooAbi from "../abi/mooAbi.json";
import { toast } from "react-toastify";
import { ethers } from "ethers";

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
          toast.error("Check if you are using Fantom Network", {
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
          .catch(() => {
            setIsMinting(false);
            reject();
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
      <div className="w-[600px] p-8 backdrop-blur-lg rounded-xl border-[1px] border-white/10 px-12 mt-4 bg-blue/75 text-white">
        <h1 className="text-4xl sm:text-4xl md:text-4xl lg:text-4xl text-center">
          Mint a Moo
        </h1>

        <p className="text-4xl text-center mt-[24px] sm:mt-[24px] md:mt-[32px] lg:mt-[32px]">
          {`${supply} / 2000`}
        </p>
        <div className="flex justify-between mt-[24px] sm:mt-[24px] md:mt-[32px] lg:mt-[32px]">
          <button
            onClick={() => changeQuantity("subtract")}
            className="flex items-center h-[64px] w-[64px] justify-center text-[44px] sm:text-[44px] md:text-[48px] lg:text-[48px] p-[15px] text-shadow bg-[#F8A770] shadow-btn text-white border-2 border-black hover:bg-[#d68046] ease-in-out duration-300"
          >
            -
          </button>
          <div>
            <h2 className="text-3xl sm:text-3xl md:text-3xl lg:text-6xl text-center">
              {`${mintQuantity} / 4`}
            </h2>
          </div>
          <button
            onClick={() => changeQuantity("add")}
            className="flex items-center h-[64px] w-[64px] justify-center text-[44px] sm:text-[44px] md:text-[48px] lg:text-[48px] p-[15px] text-shadow bg-[#F8A770] shadow-btn text-white border-2 border-black hover:bg-[#d68046] ease-in-out duration-300"
          >
            +
          </button>
        </div>
        <div className="flex justify-center mt-[32px]">
          <button
            onClick={mint}
            className=" flex items-center justify-center text-[32px] sm:text-[32px] md:text-[32px] lg:text-[32px] px-[15px] text-shadow bg-[#D4662E] shadow-btn text-white border-2 border-black hover:bg-[#af562a] ease-in-out duration-300"
          >
            MINT ({mintQuantity * mintPrice} AVAX)
          </button>
        </div>
        {/* </Countdown> */}
      </div>
    );
  };

  return (
    <div className="flex align-middle justify-center w-full">
      {!active && (
        <button
          onClick={activate}
          className=" flex items-center justify-center text-[32px] sm:text-[32px] md:text-[32px] lg:text-[32px] px-[15px] text-shadow bg-[#D4662E] shadow-btn text-white border-2 border-black hover:bg-[#af562a] ease-in-out duration-300"
        >
          Connect Wallet
        </button>
      )}
      {active && MintContent()}
    </div>
  );
};

export default MintBox;
