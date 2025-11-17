"use strict";
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
var _KMSVerifier_kmsVerifierReadonlyContract, _KMSVerifier_kmsVerifierContractAddress, _KMSVerifier_orderedSignersAddresses, _KMSVerifier_orderedSigners, _KMSVerifier_threshold, _KMSVerifier_eip712Domain;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KMSVerifier = void 0;
const ethers_1 = require("ethers");
const constants_js_1 = require("../../constants.js");
const eip712_js_1 = require("../../ethers/eip712.js");
const address_js_1 = require("../../utils/address.js");
const bytes_js_1 = require("../../utils/bytes.js");
const error_js_1 = require("../../utils/error.js");
const math_js_1 = require("../../utils/math.js");
const string_js_1 = require("../../utils/string.js");
const FhevmHandle_js_1 = require("../FhevmHandle.js");
const FhevmType_js_1 = require("../FhevmType.js");
const FhevmContractWrapper_js_1 = require("./FhevmContractWrapper.js");
const KMSVerifier_itf_js_1 = require("./interfaces/KMSVerifier.itf.js");
class KMSVerifier extends FhevmContractWrapper_js_1.FhevmHostContractWrapper {
    constructor() {
        super("KMSVerifier");
        _KMSVerifier_kmsVerifierReadonlyContract.set(this, void 0);
        _KMSVerifier_kmsVerifierContractAddress.set(this, void 0);
        _KMSVerifier_orderedSignersAddresses.set(this, void 0);
        _KMSVerifier_orderedSigners.set(this, void 0);
        _KMSVerifier_threshold.set(this, void 0);
        _KMSVerifier_eip712Domain.set(this, void 0);
    }
    static async create(runner, kmsVerifierContractAddress, abi, properties) {
        (0, address_js_1.assertIsAddress)(kmsVerifierContractAddress, "kmsVerifierContractAddress");
        const kmsVerifier = new KMSVerifier();
        __classPrivateFieldSet(kmsVerifier, _KMSVerifier_kmsVerifierContractAddress, kmsVerifierContractAddress, "f");
        __classPrivateFieldSet(kmsVerifier, _KMSVerifier_kmsVerifierReadonlyContract, new ethers_1.ethers.Contract(kmsVerifierContractAddress, abi ?? KMSVerifier_itf_js_1.KMSVerifierPartialInterface, runner), "f");
        __classPrivateFieldSet(kmsVerifier, _KMSVerifier_eip712Domain, properties?.eip712Domain, "f");
        __classPrivateFieldSet(kmsVerifier, _KMSVerifier_orderedSignersAddresses, properties?.signersAddresses ? [...properties.signersAddresses] : undefined, "f");
        __classPrivateFieldSet(kmsVerifier, _KMSVerifier_orderedSigners, properties?.signers ? [...properties.signers] : undefined, "f");
        __classPrivateFieldSet(kmsVerifier, _KMSVerifier_threshold, properties?.threshold, "f");
        await kmsVerifier._initialize();
        return kmsVerifier;
    }
    get kmsVerifierProperties() {
        return {
            ...(__classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f") ? { eip712Domain: { ...__classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f") } } : {}),
            ...(__classPrivateFieldGet(this, _KMSVerifier_orderedSignersAddresses, "f") ? { signersAddresses: [...__classPrivateFieldGet(this, _KMSVerifier_orderedSignersAddresses, "f")] } : {}),
            ...(__classPrivateFieldGet(this, _KMSVerifier_orderedSigners, "f") ? { signers: [...__classPrivateFieldGet(this, _KMSVerifier_orderedSigners, "f")] } : {}),
            ...(__classPrivateFieldGet(this, _KMSVerifier_threshold, "f") !== undefined ? { threshold: __classPrivateFieldGet(this, _KMSVerifier_threshold, "f") } : {}),
        };
    }
    get readonlyContract() {
        (0, error_js_1.assertFhevm)(__classPrivateFieldGet(this, _KMSVerifier_kmsVerifierReadonlyContract, "f") !== undefined, `KMSVerifier wrapper is not initialized`);
        return __classPrivateFieldGet(this, _KMSVerifier_kmsVerifierReadonlyContract, "f");
    }
    get interface() {
        (0, error_js_1.assertFhevm)(__classPrivateFieldGet(this, _KMSVerifier_kmsVerifierReadonlyContract, "f") !== undefined, `KMSVerifier wrapper is not yet initialized`);
        return __classPrivateFieldGet(this, _KMSVerifier_kmsVerifierReadonlyContract, "f").interface;
    }
    async _initialize() {
        (0, error_js_1.assertFhevm)(__classPrivateFieldGet(this, _KMSVerifier_kmsVerifierReadonlyContract, "f") !== undefined, `KMSVerifier wrapper is not initialized`);
        if (!__classPrivateFieldGet(this, _KMSVerifier_orderedSignersAddresses, "f")) {
            const signers = await __classPrivateFieldGet(this, _KMSVerifier_kmsVerifierReadonlyContract, "f").getKmsSigners();
            __classPrivateFieldSet(this, _KMSVerifier_orderedSignersAddresses, signers, "f");
        }
        (0, address_js_1.assertIsAddressArray)(__classPrivateFieldGet(this, _KMSVerifier_orderedSignersAddresses, "f"));
        if (__classPrivateFieldGet(this, _KMSVerifier_threshold, "f") === undefined) {
            const threshold = await __classPrivateFieldGet(this, _KMSVerifier_kmsVerifierReadonlyContract, "f").getThreshold();
            (0, math_js_1.assertIsBigUint8)(threshold);
            __classPrivateFieldSet(this, _KMSVerifier_threshold, Number(threshold), "f");
        }
        if (__classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f") === undefined) {
            const eip712Domain = await __classPrivateFieldGet(this, _KMSVerifier_kmsVerifierReadonlyContract, "f").eip712Domain();
            (0, error_js_1.assertFhevm)(eip712Domain.length === 7);
            (0, string_js_1.assertIsString)(eip712Domain[0], "eip712Domain[0]");
            (0, string_js_1.assertIsString)(eip712Domain[1], "eip712Domain[1]");
            (0, string_js_1.assertIsString)(eip712Domain[2], "eip712Domain[2]");
            (0, math_js_1.assertIsBigUint256)(eip712Domain[3], "eip712Domain[3]");
            (0, address_js_1.assertIsAddress)(eip712Domain[4], "eip712Domain[4]");
            (0, bytes_js_1.assertIsBytes32String)(eip712Domain[5], "eip712Domain[5]");
            __classPrivateFieldSet(this, _KMSVerifier_eip712Domain, {
                fields: Number(BigInt(eip712Domain[0])),
                name: eip712Domain[1],
                version: eip712Domain[2],
                chainId: eip712Domain[3],
                verifyingContract: eip712Domain[4],
                salt: eip712Domain[5],
            }, "f");
        }
        (0, error_js_1.assertFhevm)(__classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f").fields === Number(0x0f));
        (0, error_js_1.assertFhevm)(__classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f").salt === ethers_1.ethers.ZeroHash);
        (0, error_js_1.assertFhevm)(__classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f").name === constants_js_1.default.PUBLIC_DECRYPT_EIP712.domain.name);
        (0, error_js_1.assertFhevm)(__classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f").version === constants_js_1.default.PUBLIC_DECRYPT_EIP712.domain.version);
        await this._reorderKmsSigners();
    }
    async _reorderKmsSigners() {
        (0, error_js_1.assertFhevm)(__classPrivateFieldGet(this, _KMSVerifier_orderedSignersAddresses, "f"));
        const orderedAddresses = new Set();
        for (let i = 0; i < __classPrivateFieldGet(this, _KMSVerifier_orderedSignersAddresses, "f").length; ++i) {
            const addr = __classPrivateFieldGet(this, _KMSVerifier_orderedSignersAddresses, "f")[i];
            if (orderedAddresses.has(addr)) {
                throw new error_js_1.FhevmError(`Duplicated kms signer address ${addr}`);
            }
            orderedAddresses.add(addr);
        }
        if (!__classPrivateFieldGet(this, _KMSVerifier_orderedSigners, "f")) {
            return;
        }
        const addressSignerPairs = await Promise.all(__classPrivateFieldGet(this, _KMSVerifier_orderedSigners, "f").map(async (signer) => {
            const addr = await signer.getAddress();
            return { addr, signer };
        }));
        const signersMap = new Map();
        for (const { addr, signer } of addressSignerPairs) {
            if (signersMap.has(addr)) {
                throw new error_js_1.FhevmError(`Duplicated kms signer address ${addr}`);
            }
            signersMap.set(addr, signer);
        }
        const newOrderedSigners = [];
        for (let i = 0; i < __classPrivateFieldGet(this, _KMSVerifier_orderedSignersAddresses, "f").length; ++i) {
            const addr = __classPrivateFieldGet(this, _KMSVerifier_orderedSignersAddresses, "f")[i];
            if (!signersMap.has(addr)) {
                throw new error_js_1.FhevmError(`Missing kms signer ${addr}`);
            }
            const s = signersMap.get(addr);
            if (!s) {
                throw new error_js_1.FhevmError(`Missing kms signer ${addr}`);
            }
            newOrderedSigners.push(s);
        }
        __classPrivateFieldSet(this, _KMSVerifier_orderedSigners, newOrderedSigners, "f");
    }
    get address() {
        (0, error_js_1.assertFhevm)(__classPrivateFieldGet(this, _KMSVerifier_kmsVerifierContractAddress, "f") !== undefined, `KMSVerifier wrapper not initialized`);
        return __classPrivateFieldGet(this, _KMSVerifier_kmsVerifierContractAddress, "f");
    }
    get gatewayChainId() {
        (0, error_js_1.assertFhevm)(__classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f") !== undefined, `KMSVerifier wrapper not initialized`);
        return __classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f").chainId;
    }
    get gatewayDecryptionAddress() {
        (0, error_js_1.assertFhevm)(__classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f") !== undefined, `KMSVerifier wrapper not initialized`);
        (0, address_js_1.assertIsAddress)(__classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f").verifyingContract, "KMSVerifier.eip712Domain.verifyingContract");
        return __classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f").verifyingContract;
    }
    get eip712Domain() {
        (0, error_js_1.assertFhevm)(__classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f") !== undefined, `KMSVerifier wrapper not initialized`);
        return __classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f");
    }
    getKmsSignersAddresses() {
        (0, error_js_1.assertFhevm)(__classPrivateFieldGet(this, _KMSVerifier_orderedSignersAddresses, "f") !== undefined, `KMSVerifier wrapper not initialized`);
        return __classPrivateFieldGet(this, _KMSVerifier_orderedSignersAddresses, "f");
    }
    getKmsSigners() {
        (0, error_js_1.assertFhevm)(__classPrivateFieldGet(this, _KMSVerifier_orderedSignersAddresses, "f") !== undefined, `KMSVerifier wrapper not initialized`);
        return __classPrivateFieldGet(this, _KMSVerifier_orderedSigners, "f");
    }
    async assertMatchKmsSigners(signers) {
        const addresses = this.getKmsSignersAddresses();
        (0, error_js_1.assertIsArray)(signers, "signers");
        (0, error_js_1.assertFhevm)(signers.length === addresses.length, "signers.length === addresses.length");
        for (let i = 0; i < addresses.length; ++i) {
            const s = await signers[i].getAddress();
            (0, error_js_1.assertFhevm)(addresses[i] === s, `addresses[${i}] === await signers[${i}].getAddress()`);
        }
    }
    getThreshold() {
        (0, error_js_1.assertFhevm)(__classPrivateFieldGet(this, _KMSVerifier_threshold, "f") !== undefined, `KMSVerifier wrapper not initialized`);
        return __classPrivateFieldGet(this, _KMSVerifier_threshold, "f");
    }
    createPublicDecryptVerificationEIP712(handlesBytes32List, decryptedResult, extraData) {
        const domain = this.eip712Domain;
        const eip712 = {
            domain: {
                chainId: domain.chainId,
                name: domain.name,
                version: domain.version,
                verifyingContract: domain.verifyingContract,
            },
            types: constants_js_1.default.PUBLIC_DECRYPT_EIP712.types,
            message: {
                ctHandles: handlesBytes32List,
                decryptedResult: decryptedResult,
                extraData,
            },
        };
        return eip712;
    }
    static abiEncodeClearValues(clearValues) {
        const handlesBytes32Hex = Object.keys(clearValues);
        const fhevmHandles = handlesBytes32Hex.map((handleBytes32Hex) => FhevmHandle_js_1.FhevmHandle.fromBytes32Hex(handleBytes32Hex));
        const abiTypes = [];
        const abiValues = [];
        for (let i = 0; i < handlesBytes32Hex.length; ++i) {
            const handle = handlesBytes32Hex[i];
            let clearTextValue = clearValues[handle];
            if (typeof clearTextValue === "boolean") {
                clearTextValue = clearTextValue ? "0x01" : "0x00";
            }
            const clearTextValueBigInt = BigInt(clearTextValue);
            const fhevmTypeInfo = fhevmHandles[i].fhevmTypeInfo;
            abiTypes.push("uint256");
            switch (fhevmTypeInfo.type) {
                case FhevmType_js_1.FhevmType.eaddress: {
                    abiValues.push(`0x${clearTextValueBigInt.toString(16).padStart(40, "0")}`);
                    break;
                }
                case FhevmType_js_1.FhevmType.ebool: {
                    (0, error_js_1.assertFhevm)(clearTextValueBigInt === 0n || clearTextValueBigInt === 1n);
                    abiValues.push(clearTextValueBigInt);
                    break;
                }
                case FhevmType_js_1.FhevmType.euint4:
                case FhevmType_js_1.FhevmType.euint8:
                case FhevmType_js_1.FhevmType.euint16:
                case FhevmType_js_1.FhevmType.euint32:
                case FhevmType_js_1.FhevmType.euint64:
                case FhevmType_js_1.FhevmType.euint128:
                case FhevmType_js_1.FhevmType.euint256: {
                    abiValues.push(clearTextValueBigInt);
                    break;
                }
                default: {
                    throw new error_js_1.FhevmError(`Unsupported Fhevm primitive type id: ${fhevmTypeInfo.type}, name: ${fhevmTypeInfo.name}, solidity: ${fhevmTypeInfo.solidityTypeName}`);
                }
            }
        }
        const abiCoder = ethers_1.ethers.AbiCoder.defaultAbiCoder();
        const abiEncodedClearValues = abiCoder.encode(abiTypes, abiValues);
        return {
            abiTypes,
            abiValues,
            abiEncodedClearValues,
        };
    }
    static buildDecryptionProof(kmsSignatures, extraData) {
        const packedNumSigners = ethers_1.ethers.solidityPacked(["uint8"], [kmsSignatures.length]);
        const packedSignatures = ethers_1.ethers.solidityPacked(Array(kmsSignatures.length).fill("bytes"), kmsSignatures);
        const decryptionProof = ethers_1.ethers.concat([
            packedNumSigners,
            packedSignatures,
            extraData,
        ]);
        return decryptionProof;
    }
    async computeDecryptionSignatures(handlesBytes32Hex, clearTextValues, extraData) {
        if (!__classPrivateFieldGet(this, _KMSVerifier_orderedSigners, "f")) {
            throw new error_js_1.FhevmError(`Missing Kms signers. Unable to compute decryption signature`);
        }
        const fhevmHandles = handlesBytes32Hex.map((handleBytes32Hex) => FhevmHandle_js_1.FhevmHandle.fromBytes32Hex(handleBytes32Hex));
        (0, error_js_1.assertFhevm)(handlesBytes32Hex.length === clearTextValues.length);
        const abiTypes = [];
        const abiValues = [];
        for (let i = 0; i < handlesBytes32Hex.length; ++i) {
            let clearTextValue = clearTextValues[i];
            if (typeof clearTextValue === "boolean") {
                clearTextValue = clearTextValue ? "0x01" : "0x00";
            }
            const clearTextValueBigInt = BigInt(clearTextValue);
            const fhevmTypeInfo = fhevmHandles[i].fhevmTypeInfo;
            abiTypes.push("uint256");
            switch (fhevmTypeInfo.type) {
                case FhevmType_js_1.FhevmType.eaddress: {
                    abiValues.push(`0x${clearTextValueBigInt.toString(16).padStart(40, "0")}`);
                    break;
                }
                case FhevmType_js_1.FhevmType.ebool: {
                    abiValues.push(clearTextValueBigInt);
                    break;
                }
                case FhevmType_js_1.FhevmType.euint4:
                case FhevmType_js_1.FhevmType.euint8:
                case FhevmType_js_1.FhevmType.euint16:
                case FhevmType_js_1.FhevmType.euint32:
                case FhevmType_js_1.FhevmType.euint64:
                case FhevmType_js_1.FhevmType.euint128:
                case FhevmType_js_1.FhevmType.euint256: {
                    abiValues.push(clearTextValueBigInt);
                    break;
                }
                default: {
                    throw new error_js_1.FhevmError(`Unsupported Fhevm primitive type id: ${fhevmTypeInfo.type}, name: ${fhevmTypeInfo.name}, solidity: ${fhevmTypeInfo.solidityTypeName}`);
                }
            }
        }
        const abiCoder = ethers_1.ethers.AbiCoder.defaultAbiCoder();
        const abiEncodedClearResult = abiCoder.encode(abiTypes, abiValues);
        const eip712 = this.createPublicDecryptVerificationEIP712(handlesBytes32Hex, abiEncodedClearResult, extraData);
        const clearResultsEIP712signatures = await (0, eip712_js_1.multiSignEIP712)(__classPrivateFieldGet(this, _KMSVerifier_orderedSigners, "f"), eip712.domain, eip712.types, eip712.message);
        const packedNumSigners = ethers_1.ethers.solidityPacked(["uint8"], [clearResultsEIP712signatures.length]);
        const packedSignatures = ethers_1.ethers.solidityPacked(Array(clearResultsEIP712signatures.length).fill("bytes"), clearResultsEIP712signatures);
        const decryptionProof = ethers_1.ethers.concat([
            packedNumSigners,
            packedSignatures,
            extraData,
        ]);
        for (let i = 0; i < abiTypes.length; ++i) {
            (0, error_js_1.assertFhevm)(abiTypes[i] === "uint256");
        }
        (0, string_js_1.assertIs0xString)(decryptionProof, "decryptionProof");
        (0, string_js_1.assertIs0xString)(abiEncodedClearResult, "abiEncodedClearResult");
        return {
            signatures: clearResultsEIP712signatures,
            types: abiTypes,
            values: abiValues,
            abiEncodedClearResult,
            decryptionProof,
        };
    }
}
exports.KMSVerifier = KMSVerifier;
_KMSVerifier_kmsVerifierReadonlyContract = new WeakMap(), _KMSVerifier_kmsVerifierContractAddress = new WeakMap(), _KMSVerifier_orderedSignersAddresses = new WeakMap(), _KMSVerifier_orderedSigners = new WeakMap(), _KMSVerifier_threshold = new WeakMap(), _KMSVerifier_eip712Domain = new WeakMap();
//# sourceMappingURL=KMSVerifier.js.map