import React, { useState } from "react";

const MintBox = () => {
  const [mintQuantity, setMintQuantity] = useState(1);
  const [mintPrice, setMintPrice] = useState(1);

  const changeQuantity = (operation) => {
    if (operation === "add" && mintQuantity < 4) {
      setMintQuantity(mintQuantity + 1);
    }
    if (operation === "subtract" && mintQuantity > 0) {
      setMintQuantity(mintQuantity - 1);
    }
  };

  return (
    <div className="flex align-middle justify-center w-full">
      <div className="w-[600px] p-8 backdrop-blur-lg rounded-xl border-[1px] border-white/10 px-12 mt-4 bg-blue/75 text-white">
        <h1 className="text-4xl sm:text-4xl md:text-4xl lg:text-4xl text-center">
          Mint a Moo
        </h1>

        <p className="text-4xl text-center mt-[24px] sm:mt-[24px] md:mt-[32px] lg:mt-[32px]">
          ? / 2000
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
          <button className=" flex items-center justify-center text-[32px] sm:text-[32px] md:text-[32px] lg:text-[32px] px-[15px] text-shadow bg-[#D4662E] shadow-btn text-white border-2 border-black hover:bg-[#af562a] ease-in-out duration-300">
            MINT ({mintQuantity * mintPrice} AVAX)
          </button>
        </div>
        {/* </Countdown> */}
      </div>
    </div>
  );
};

export default MintBox;
