var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FhevmContractsRepository_acl, _FhevmContractsRepository_fhevmExecutor, _FhevmContractsRepository_inputVerifier, _FhevmContractsRepository_kmsVerifier, _FhevmContractsRepository_hcuLimit, _FhevmContractsRepository_addressToContract;
import { ethers as EthersT } from "ethers";
import { FhevmError, assertFhevm } from "../../utils/error.js";
import { ACL } from "./ACL.js";
import { FHEVMExecutor } from "./FHEVMExecutor.js";
import { HCULimit } from "./HCULimit.js";
import { InputVerifier } from "./InputVerifier.js";
import { KMSVerifier } from "./KMSVerifier.js";
import {} from "./index.js";
export class FhevmContractsRepository {
    constructor() {
        _FhevmContractsRepository_acl.set(this, void 0);
        _FhevmContractsRepository_fhevmExecutor.set(this, void 0);
        _FhevmContractsRepository_inputVerifier.set(this, void 0);
        _FhevmContractsRepository_kmsVerifier.set(this, void 0);
        _FhevmContractsRepository_hcuLimit.set(this, void 0);
        _FhevmContractsRepository_addressToContract.set(this, void 0);
    }
    static async create(ethersReadonlyProvider, config) {
        if (!EthersT.isAddress(config.aclContractAddress)) {
            throw new FhevmError(`Invalid ACL contract address ${config.aclContractAddress}`);
        }
        if (!EthersT.isAddress(config.kmsContractAddress)) {
            throw new FhevmError(`Invalid KMSVerifier contract address ${config.kmsContractAddress}`);
        }
        const repo = new FhevmContractsRepository();
        __classPrivateFieldSet(repo, _FhevmContractsRepository_acl, await ACL.create(ethersReadonlyProvider, config.aclContractAddress, config.aclAbi, config.aclProperties), "f");
        __classPrivateFieldSet(repo, _FhevmContractsRepository_fhevmExecutor, await FHEVMExecutor.create(ethersReadonlyProvider, __classPrivateFieldGet(repo, _FhevmContractsRepository_acl, "f").fhevmExecutorAddress, config.fhevmExecutorAbi, config.fhevmExecutorProperties), "f");
        __classPrivateFieldSet(repo, _FhevmContractsRepository_inputVerifier, await InputVerifier.create(ethersReadonlyProvider, __classPrivateFieldGet(repo, _FhevmContractsRepository_fhevmExecutor, "f").inputVerifierAddress, config.inputVerifierAbi, config.inputVerifierProperties), "f");
        __classPrivateFieldSet(repo, _FhevmContractsRepository_kmsVerifier, await KMSVerifier.create(ethersReadonlyProvider, config.kmsContractAddress, config.kmsVerifierAbi, config.kmsVerifierProperties), "f");
        __classPrivateFieldSet(repo, _FhevmContractsRepository_hcuLimit, await HCULimit.create(ethersReadonlyProvider, __classPrivateFieldGet(repo, _FhevmContractsRepository_fhevmExecutor, "f").hcuLimitAddress, config.hcuLimitAbi, config.hcuLimitProperties), "f");
        if (__classPrivateFieldGet(repo, _FhevmContractsRepository_inputVerifier, "f").gatewayChainId !== __classPrivateFieldGet(repo, _FhevmContractsRepository_kmsVerifier, "f").gatewayChainId) {
            throw new FhevmError(`gateway chainId mismatch. InputVerifier.gatewayChainId=${__classPrivateFieldGet(repo, _FhevmContractsRepository_inputVerifier, "f").gatewayChainId} differs from KMSVerifier.gatewayChainId=${__classPrivateFieldGet(repo, _FhevmContractsRepository_kmsVerifier, "f").gatewayChainId}`);
        }
        __classPrivateFieldSet(repo, _FhevmContractsRepository_addressToContract, {}, "f");
        __classPrivateFieldGet(repo, _FhevmContractsRepository_addressToContract, "f")[__classPrivateFieldGet(repo, _FhevmContractsRepository_acl, "f").address.toLowerCase()] = __classPrivateFieldGet(repo, _FhevmContractsRepository_acl, "f");
        __classPrivateFieldGet(repo, _FhevmContractsRepository_addressToContract, "f")[__classPrivateFieldGet(repo, _FhevmContractsRepository_fhevmExecutor, "f").address.toLowerCase()] = __classPrivateFieldGet(repo, _FhevmContractsRepository_fhevmExecutor, "f");
        __classPrivateFieldGet(repo, _FhevmContractsRepository_addressToContract, "f")[__classPrivateFieldGet(repo, _FhevmContractsRepository_inputVerifier, "f").address.toLowerCase()] = __classPrivateFieldGet(repo, _FhevmContractsRepository_inputVerifier, "f");
        __classPrivateFieldGet(repo, _FhevmContractsRepository_addressToContract, "f")[__classPrivateFieldGet(repo, _FhevmContractsRepository_kmsVerifier, "f").address.toLowerCase()] = __classPrivateFieldGet(repo, _FhevmContractsRepository_kmsVerifier, "f");
        __classPrivateFieldGet(repo, _FhevmContractsRepository_addressToContract, "f")[__classPrivateFieldGet(repo, _FhevmContractsRepository_hcuLimit, "f").address.toLowerCase()] = __classPrivateFieldGet(repo, _FhevmContractsRepository_hcuLimit, "f");
        Object.freeze(__classPrivateFieldGet(repo, _FhevmContractsRepository_addressToContract, "f"));
        return repo;
    }
    addressToContractMap() {
        assertFhevm(__classPrivateFieldGet(this, _FhevmContractsRepository_addressToContract, "f") !== undefined, "FhevmContractsRepository is not initialized");
        return __classPrivateFieldGet(this, _FhevmContractsRepository_addressToContract, "f");
    }
    getContractFromAddress(address) {
        const a = address.toLowerCase();
        if (a === this.acl.address.toLowerCase()) {
            return this.acl;
        }
        if (a === this.fhevmExecutor.address.toLowerCase()) {
            return this.fhevmExecutor;
        }
        if (a === this.inputVerifier.address.toLowerCase()) {
            return this.inputVerifier;
        }
        if (a === this.kmsVerifier.address.toLowerCase()) {
            return this.kmsVerifier;
        }
        if (a === this.hcuLimit.address.toLowerCase()) {
            return this.hcuLimit;
        }
        return undefined;
    }
    getContractFromName(name) {
        switch (name) {
            case "ACL":
                return this.acl;
            case "FHEVMExecutor":
                return this.fhevmExecutor;
            case "InputVerifier":
                return this.inputVerifier;
            case "KMSVerifier":
                return this.kmsVerifier;
            case "HCULimit":
                return this.hcuLimit;
            default: {
                throw new FhevmError(`Unsupported contract ${name}`);
            }
        }
    }
    getCoprocessorContractFromName(name) {
        switch (name) {
            case "ACL":
                return this.acl;
            case "FHEVMExecutor":
                return this.fhevmExecutor;
            case "InputVerifier":
                return this.inputVerifier;
            case "KMSVerifier":
                return this.kmsVerifier;
            case "HCULimit":
                return this.hcuLimit;
            default: {
                throw new FhevmError(`Unsupported coprocessor contract ${name}`);
            }
        }
    }
    getCoprocessorInterfaceFromName(name) {
        return this.getCoprocessorContractFromName(name).interface;
    }
    get acl() {
        assertFhevm(__classPrivateFieldGet(this, _FhevmContractsRepository_acl, "f") !== undefined, "FhevmContractsRepository is not initialized");
        return __classPrivateFieldGet(this, _FhevmContractsRepository_acl, "f");
    }
    get fhevmExecutor() {
        assertFhevm(__classPrivateFieldGet(this, _FhevmContractsRepository_fhevmExecutor, "f") !== undefined, "FhevmContractsRepository is not initialized");
        return __classPrivateFieldGet(this, _FhevmContractsRepository_fhevmExecutor, "f");
    }
    get inputVerifier() {
        assertFhevm(__classPrivateFieldGet(this, _FhevmContractsRepository_inputVerifier, "f") !== undefined, "FhevmContractsRepository is not initialized");
        return __classPrivateFieldGet(this, _FhevmContractsRepository_inputVerifier, "f");
    }
    get kmsVerifier() {
        assertFhevm(__classPrivateFieldGet(this, _FhevmContractsRepository_kmsVerifier, "f") !== undefined, "FhevmContractsRepository is not initialized");
        return __classPrivateFieldGet(this, _FhevmContractsRepository_kmsVerifier, "f");
    }
    get hcuLimit() {
        assertFhevm(__classPrivateFieldGet(this, _FhevmContractsRepository_hcuLimit, "f") !== undefined, "FhevmContractsRepository is not initialized");
        return __classPrivateFieldGet(this, _FhevmContractsRepository_hcuLimit, "f");
    }
    getFhevmInstanceConfig(params) {
        assertFhevm(__classPrivateFieldGet(this, _FhevmContractsRepository_acl, "f") !== undefined, "FhevmContractsRepository is not initialized");
        assertFhevm(__classPrivateFieldGet(this, _FhevmContractsRepository_fhevmExecutor, "f") !== undefined, "FhevmContractsRepository is not initialized");
        assertFhevm(__classPrivateFieldGet(this, _FhevmContractsRepository_kmsVerifier, "f") !== undefined, "FhevmContractsRepository is not initialized");
        assertFhevm(__classPrivateFieldGet(this, _FhevmContractsRepository_inputVerifier, "f") !== undefined, "FhevmContractsRepository is not initialized");
        return {
            aclContractAddress: __classPrivateFieldGet(this, _FhevmContractsRepository_acl, "f").address,
            fhevmExecutorContractAddress: __classPrivateFieldGet(this, _FhevmContractsRepository_fhevmExecutor, "f")?.address,
            chainId: params.chainId,
            gatewayChainId: Number(__classPrivateFieldGet(this, _FhevmContractsRepository_kmsVerifier, "f").gatewayChainId),
            inputVerifierContractAddress: __classPrivateFieldGet(this, _FhevmContractsRepository_inputVerifier, "f").address,
            kmsContractAddress: __classPrivateFieldGet(this, _FhevmContractsRepository_kmsVerifier, "f").address,
            verifyingContractAddressDecryption: __classPrivateFieldGet(this, _FhevmContractsRepository_kmsVerifier, "f").gatewayDecryptionAddress,
            verifyingContractAddressInputVerification: __classPrivateFieldGet(this, _FhevmContractsRepository_inputVerifier, "f").gatewayInputVerificationAddress,
            relayerUrl: params.relayerUrl,
        };
    }
}
_FhevmContractsRepository_acl = new WeakMap(), _FhevmContractsRepository_fhevmExecutor = new WeakMap(), _FhevmContractsRepository_inputVerifier = new WeakMap(), _FhevmContractsRepository_kmsVerifier = new WeakMap(), _FhevmContractsRepository_hcuLimit = new WeakMap(), _FhevmContractsRepository_addressToContract = new WeakMap();
//# sourceMappingURL=FhevmContractsRepository.js.map