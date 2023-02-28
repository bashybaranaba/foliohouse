import { ethers } from "ethers";

import { FoliohouseAddress } from "../../../config.js";
import Foliohouse from "../../../Foliohouse.json";

export default async function handler(req, res) {
  const { method } = req;
  const provider = new ethers.providers.JsonRpcProvider(
    "https://api.hyperspace.node.glif.io/rpc/v1"
  );
  const contract = new ethers.Contract(
    FoliohouseAddress,
    Foliohouse.abi,
    provider
  );

  if (method === "GET") {
    try {
      contract.accessDatasets(req.body.dataset);
      res.status(201).json(req.body.dataset);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
