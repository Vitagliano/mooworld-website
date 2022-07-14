import { ethers } from "ethers";
import { useEffect, useState } from "react";
import stakeAbi from "../abi/mooStaking.json";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_STAKE_ADDRESS;

const useStake = (web3, account) => {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (web3) {
      let c = new ethers.Contract(
        contractAddress,
        stakeAbi,
        web3.getSigner(account)
      );
      setContract(c);
    }
  }, [web3, account]);

  const stakeNft = async (tokenId) => {
    if (account && tokenId) {
      console.log({ contract });
      await contract.stake(tokenId);
    }
  };

  return {
    stakeContract: contract,
    stakeNft,
  };
};

export default useStake;
