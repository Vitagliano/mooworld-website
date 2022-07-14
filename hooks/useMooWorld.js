import { ethers } from "ethers";
import { useEffect, useState } from "react";
import mooAbi from "../abi/mooWorld.json";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_MOO_WORLD_ADDRESS;

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

  const getUserMoos = async () => {
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

  return {
    mooContract: contract,
    getUserMoos,
  };
};

export default useMooWorld;
