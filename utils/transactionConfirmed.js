import Web3 from "web3";

export const initializeWeb3 = () => {
  return new Web3(
    new Web3.providers.HttpProvider("https://api.avax-test.network/ext/C/rpc")
  );
};

export const isConfirmedOnBlockchain = async (txHash) => {
  try {
    const web3 = initializeWeb3();
    const trx = await web3.eth.getTransaction(txHash);

    if (trx.blockNumber === null) {
      return null;
    }

    const currentBlock = await web3.eth.getBlockNumber();
    const web3ConfirmationsCount = 1;
    const isConfirmedOnWeb3 =
      currentBlock - trx.blockNumber > web3ConfirmationsCount;
    return isConfirmedOnWeb3;
  } catch (error) {
    return null;
  }
};
