import { ethers } from "ethers";
import { useEffect, useState } from "react";
import milkAbi from "../abi/milk.json";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_MILK_ADDRESS;

const useMilk = (web3, account) => {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (web3) {
      let c = new ethers.Contract(
        contractAddress,
        milkAbi,
        web3.getSigner(account)
      );
      setContract(c);
    }
  }, [web3, account]);

  const getMilkBalance = async () => {
    if (account) {
      const owner = account;
      const balance = await contract?.balanceOf(owner);
      return balance;
    }
  };

  return {
    contract,
    getMilkBalance,
  };
};

export default useMilk;
