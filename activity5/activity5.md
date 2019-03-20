# Create your web DApp using Truffle (i.e. the 'hard' way)
## Goal
In this activity, we will use the popular Truffle development framework to re-create our Collectible Stamps App from the previous exercise. We will then compare and contrast the two approaches.

The goal after this activity is to have an appreciation of all the steps in the blockchain app development process that are done 'behind the scenes' by Link. 

## Exercise
This activity will require you to:
* Use Truffle - a popular environment and framework for blockchain development
* Use Truffle's `HDWalletProvider` and Infura (https://infura.io) to deploy your smart contract to the public `Ropsten` test network
* Use web3.js for our app to interact with both a local and public blockchain
* Use HTML and JavaScript for the front-end web app, similar to the previous activity

We will first deploy and run the App using our local blockchain and then the public `Ropsten` test network. Much of the truffle code used to do this is boilerplate code. 

### Setup

> In the `activity5/collectible-stamps-app/` folder, run:
```
    npm install
```
This will install all the node dependencies - have a look in `package.json` to see what those dependencies are. 

> Ensure you have Ganache running a local blockchain at `http://127.0.0.1:7545`.

A truffle project contains the following key folders/files:
* `contracts/` which contain the Solidity smart contract files (`.sol` extension). By default, when you create a truffle project, the `Migrations.sol` contract is created by default.
  
* `migrations/` which contain JavaScript files that deploy the contracts to the blockchain (think of these as database migration scripts). The `1_inital_migration.js` file is always used and run first by default. Additional migration files will be labled following the convention `2_<deploy stuff>`, etc..

* `truffle.js`. This is the config file telling Truffle which blockchain networks are setup and how to connect with them. For development, we are using a local blockchain with Ganache on `http://127.0.0.1:7545`. To connect with the public Ropsten testnet, we are using a package called `truffle-hdwalle-provider` to connect to a public Ethereum address using Infura as the network connector/gateway.

### Create and Deploy the Ownership Smart Contract
In activity 3, we used Link to create and deploy the `Ownership` smart contract. Here is what the process is to do so using Truffle. 

> Copy and paste the Solidity `Ownership` contract code into a `Ownership.sol` that is stored in the `contracts/` folder. The filename should match the contract name. 

> Copy and adapt the code in the default `1_initial_migration.js` file to deploy the `Ownership` smart contract. Call this file `2_deploy_ownership.js` with the following contents:
```
const Ownership = artifacts.require("./Ownership.sol");

module.exports = function(deployer) {
    deployer.deploy(Ownership);
};
```
> Now to compile the `Ownership` smart contract to our local blockchain, run the following from the Terminal:
```
truffle compile
```
This will compile and build your contract artifacts in a folder called `build/`.

>Then to deploy the contracts on the local blockchain, run:
```
truffle migrate --network development
```
You should see each contract deployed with a hash address in your Terminal output. 

In addition, you should also see the first account in Ganache have slightly less than 100 ETH as a small amount of ETH was used as a **gas fee to transact with the local network**.

So we have now created our `Ownership` smart contract and deployed it to our local blockchain.

### Front-end setup with MetaMask
In order to interact with our Lending smart contract, we will work with a basic front-end consisting of HTML/CSS and JavaScript. We will use Bootstrap for our CSS. Our front-end files are stored in the `src/` folder.





