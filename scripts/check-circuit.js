const hre = require("hardhat");

async function main() {
  const contractAddress = "0xE371f39894a7616C7ef1E666f00d23583FEAe210";
  const circuitId = "btc-100k-2025";

  console.log("Checking circuit on Sepolia...");
  console.log("Contract:", contractAddress);
  console.log("Circuit ID:", circuitId);
  console.log("");

  const RiftParlayCircuit = await hre.ethers.getContractAt("RiftParlayCircuit", contractAddress);

  try {
    // Try to get the circuit
    const circuit = await RiftParlayCircuit.getCircuit(circuitId);

    console.log("✅ Circuit found!");
    console.log("Circuit data:");
    console.log("  exists:", circuit.exists);
    console.log("  circuitId:", circuit.circuitId);
    console.log("  headline:", circuit.headline);
    console.log("  creator:", circuit.creator);
    console.log("  entryFee:", hre.ethers.formatEther(circuit.entryFee), "ETH");
    console.log("  entryFeeWei:", circuit.entryFee.toString());
    console.log("  lockTime:", new Date(Number(circuit.lockTime) * 1000).toISOString());
    console.log("  prizePool:", hre.ethers.formatEther(circuit.prizePool), "ETH");
    console.log("  totalEntrants:", circuit.totalEntrants.toString());
    console.log("  cancelled:", circuit.cancelled);
    console.log("  settled:", circuit.settled);
    console.log("");

    // Check if circuit is open for entries
    const now = Math.floor(Date.now() / 1000);
    const isOpen = !circuit.cancelled && !circuit.settled && now < Number(circuit.lockTime);
    console.log("Circuit status:", isOpen ? "🟢 OPEN" : "🔴 CLOSED");

    if (!isOpen) {
      if (circuit.cancelled) console.log("  Reason: Cancelled");
      if (circuit.settled) console.log("  Reason: Settled");
      if (now >= Number(circuit.lockTime)) console.log("  Reason: Locked (time expired)");
    }

  } catch (error) {
    console.log("❌ Circuit not found or error:");
    console.log(error.message);

    // Try to list all circuits
    try {
      console.log("\nTrying to list all circuits...");
      const circuitIds = await RiftParlayCircuit.listCircuitIds();
      console.log("Total circuits:", circuitIds.length);
      console.log("Circuit IDs:", circuitIds);
    } catch (listError) {
      console.log("Failed to list circuits:", listError.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
