async function main() {
    const SeafluxNFT = await ethers.getContractFactory("SeafluxNFT")
  
    // Start deployment, returning a promise that resolves to a contract object
    const seafluxNFT = await SeafluxNFT.deploy()
    await seafluxNFT.deployed()
    console.log("Contract deployed to address:", seafluxNFT.address)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
  