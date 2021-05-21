/* 1_accounts.js
 *
 * Simple program to get the account balance on Matic or Ethereum Network 
 */

const Web3 = require('web3')

// Matic Mumbai Test network RPC address
const web3 = new Web3('https://rpc-mumbai.matic.today')

// Address
const address = '0x7540d0B3cd936945043a5d3F244167352D5a031f' // 

web3.eth.getBalance(address, (err, balance) => {
	console.log ( web3.utils.fromWei (balance) )
})