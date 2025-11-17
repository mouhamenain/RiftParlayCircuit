// Quick verification of the contract address constant
const fs = require('fs');
const path = require('path');

const contractsPath = path.join(__dirname, 'src/config/contracts.ts');
const content = fs.readFileSync(contractsPath, 'utf8');

console.log('\n=== Contract Address Verification ===\n');
console.log('File:', contractsPath);
console.log('\nContent:');
console.log(content);

const match = content.match(/CIRCUIT_ADDRESS\s*=\s*"(0x[a-fA-F0-9]+)"/);
if (match) {
  console.log('\n✅ Found CIRCUIT_ADDRESS:', match[1]);
  if (match[1] === '0xE8Db669D5aF5c7366Ec1d19961AB2023CbA4D6bA') {
    console.log('✅ Address is CORRECT - matches deployed contract');
  } else {
    console.log('❌ Address is WRONG - expected 0xE8Db669D5aF5c7366Ec1d19961AB2023CbA4D6bA');
  }
} else {
  console.log('❌ Could not find CIRCUIT_ADDRESS in file');
}
