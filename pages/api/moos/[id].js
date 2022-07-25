import Cors from "cors";
import mooWorldAbi from "../../../abi/mooAbi.json";
import { ethers } from "ethers";

export default async function handler(req, res) {
  console.log(req.query);
  try {
    // Ignore .json extension
    const id = req.query.id.replace(/\D+/g, "");

    await Cors(req, res);

    // Web3 stuff

    const web3 = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_NETWORK_RPC
    );
    // Loading Moo abi
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_MINT_ADDRESS,
      mooWorldAbi,
      web3
    );

    // Check if Moo has owner
    contract
      .tokenURI(id)
      .then((uri) => {
        // Fetch the Moo metadata
        fetch(uri.replace("ipfs://", "https://ipfs.io/ipfs/"))
          .then((response) => response.json())
          .then((metadata) => {
            res.status(200).json(metadata);
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      })
      .catch((error) => {
        res.status(404).json({
          message: error,
        });
      });
  } catch (error) {
    res.status(500).json({ error });
  }
}
