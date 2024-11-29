# dash-sdk-extract-identities
Utility to export private keys from your Dash Platform identities created with Dash SDK

# Prerequisites
* Node.JS LTS (v22)
* A seed phrase with registered identities

# Usage
1) `git clone https://github.com/pshenmic/dash-sdk-extract-identities`
2) `cd dash-sdk-extract-identities`
3) `npm install`
4) create seed.txt file with your seedphrase
5) `node index.js`

Mainnet network by default, you can pass `--network testnet` option to recover private keys from testnet

Pass `--identities 100` to increase number of identities to extract to 100

Pass `--keys 10` to increase number of keys per identities to extract
