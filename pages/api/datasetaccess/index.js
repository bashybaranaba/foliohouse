import { FoliohouseAddress } from "../../../config.js";
import Foliohouse from "../../../Foliohouse.json";

const Web3js = require("web3");

export default async function handler(req, res) {
  const { method } = req;
  const web3 = new Web3js(
    new Web3js.providers.HttpProvider("https://rpc.ankr.com/filecoin_testnet")
  );
  const contract = new web3.eth.Contract(Foliohouse.abi, FoliohouseAddress);

  if (method === "GET") {
    try {
      await contract.methods
        .accessDataset(req.body.dataset)
        .send(
          { from: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266" },
          (error, result) => {
            if (error) {
              console.error(error);
            } else {
              console.log(result);
            }
          }
        );
      res.status(200).json({ success: true, data: req.body.dataset });
    } catch (err) {
      res.status(500).json("error", err);
    }
  }
}
