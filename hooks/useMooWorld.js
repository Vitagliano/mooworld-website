import { ethers } from "ethers";
import { useEffect, useState } from "react";
import mooAbi from "../abi/mooWorld.json";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_MOO_WORLD_ADDRESS;
const stakeContract = process.env.NEXT_PUBLIC_CONTRACT_STAKE_ADDRESS;

const useMooWorld = (web3, account) => {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (web3) {
      let c = new ethers.Contract(
        contractAddress,
        mooAbi,
        web3.getSigner(account)
      );
      setContract(c);
    }
  }, [web3, account]);

  const getUserMoosTokens = async () => {
    if (account) {
      const tokens = [];
      let index = 0;
      const owner = account;
      const balance = await contract.balanceOf(owner);
      for (let i = 0; i < balance; i++) {
        const token = await contract.tokenOfOwnerByIndex(owner, index);
        tokens.push(Number(token));
        index++;
      }

      return tokens;
    }
  };

  const setApproveForAll = async () => {
    if (account && stakeContract) {
      await contract.setApprovalForAll(stakeContract, account);
    }
  };

  const getIsApproved = async () => {
    if (account) {
      const owner = account;
      const isApproved = await contract.isApprovedForAll(owner, stakeContract);
      return isApproved;
    }
  };

  const getMooMetadata = async (mooId) => {
    const response = await fetch(`/api/moos/${mooId}`);
    if (response.status === 200) {
      let data = await response.json();
      data = {
        ...data,
        id: mooId,
      };
      return data;
    } else if (mooId > 0 && response.status === 500) {
      return await getMooMetadata(mooId);
    }
    return null;
  };

  return {
    mooContract: contract,
    getUserMoosTokens,
    getIsApproved,
    setApproveForAll,
    getMooMetadata,
  };
};

export default useMooWorld;
