const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying RiftParlayCircuit contract...");

  const RiftParlayCircuit = await ethers.getContractFactory("RiftParlayCircuit");
  const circuit = await RiftParlayCircuit.deploy();

  await circuit.waitForDeployment();
  const address = await circuit.getAddress();

  console.log(`\n✅ RiftParlayCircuit deployed to: ${address}`);
  console.log(`\nUpdate frontend/src/constants/contracts.ts with this address:`);
  console.log(`export const RIFT_PARLAY_CIRCUIT_ADDRESS: Address = "${address}";`);

  // Display contract constants
  const minFee = await circuit.MIN_ENTRY_FEE();
  const minDuration = await circuit.MIN_DURATION();
  const maxDuration = await circuit.MAX_DURATION();

  console.log(`\nContract Constants:`);
  console.log(`- MIN_ENTRY_FEE: ${ethers.formatEther(minFee)} ETH`);
  console.log(`- MIN_DURATION: ${minDuration} seconds (${Number(minDuration) / 60} minutes)`);
  console.log(`- MAX_DURATION: ${maxDuration} seconds (${Number(maxDuration) / 3600} hours)`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
// update
