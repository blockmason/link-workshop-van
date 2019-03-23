# Overall workshop flow

1. Introduce web3.js (both the current release and the beta 1.00), running a local blockchain with Ganache, getting and sending ETH between accounts locally on the server side, getting ETH balance from a mainnet account using Infura.

2. Create a very basic DApp with a front-end to send ETH between accounts using MetaMask. This activity uses boilerplate HTML/JS/CSS code to get participants familiar with the front-end code structure. 

3. As a take-home stretch exercise, do Activity 2b to learn how to build, sign and broadcast a transaction to the Ropsten account from scratch. This is useful if developing without MetaMask to sign transactions. Introduce `Buffer`, nonces, and `ethereumjs-tx` library. 
   
4. In Activity 3, participants are introduced to Smart Contracts. We use Solidity, Remix and Link to create and deploy an `Ownership` contract to the Link private network. 
   
5. Then, in Activity 4, participants create the front-end of the Collectible Stamps App, and in particular, write-out the `markOwned` and `handleOwn` functions. As a stretch exercise, participants can deploy the `Ownership` contract to Ropsten using Link and interact with that public blockchain. Activities 3 and 4 represent creating a fully functioning web DApp 'the easy way' using the Link platform. 

6. Finally in Activity 5, participants go about creating the same Collectible Stamps App 'the hard way' using the Truffle blockchain development framework. Participants will interact with both a local and the Ropsten public blockchains. 


By the end of the workshop, participants will:
* Be familiar with some of the common blockchain development tools in the marketplace today
* Be able to make transactions on a local and public Ethereum blockchain
* Learn about Smart Contract design and how to address some common security flaws. 
* Create, deploy and interact with a smart contract, both locally and on the public testnet
* Create a web app that interacts with a local and public Ethereum blockchain using both Blockmason Link and Truffle development platforms. 

## Workshop Timing
* 10-10:30am    - Intros, Setup
* 10:30-11am    - Activity 1
* 11-12pm       - Activity 2
* 12-12:30pm    - Lunch, Intro to Activity 3*
* 12:30-1:30pm  - Activity 3
* 1:30pm-2:30pm - Activity 4
* 2:30-2:45     - Break
* 2:45-3:45     - Activity 5
* 3:45-4pm      - Wrap up
