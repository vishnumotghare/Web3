/* 3_send_signed_transactions
*  Send Signed transaction from accoint1 t0
*  account 2
*/

const Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')

var web3 = new Web3(new Web3.providers.HttpProvider(
    'https://ropsten.infura.io/v3/073e0f5c27fc45e48ac3e3ee142b70b9'
));

// Account addresses
const account1 = '0x7540d0B3cd936945043a5d3F244167352D5a031f'
const account2 = '0x8f50C77518e8563Be7D497CF6252F6AE6374aC20'


// Get the Private key for acoount1 & account2
// Pivate key are exported using environment variable
const privateKey1Buffer = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')
const privateKey2Buffer = Buffer.from(process.env.PRIVATE_KEY_2, 'hex')

web3.eth.getBalance(account1, (err, balance) => {
  console.log (web3.utils.fromWei(balance))
})

web3.eth.getTransactionCount(account1, (err, txCount) => {

  // Build the transaction  
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       account2,
    value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  }

  // Sign the transactions
  var tx = new Tx(txObject, {'chain':'ropsten'});
  tx.sign(privateKey1Buffer)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  const tx_hash = tx.hash().toString('hex')
  console.log(tx_hash)

  //Broadcast the transaction
  web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
  .then( receipt => {
    console.log('Receipt:', receipt);
  })
  .catch(e => {
    console.error('Error broadcasting the transaction: ', e);
  });
})