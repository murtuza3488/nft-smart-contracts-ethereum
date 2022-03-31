require("dotenv").config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.WALLET_PUBLIC_KEY;
const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/SeafluxNFT.sol/SeafluxNFT.json");
const contractAddress = "<deployed_contract_address>";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce
  //the transaction

  // Creating a transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce, // nonce is the latest number of tx
    gas: 500000, // Estimated gas
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(), // Function to call of the smart contract
  };

  // Signing the transaction and sending it for mining/verification
  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}

mintNFT("https://gateway.pinata.cloud/ipfs/<ipfs_hash>");
