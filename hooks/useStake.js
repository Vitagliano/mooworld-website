import { ethers } from "ethers";
import { useEffect, useState } from "react";
import stakeAbi from "../abi/mooStaking.json";
import { isConfirmedOnBlockchain } from "../utils/transactionConfirmed";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_STAKE_ADDRESS;

const useStake = (web3, account) => {
  const [contract, setContract] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [isConfirmated, setIsConfirmated] = useState(false);

  useEffect(() => {
    if (transaction) {
      setTimeout(() => {
        const observeBlockchainInterval = setInterval(async () => {
          if (transaction && !transaction.confirmed) {
            const isConfirmed = await isConfirmedOnBlockchain(transaction.hash);
            if (isConfirmed) {
              setIsConfirmated(false);
              setIsConfirmated(true);
              clearInterval(observeBlockchainInterval);
            }
          }
        }, 1000);
      }, 11000);
    }
  }, [transaction]);

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
      await contract.stake(tokenId).then((tx) => {
        setTransaction(tx);
      });
    }
  };

  const unstakeNft = async (tokenId) => {
    if (account && tokenId) {
      await contract.unstake(tokenId).then((tx) => {
        setTransaction(tx);
      });
    }
  };

  const stakeAll = async (tokenIds) => {
    if (account && tokenIds) {
      await contract.stakeMany(tokenIds).then((tx) => {
        setTransaction(tx);
      });
    }
  };

  const unstakeAll = async (tokenIds) => {
    if (account && tokenIds) {
      await contract.unstakeMany(tokenIds).then((tx) => {
        setTransaction(tx);
      });
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
    isConfirmated,
  };
};

export default useStake;
