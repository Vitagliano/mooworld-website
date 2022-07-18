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

  const unstakeNft = async (tokenId) => {
    if (account && tokenId) {
      await contract.unstake(tokenId);
    }
  };

  const stakeAll = async (tokenIds) => {
    if (account && tokenIds) {
      await contract.stakeMany(tokenIds);
    }
  };

  const unstakeAll = async (tokenIds) => {
    if (account && tokenIds) {
      await contract.unstakeMany(tokenIds);
    }
  };

  const claimMilk = async () => {
    if (account) {
      await contract.claim();
    }
  };

  const claimMilkAndUnstake = async () => {
    if (account) {
      await contract.claimAndUnstake();
    }
  };

  const getStakeBalance = async () => {
    if (account) {
      const rewards = await contract.calculateRewards(account);
      return ethers.utils.formatUnits(rewards, 18);
    }
  };

  const tokensOfOwner = async () => {
    if (account) {
      const tokens = [];
      let index = 0;
      const token = await contract.tokensOfOwner(account);
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
    unstakeNft,
    stakeAll,
    unstakeAll,
    claimMilk,
    claimMilkAndUnstake,
    getStakeBalance,
  };
};

export default useStake;
