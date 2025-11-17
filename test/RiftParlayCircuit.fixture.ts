import { ethers } from "hardhat";
import type { RiftParlayCircuit } from "../artifacts/types/RiftParlayCircuit";
import type { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

export async function deployRiftParlayCircuitFixture(): Promise<{
  contract: RiftParlayCircuit;
  owner: HardhatEthersSigner;
  alice: HardhatEthersSigner;
  bob: HardhatEthersSigner;
  carol: HardhatEthersSigner;
}> {
  const [owner, alice, bob, carol] = await ethers.getSigners();

  const contractFactory = await ethers.getContractFactory("RiftParlayCircuit");
  const contract = await contractFactory.connect(owner).deploy();
  await contract.waitForDeployment();

  return { contract, owner, alice, bob, carol };
}
