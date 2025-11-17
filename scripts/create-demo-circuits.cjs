const { ethers } = require("hardhat");

async function main() {
  console.log("Creating demo circuits (NO ENTRY FEE)...\n");

  const contractAddress = "0x0e319661627836c18bd6CA2A2500f80B2478d32c";
  const circuit = await ethers.getContractAt("RiftParlayCircuit", contractAddress);
  const MAX_DURATION = 96 * 60 * 60; // 96 hours

  const testCircuits = [
    {
      circuitId: "nova-vs-ember-vs-tidal-vs-quake-q1",
      headline: "Which pathline drives Q1 network activity? (Nova hype, Ember steady climb, Tidal chop, Quake breakdown)",
      duration: MAX_DURATION,
    },
    {
      circuitId: "rollup-thesis-showdown",
      headline: "Rollup thesis showdown: Nova (zk boom) vs Ember (OP stack grind) vs Tidal (alt-L2 mix) vs Quake (security reset)",
      duration: MAX_DURATION,
    },
    {
      circuitId: "defi-capital-rotation-2025",
      headline: "DeFi capital rotation 2025: Nova momentum, Ember income, Tidal experimentation, Quake deleveraging?",
      duration: MAX_DURATION,
    },
    {
      circuitId: "ai-narratives-onchain",
      headline: "On-chain AI narratives: Nova infra sprint, Ember agent tooling, Tidal data mesh, Quake GPU liquidity crunch",
      duration: MAX_DURATION,
    },
    {
      circuitId: "nft-resurgence-catalyst",
      headline: "NFT resurgence catalyst: Nova gaming leg, Ember luxury drop, Tidal music & media, Quake macro shock",
      duration: MAX_DURATION,
    },
    {
      circuitId: "l1-market-share-reshuffle",
      headline: "Layer1 market-share reshuffle: Nova (ETH led), Ember (SOL led), Tidal (alt blend), Quake (new entrant)",
      duration: MAX_DURATION,
    },
  ];

  console.log(`Target contract: ${contractAddress}`);
  console.log(`Creating ${testCircuits.length} demo circuits (${MAX_DURATION / 3600} hours duration)\n`);

  for (const c of testCircuits) {
    console.log(`Creating circuit: ${c.headline}`);
    console.log(`  ID: ${c.circuitId}`);
    console.log(`  Duration: ${c.duration / 3600} hours`);

    const tx = await circuit.createCircuit(c.circuitId, c.headline, c.duration);
    const receipt = await tx.wait();

    console.log(`  ✅ Created (tx: ${receipt.hash})`);
    console.log(`  Gas used: ${receipt.gasUsed.toString()}\n`);
  }

  console.log("Fetching all circuits...\n");
  const ids = await circuit.listCircuitIds();
  console.log(`✅ Total circuits on-chain: ${ids.length}`);
  ids.forEach((id, i) => console.log(`  ${i + 1}. ${id}`));

  if (ids.length > 0) {
    const sample = await circuit.getCircuit(ids[0]);
    console.log(`\n📊 Sample circuit details (${sample.circuitId}):`);
    console.log(`  Headline: ${sample.headline}`);
    console.log(`  Total Entrants: ${sample.totalEntrants.toString()}`);
    console.log(`  Lock Time: ${new Date(Number(sample.lockTime) * 1000).toLocaleString()}`);
  }

  console.log("\n✅ Demo circuits created successfully!");
  console.log(`\n🌐 Contract: https://sepolia.etherscan.io/address/${contractAddress}`);
  console.log("📝 Note: These circuits have NO ENTRY FEE - free to enter!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
