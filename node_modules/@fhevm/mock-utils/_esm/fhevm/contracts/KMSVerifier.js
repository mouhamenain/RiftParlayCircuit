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
import { ethers as EthersT } from "ethers";
import constants from "../../constants.js";
import { multiSignEIP712 } from "../../ethers/eip712.js";
import { assertIsAddress, assertIsAddressArray } from "../../utils/address.js";
import { assertIsBytes32String } from "../../utils/bytes.js";
import { FhevmError, assertFhevm, assertIsArray } from "../../utils/error.js";
import { assertIsBigUint8, assertIsBigUint256 } from "../../utils/math.js";
import { assertIs0xString, assertIsString } from "../../utils/string.js";
import { FhevmHandle } from "../FhevmHandle.js";
import { FhevmType } from "../FhevmType.js";
import { FhevmHostContractWrapper } from "./FhevmContractWrapper.js";
import { KMSVerifierPartialInterface } from "./interfaces/KMSVerifier.itf.js";
// Shareable
export class KMSVerifier extends FhevmHostContractWrapper {
    constructor() {
        super("KMSVerifier");
        _KMSVerifier_kmsVerifierReadonlyContract.set(this, void 0);
        _KMSVerifier_kmsVerifierContractAddress.set(this, void 0);
        // Warning! kms signers are ordered! kms server partyId = index + 1
        _KMSVerifier_orderedSignersAddresses.set(this, void 0);
        _KMSVerifier_orderedSigners.set(this, void 0);
        _KMSVerifier_threshold.set(this, void 0);
        _KMSVerifier_eip712Domain.set(this, void 0);
    }
    static async create(runner, kmsVerifierContractAddress, abi, properties) {
        assertIsAddress(kmsVerifierContractAddress, "kmsVerifierContractAddress");
        const kmsVerifier = new KMSVerifier();
        __classPrivateFieldSet(kmsVerifier, _KMSVerifier_kmsVerifierContractAddress, kmsVerifierContractAddress, "f");
        __classPrivateFieldSet(kmsVerifier, _KMSVerifier_kmsVerifierReadonlyContract, new EthersT.Contract(kmsVerifierContractAddress, abi ?? KMSVerifierPartialInterface, runner), "f");
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
        assertFhevm(__classPrivateFieldGet(this, _KMSVerifier_kmsVerifierReadonlyContract, "f") !== undefined, `KMSVerifier wrapper is not initialized`);
        return __classPrivateFieldGet(this, _KMSVerifier_kmsVerifierReadonlyContract, "f");
    }
    get interface() {
        assertFhevm(__classPrivateFieldGet(this, _KMSVerifier_kmsVerifierReadonlyContract, "f") !== undefined, `KMSVerifier wrapper is not yet initialized`);
        return __classPrivateFieldGet(this, _KMSVerifier_kmsVerifierReadonlyContract, "f").interface;
    }
    async _initialize() {
        assertFhevm(__classPrivateFieldGet(this, _KMSVerifier_kmsVerifierReadonlyContract, "f") !== undefined, `KMSVerifier wrapper is not initialized`);
        if (!__classPrivateFieldGet(this, _KMSVerifier_orderedSignersAddresses, "f")) {
            const signers = await __classPrivateFieldGet(this, _KMSVerifier_kmsVerifierReadonlyContract, "f").getKmsSigners();
            __classPrivateFieldSet(this, _KMSVerifier_orderedSignersAddresses, signers, "f");
        }
        assertIsAddressArray(__classPrivateFieldGet(this, _KMSVerifier_orderedSignersAddresses, "f"));
        if (__classPrivateFieldGet(this, _KMSVerifier_threshold, "f") === undefined) {
            const threshold = await __classPrivateFieldGet(this, _KMSVerifier_kmsVerifierReadonlyContract, "f").getThreshold();
            assertIsBigUint8(threshold);
            __classPrivateFieldSet(this, _KMSVerifier_threshold, Number(threshold), "f");
        }
        if (__classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f") === undefined) {
            // ignore extensions
            const eip712Domain = await __classPrivateFieldGet(this, _KMSVerifier_kmsVerifierReadonlyContract, "f").eip712Domain();
            assertFhevm(eip712Domain.length === 7);
            assertIsString(eip712Domain[0], "eip712Domain[0]");
            assertIsString(eip712Domain[1], "eip712Domain[1]");
            assertIsString(eip712Domain[2], "eip712Domain[2]");
            assertIsBigUint256(eip712Domain[3], "eip712Domain[3]");
            assertIsAddress(eip712Domain[4], "eip712Domain[4]");
            assertIsBytes32String(eip712Domain[5], "eip712Domain[5]");
            __classPrivateFieldSet(this, _KMSVerifier_eip712Domain, {
                fields: Number(BigInt(eip712Domain[0])),
                name: eip712Domain[1],
                version: eip712Domain[2],
                chainId: eip712Domain[3],
                verifyingContract: eip712Domain[4],
                salt: eip712Domain[5],
                // last field is ignored
            }, "f");
        }
        // Add extra checks (in case EIP712 are chanbging)
        assertFhevm(__classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f").fields === Number(0x0f));
        assertFhevm(__classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f").salt === EthersT.ZeroHash);
        assertFhevm(__classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f").name === constants.PUBLIC_DECRYPT_EIP712.domain.name);
        assertFhevm(__classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f").version === constants.PUBLIC_DECRYPT_EIP712.domain.version);
        await this._reorderKmsSigners();
    }
    async _reorderKmsSigners() {
        assertFhevm(__classPrivateFieldGet(this, _KMSVerifier_orderedSignersAddresses, "f"));
        // check for duplicates in #orderedSignersAddresses
        const orderedAddresses = new Set();
        for (let i = 0; i < __classPrivateFieldGet(this, _KMSVerifier_orderedSignersAddresses, "f").length; ++i) {
            const addr = __classPrivateFieldGet(this, _KMSVerifier_orderedSignersAddresses, "f")[i];
            if (orderedAddresses.has(addr)) {
                throw new FhevmError(`Duplicated kms signer address ${addr}`);
            }
            orderedAddresses.add(addr);
        }
        // reorder signers and verify addresses
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
                throw new FhevmError(`Duplicated kms signer address ${addr}`);
            }
            signersMap.set(addr, signer);
        }
        const newOrderedSigners = [];
        for (let i = 0; i < __classPrivateFieldGet(this, _KMSVerifier_orderedSignersAddresses, "f").length; ++i) {
            const addr = __classPrivateFieldGet(this, _KMSVerifier_orderedSignersAddresses, "f")[i];
            if (!signersMap.has(addr)) {
                throw new FhevmError(`Missing kms signer ${addr}`);
            }
            const s = signersMap.get(addr);
            if (!s) {
                throw new FhevmError(`Missing kms signer ${addr}`);
            }
            newOrderedSigners.push(s);
        }
        __classPrivateFieldSet(this, _KMSVerifier_orderedSigners, newOrderedSigners, "f");
    }
    get address() {
        assertFhevm(__classPrivateFieldGet(this, _KMSVerifier_kmsVerifierContractAddress, "f") !== undefined, `KMSVerifier wrapper not initialized`);
        return __classPrivateFieldGet(this, _KMSVerifier_kmsVerifierContractAddress, "f");
    }
    // The KMSVerifier is always using the gatewayChainId in its eip712 domain
    get gatewayChainId() {
        assertFhevm(__classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f") !== undefined, `KMSVerifier wrapper not initialized`);
        return __classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f").chainId;
    }
    // The KMSVerifier is always using the address of the "Decryption.sol" contract deployed
    // on the gateway chainId in its eip712 domain
    get gatewayDecryptionAddress() {
        assertFhevm(__classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f") !== undefined, `KMSVerifier wrapper not initialized`);
        assertIsAddress(__classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f").verifyingContract, "KMSVerifier.eip712Domain.verifyingContract");
        return __classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f").verifyingContract;
    }
    get eip712Domain() {
        assertFhevm(__classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f") !== undefined, `KMSVerifier wrapper not initialized`);
        return __classPrivateFieldGet(this, _KMSVerifier_eip712Domain, "f");
    }
    getKmsSignersAddresses() {
        assertFhevm(__classPrivateFieldGet(this, _KMSVerifier_orderedSignersAddresses, "f") !== undefined, `KMSVerifier wrapper not initialized`);
        return __classPrivateFieldGet(this, _KMSVerifier_orderedSignersAddresses, "f");
    }
    getKmsSigners() {
        // Check for init using #orderedSignersAddresses since #orderedSigners can be undefined
        assertFhevm(__classPrivateFieldGet(this, _KMSVerifier_orderedSignersAddresses, "f") !== undefined, `KMSVerifier wrapper not initialized`);
        return __classPrivateFieldGet(this, _KMSVerifier_orderedSigners, "f");
    }
    async assertMatchKmsSigners(signers) {
        const addresses = this.getKmsSignersAddresses();
        assertIsArray(signers, "signers");
        assertFhevm(signers.length === addresses.length, "signers.length === addresses.length");
        for (let i = 0; i < addresses.length; ++i) {
            const s = await signers[i].getAddress();
            assertFhevm(addresses[i] === s, `addresses[${i}] === await signers[${i}].getAddress()`);
        }
    }
    getThreshold() {
        assertFhevm(__classPrivateFieldGet(this, _KMSVerifier_threshold, "f") !== undefined, `KMSVerifier wrapper not initialized`);
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
            types: constants.PUBLIC_DECRYPT_EIP712.types,
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
        const fhevmHandles = handlesBytes32Hex.map((handleBytes32Hex) => FhevmHandle.fromBytes32Hex(handleBytes32Hex));
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
            //abiTypes.push(fhevmTypeInfo.solidityTypeName);
            abiTypes.push("uint256");
            switch (fhevmTypeInfo.type) {
                case FhevmType.eaddress: {
                    // string
                    abiValues.push(`0x${clearTextValueBigInt.toString(16).padStart(40, "0")}`);
                    break;
                }
                case FhevmType.ebool: {
                    // bigint (0 or 1)
                    assertFhevm(clearTextValueBigInt === 0n || clearTextValueBigInt === 1n);
                    abiValues.push(clearTextValueBigInt);
                    break;
                }
                case FhevmType.euint4:
                case FhevmType.euint8:
                case FhevmType.euint16:
                case FhevmType.euint32:
                case FhevmType.euint64:
                case FhevmType.euint128:
                case FhevmType.euint256: {
                    // bigint
                    abiValues.push(clearTextValueBigInt);
                    break;
                }
                default: {
                    throw new FhevmError(`Unsupported Fhevm primitive type id: ${fhevmTypeInfo.type}, name: ${fhevmTypeInfo.name}, solidity: ${fhevmTypeInfo.solidityTypeName}`);
                }
            }
        }
        const abiCoder = EthersT.AbiCoder.defaultAbiCoder();
        // ABI encode the decryptedResult as done in the KMS, since all decrypted values
        // are native static types, thay have same abi-encoding as uint256:
        const abiEncodedClearValues = abiCoder.encode(abiTypes, abiValues);
        return {
            abiTypes,
            abiValues,
            abiEncodedClearValues,
        };
    }
    static buildDecryptionProof(kmsSignatures, extraData) {
        // Build the decryptionProof as numSigners + KMS signatures + extraData
        const packedNumSigners = EthersT.solidityPacked(["uint8"], [kmsSignatures.length]);
        const packedSignatures = EthersT.solidityPacked(Array(kmsSignatures.length).fill("bytes"), kmsSignatures);
        const decryptionProof = EthersT.concat([
            packedNumSigners,
            packedSignatures,
            extraData,
        ]);
        return decryptionProof;
    }
    async computeDecryptionSignatures(handlesBytes32Hex, clearTextValues, extraData) {
        if (!__classPrivateFieldGet(this, _KMSVerifier_orderedSigners, "f")) {
            throw new FhevmError(`Missing Kms signers. Unable to compute decryption signature`);
        }
        const fhevmHandles = handlesBytes32Hex.map((handleBytes32Hex) => FhevmHandle.fromBytes32Hex(handleBytes32Hex));
        assertFhevm(handlesBytes32Hex.length === clearTextValues.length);
        const abiTypes = [];
        const abiValues = [];
        for (let i = 0; i < handlesBytes32Hex.length; ++i) {
            let clearTextValue = clearTextValues[i];
            if (typeof clearTextValue === "boolean") {
                clearTextValue = clearTextValue ? "0x01" : "0x00";
            }
            const clearTextValueBigInt = BigInt(clearTextValue);
            const fhevmTypeInfo = fhevmHandles[i].fhevmTypeInfo;
            //abiTypes.push(fhevmTypeInfo.solidityTypeName);
            abiTypes.push("uint256");
            switch (fhevmTypeInfo.type) {
                case FhevmType.eaddress: {
                    // string
                    abiValues.push(`0x${clearTextValueBigInt.toString(16).padStart(40, "0")}`);
                    break;
                }
                case FhevmType.ebool: {
                    // bigint (0 or 1)
                    abiValues.push(clearTextValueBigInt);
                    break;
                }
                case FhevmType.euint4:
                case FhevmType.euint8:
                case FhevmType.euint16:
                case FhevmType.euint32:
                case FhevmType.euint64:
                case FhevmType.euint128:
                case FhevmType.euint256: {
                    // bigint
                    abiValues.push(clearTextValueBigInt);
                    break;
                }
                default: {
                    throw new FhevmError(`Unsupported Fhevm primitive type id: ${fhevmTypeInfo.type}, name: ${fhevmTypeInfo.name}, solidity: ${fhevmTypeInfo.solidityTypeName}`);
                }
            }
        }
        const abiCoder = EthersT.AbiCoder.defaultAbiCoder();
        // ABI encode the decryptedResult as done in the KMS, since all decrypted values
        // are native static types, thay have same abi-encoding as uint256:
        const abiEncodedClearResult = abiCoder.encode(abiTypes, abiValues);
        const eip712 = this.createPublicDecryptVerificationEIP712(handlesBytes32Hex, abiEncodedClearResult, extraData);
        const clearResultsEIP712signatures = await multiSignEIP712(__classPrivateFieldGet(this, _KMSVerifier_orderedSigners, "f"), eip712.domain, eip712.types, eip712.message);
        // Build the decryptionProof as numSigners + KMS signatures + extraData
        const packedNumSigners = EthersT.solidityPacked(["uint8"], [clearResultsEIP712signatures.length]);
        const packedSignatures = EthersT.solidityPacked(Array(clearResultsEIP712signatures.length).fill("bytes"), clearResultsEIP712signatures);
        const decryptionProof = EthersT.concat([
            packedNumSigners,
            packedSignatures,
            extraData,
        ]);
        // ABI encode the list of values in order to pass them in the callback
        for (let i = 0; i < abiTypes.length; ++i) {
            assertFhevm(abiTypes[i] === "uint256");
        }
        assertIs0xString(decryptionProof, "decryptionProof");
        assertIs0xString(abiEncodedClearResult, "abiEncodedClearResult");
        return {
            signatures: clearResultsEIP712signatures,
            types: abiTypes,
            values: abiValues,
            abiEncodedClearResult,
            decryptionProof,
        };
    }
}
_KMSVerifier_kmsVerifierReadonlyContract = new WeakMap(), _KMSVerifier_kmsVerifierContractAddress = new WeakMap(), _KMSVerifier_orderedSignersAddresses = new WeakMap(), _KMSVerifier_orderedSigners = new WeakMap(), _KMSVerifier_threshold = new WeakMap(), _KMSVerifier_eip712Domain = new WeakMap();
// async function __computeDecryptionSignatures(
//   handlesBytes32Hex: string[],
//   clearTextValues: (string | bigint | boolean)[],
//   extraData: string,
//   abiCoder: EthersT.AbiCoder,
//   kmsVerifier: KMSVerifier,
//   kmsSigners: EthersT.Signer[],
// ): Promise<{
//   signatures: string[];
//   types: ReadonlyArray<string | EthersT.ParamType>;
//   values: ReadonlyArray<any>;
//   decryptedResult: string;
// }> {
//   const fhevmHandles: FhevmHandle[] = handlesBytes32Hex.map((handleBytes32Hex) =>
//     FhevmHandle.fromBytes32Hex(handleBytes32Hex),
//   );
//   assertFhevm(handlesBytes32Hex.length === clearTextValues.length);
//   const abiTypes: string[] = [];
//   const abiValues: (string | bigint)[] = [];
//   for (let i = 0; i < handlesBytes32Hex.length; ++i) {
//     let clearTextValue: string | bigint | boolean = clearTextValues[i];
//     if (typeof clearTextValue === "boolean") {
//       clearTextValue = clearTextValue ? "0x01" : "0x00";
//     }
//     const clearTextValueBigInt = BigInt(clearTextValue);
//     const fhevmTypeInfo: FhevmTypeInfo = fhevmHandles[i].fhevmTypeInfo;
//     //abiTypes.push(fhevmTypeInfo.solidityTypeName);
//     abiTypes.push("uint256");
//     switch (fhevmTypeInfo.type) {
//       case FhevmType.eaddress: {
//         // string
//         abiValues.push(`0x${clearTextValueBigInt.toString(16).padStart(40, "0")}`);
//         break;
//       }
//       case FhevmType.ebool: {
//         // bigint (0 or 1)
//         abiValues.push(clearTextValueBigInt);
//         break;
//       }
//       case FhevmType.euint4:
//       case FhevmType.euint8:
//       case FhevmType.euint16:
//       case FhevmType.euint32:
//       case FhevmType.euint64:
//       case FhevmType.euint128:
//       case FhevmType.euint256: {
//         // bigint
//         abiValues.push(clearTextValueBigInt);
//         break;
//       }
//       default: {
//         throw new FhevmError(
//           `Unsupported Fhevm primitive type id: ${fhevmTypeInfo.type}, name: ${fhevmTypeInfo.name}, solidity: ${fhevmTypeInfo.solidityTypeName}`,
//         );
//       }
//     }
//   }
//   // ABI encode the decryptedResult as done in the KMS, since all decrypted values
//   // are native static types, thay have same abi-encoding as uint256:
//   const decryptedResult = abiCoder.encode(abiTypes, abiValues);
//   const eip712 = kmsVerifier.createPublicDecryptVerificationEIP712(handlesBytes32Hex, decryptedResult, extraData);
//   const decryptResultsEIP712signatures: string[] = await multiSignEIP712(
//     kmsSigners,
//     eip712.domain,
//     eip712.types,
//     eip712.message,
//   );
//   return { signatures: decryptResultsEIP712signatures, types: abiTypes, values: abiValues, decryptedResult };
// }
// async function __computeDecryptionCallbackSignaturesAndCalldata(
//   handlesBytes32Hex: string[],
//   clearTextValuesString: string[],
//   extraData: string,
//   requestID: bigint,
//   callbackSelectorBytes4Hex: string,
//   abiCoder: EthersT.AbiCoder,
//   kmsVerifier: KMSVerifier,
//   kmsSigners: EthersT.Signer[],
// ): Promise<{ calldata: string }> {
//   assertFhevm(extraData === EthersT.solidityPacked(["uint8"], [0]), "extraData must be 0x00");
//   const { signatures, types, values } = await __computeDecryptionSignatures(
//     handlesBytes32Hex,
//     clearTextValuesString,
//     extraData,
//     abiCoder,
//     kmsVerifier,
//     kmsSigners,
//   );
//   // Build the decryptionProof as numSigners + KMS signatures + extraData
//   const packedNumSigners = EthersT.solidityPacked(["uint8"], [signatures.length]);
//   const packedSignatures = EthersT.solidityPacked(Array(signatures.length).fill("bytes"), signatures);
//   const decryptionProof = EthersT.concat([packedNumSigners, packedSignatures, extraData]);
//   // ABI encode the list of values in order to pass them in the callback
//   for (let i = 0; i < types.length; ++i) {
//     assertFhevm(types[i] === "uint256");
//   }
//   const encodedCleartexts = abiCoder.encode([...types], [...values]);
//   const calldata =
//     callbackSelectorBytes4Hex +
//     abiCoder.encode(["uint256", "bytes", "bytes"], [requestID, encodedCleartexts, decryptionProof]).slice(2);
//   return { calldata };
// }
//# sourceMappingURL=KMSVerifier.js.map