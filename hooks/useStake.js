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
      await contract.stake(tokenId);
    }
  };

  const stakeReward = async () => {
    if (account) {
      await contract.stake(tokenId);
    }
  };

  const tokensOfOwner = async () => {
    if (account) {
      const tokens = [];
      let index = 0;
      const token = await contract.tokensOfOwner(account);
      console.log(Number(token));
      for (let i = 0; i < token.length; i++) {
        tokens.push(Number(token[i]));
        index++;
      }

      return tokens;
    }
  };

  return {
    stakeContract: contract,
    stakeNft,
    tokensOfOwner,
  };
};

export default useStake;
