const { Wallet } = require('@dashevo/wallet-lib')
const { readFileSync } = require('fs')

const run = async () => {
  console.log('This utility will help you to export your Dash Platform Identities private keys from the seedphrase')
  console.log('Please, create seed.txt file in the same folder')
  console.log('Pass number of the identities to extract via --identities $n flag (default 10)')
  console.log('Pass number of the keys per identity to extract via --keys $n flag (default 4')
  console.log('Application will extract private keys for mainnet by default, pass --testnet flag to change network')

  let network = 'mainnet'
  let identitiesCount = 10
  let keysCount = 4

  const [, , flagKey, flagValue] = process.argv

  if (process.argv.length % 2 !== 0) {
    console.error('Invalid number of argument was passed')
    process.exit(1)
  }

  for (let i = 2; i < process.argv.length; i += 2) {
    const flagKey = process.argv[i]
    const flagValue = process.argv[i + 1]

    if (flagKey === 'network') {
      network = flagValue
    }

    if (flagKey === 'identities') {
      identitiesCount = parseInt(flagValue)
    }

    if (flagKey === 'keys') {
      keysCount = parseInt(flagValue)
    }
  }

  if (flagKey === '--network') {
    network = 'testnet'
  }

  let seed

  try {
    seed = readFileSync('seed.txt', 'utf8').replaceAll('\n', '').trim()
  } catch (err) {
    console.error(err)
  }

  if (!seed) {
    console.error('Could not read file seed.txt or it was empty')
    process.exit(1)
  }

  const walletOpts = {
    offlineMode: true,
    network,
    mnemonic: seed,
  }

  const wallet = new Wallet(walletOpts)
  const account = await wallet.getAccount()

  for (let i = 0; i < identitiesCount; i++) {
    console.log('---')
    for (let j = 0; j < keysCount; j++) {
      const hdPrivateKey = account.identities.getIdentityHDKeyByIndex(i, j)
      const privateKey = hdPrivateKey.privateKey

      console.log(`Identity index ${i}, key ${j} WIF = ${privateKey.toWIF()} HEX = ${privateKey.toString()}`)
    }
  }

  process.exit(0)
}

run().catch(err => console.error(err) && process.exit(1))
