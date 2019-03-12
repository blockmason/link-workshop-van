## Running this DApp

### Install dependencies
> Install project dependencies with:
```
npm install
```
### Build and deploy Ownership contract to Ropsten using Truffle
Use these steps when running the DApp without Link to demonstrate the cumbersome process of having to use `web3.js` and MetaMask. 

> Log into your MetaMask account in Chrome and copy your seed phrase

> Add your seed phrase to a `MNEMONIC` environment variable locally.

> Build your truffle project with:
```
truffle compile
```

> Then, deploy your truffle project to Ropsten with:
```
truffle migrate --network ropsten
```
> Check `index.html` to ensure that the `app.js` script is active, NOT `app-link.js`. 
```
<!-- Use the following script without Link: -->
<script src="js/app.js"></script>
    
<!-- Use the following script with Link: -->
<!-- <script src="js/app-link.js"></script> -->
```

>Finally, run the DApp with lite-server:
```
npm run dev
```
The lite-server config is in `bs-config.json`. The DApp runs on `localhost:3000` by default. 

### Run DApp using Link

> Check `index.html` to ensure that the `app-link.js` script is active, NOT `app.js`. 
```
<!-- Use the following script without Link: -->
<!-- script src="js/app.js"></script> -->
    
<!-- Use the following script with Link: -->
<script src="js/app-link.js"></script>
```

> Run the DApp with lite-server:
```
npm run dev
```

Link API and documentation used for this DApp can be found here: https://mason.link/apis/eouef261A-o5CjB_GTIItaJX3n7QR9lA2Q26V97MQe8/documentation

