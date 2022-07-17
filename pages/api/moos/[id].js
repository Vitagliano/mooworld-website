import Cors from "cors";
import mooWorldAbi from "../../../abi/mooWorld.json";
import { ethers } from "ethers";

export default async function handler(req, res) {
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
      process.env.NEXT_PUBLIC_CONTRACT_MOO_WORLD_ADDRESS,
      mooWorldAbi,
      web3
    );

    // Check if Moo has owner
    contract
      .ownerOf(id)
      .then(() => {
        // Fetch the Moo metadata
        fetch(`${process.env.NEXT_PUBLIC_METADATA_URL}/${id}.json`)
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
