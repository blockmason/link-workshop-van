const Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/182b941b70e6443b8854cc53786a3007')

const account1 = '0xeBbB29a4EF9d912C9d1Cd15AFf1c62882CaCb4B1'
const account2 = '0x066414798190F15E79e4a499df7fA9b61F4BecD3'

const privateKey1 = Buffer.from('68EF6574EF971DBE32C6FD77C5E8AE12A26D7AFA419E38D949A25058036ABE44', 'hex')

web3.eth.getTransactionCount(account1, (err, txCount) => {
    // Build the transaction
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: account2,
        value: web3.utils.toHex(web3.utils.toWei('0.5', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }

    // Sign the transaction
    const tx = new Tx(txObject)
    tx.sign(privateKey1)

    const serializedTx = tx.serialize()
    const rawTx = '0x' + serializedTx.toString('hex')

    // Broadcast the transaction
    web3.eth.sendSignedTransaction(rawTx, (err, txHash) => {
        console.log('txHash is: ', txHash)
    })
})