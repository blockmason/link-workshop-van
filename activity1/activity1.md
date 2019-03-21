# Introduction to web3 and Ethereum
## Goal
In this activity, we will read basic account information from both local and public blockchains and execute a basic transfer of the ether (ETH) cryptocurrency locally using the node.js (server side) command line. 

## Exercise
This activity will require you to:
* Use web3js - a collection of libraries to interact with local or remote ethereum nodes
* Run a local ethereum blockchain using Ganache
* Interact with the local blockchain through web3js functions and work with promises and basic callbacks
* Send ETH cryptocurrency between 2 unlocked accounts on your local blockchain

## General activity notes
* Discuss the difference between the current web3 release (v0.x.x) and the beta version (v1.0.0).
* Discuss what is meant by a "web3 instance" and "web3 provider".  

### Setup
Refer to the web3 documentation as needed - https://web3js.readthedocs.io/en/1.0/getting-started.html

> Install the web3 dependency using the node package manager in your Terminal. The dependencies listed in`package.json` will be installed.
```
    npm install 
```
> Open up Ganache. By default, your local blockchain will run on `http://127.0.0.1:7545`.
   
> Run node from your Terminal window: 
```
    node
```
> Create an instance of the web3 libary you just installed and connect it with your local blockchain :
``` 
    > const Web3 = require('web3')
    > const url = 'http://127.0.0.1:7545'
    > const web3 = new Web3(url)
    > web3
```

### The web3 object
Key attributes or functions of web3 include:
* Pull up the web3 `unitMap` object to discuss wei, gwei, ether values and units
* `web3.utils` object functions `toWei` and `fromWei` for unit conversions and `toHex` to convert to hexadecimal.
* The `web3.eth` object and in particular the `getAccounts` `getBalance` and `sendTransaction`  functions

### Get local blockchain accounts
First let us fetch all 10 accounts addresses running on our local blockchain. Function calls to the blockchain **return promises** so we can use callbacks, async/await, or simply Promise`.then()` to access our data. Refer to: https://web3js.readthedocs.io/en/1.0/web3-eth.html#getaccounts
```
> web3.eth.getAccounts().then(accounts => {
    console.log(accounts);
});

> [ '0xdeF4f71e2DA944Ca4118c04CcF120f8a2bc7B92B',
  '0x20eCfb735EEAd9902b43Cd553F485Fd7a04D2791',
  '0x0b26ceC8Ac4a85520BEd11BaCA67A3Bc7D244650',
  '0xAAde909894A442b7C02325449BDa3eCD36BB2726',
  '0xDa88712515F02f808E4C397Ec477880e6fD71d2E',
  '0xaE1aa44d839FeecFb2479501bEC0fAf63fad28Fb',
  '0x16513084F0eaDFF2676017C9735893ad1AFD4359',
  '0x9C177Bb3a820aE6337982c49634d6271e035d2D6',
  '0xa70Eb16e4450721DCe159AE0f0F3b02743F249Ad',
  '0xC0721c07E16Bb55DCF0dAE7CA63BA0a2aC3648f6' ]
```
And there are your 10 local blockchain addresses! We get back all the accounts because our local web3 object has access to all of them.   

### Get Account Balance
Now let us get the balance of one of the local accounts **in ether units**: 

> From your local blockchain, select the address of the first account. E.g. `0xdeF4f71e2DA944Ca4118c04CcF120f8a2bc7B92B`. Then call the `getBalance` function in the `web3.eth` object:
```
> web3.eth.getBalance('0xdeF4f71e2DA944Ca4118c04CcF120f8a2bc7B92B').then(balanceWei => {
    balanceEther = web3.utils.fromWei(balanceWei, 'ether');
});

> balanceEther
```
The balance of the first account is 100 Ether (ETH). 

Currently we are using a local blockchain but we can do exactly the same thing with the **public ethereum mainnet.** We just need to initiate web3 with the appropriate provider. 

> From the Infura website, select the `MAINNET` endpoint and copy the API URL. This will be our mainnet url that we use to interact with the main ethereum network. 
```
> const mainnetUrl = 'https://mainnet.infura.io/v3/182b941b70e6443b8854cc53786a3007'
> const mainnetWeb3 = new Web3(mainnetUrl)
> mainnetWeb3
```
> Look at the list of top ethereum accounts at `https://etherscan.io/accounts` and pick an address: `0x742d35cc6634c0532925a3b844bc454e4438f44e`. Similar to the `getBalance` function we ran locally, we can do the following:
```
> mainnetWeb3.eth.getBalance('0x742d35cc6634c0532925a3b844bc454e4438f44e')
.then(balanceWei => {
    balanceEther = mainnetWeb3.utils.fromWei(balanceWei, 'ether');
});

> balanceEther
```
And the balance we get should match the balance displayed on the etherscan accounts webpage. 

### Send ETH between accounts

Finally, back to our local blockchain, let us send ETH from one account to another representing a basic money transfer between wallets. 

Currently, these local accounts are unlocked, meaning that transactions are automatically signed on the account holder's behalf.

From the web3js docs (https://web3js.readthedocs.io/en/1.0/web3-eth.html#eth-sendtransaction), the `sendTransaction` function takes in a transaction object containing the to/from addresses, transaction value in Wei and optional parameters like gas/gasPrice which we won't worry about at the moment. It also takes in an optional callback function which we'll also not worry about at the moment.

> Call the `sendTransaction` function passing in the transaction object:
```
> web3.eth.sendTransaction({
    from: '0xdeF4f71e2DA944Ca4118c04CcF120f8a2bc7B92B',
    to: '0x20eCfb735EEAd9902b43Cd553F485Fd7a04D2791',
    value: web3.utils.toWei('10', 'ether')
})
```
This, as expected, returns a promise. Taking a look at the account summaries of our local blockchain in Ganache, we see the first account balance has been reduced by 10 ETH and the second account balance has increased by 10 ETH. **We have successfully excuted our first money transfer!**