# Smart Contract Security Considerations
## Goal
In this activity, we will discuss some of the most common smart contract security pitfalls and how to address them.

## Exercise
This activity will require you to use EthFiddle (ethfiddle.com) to identify security flaws in smart contracts, and learn how to mitigate those issues.

## Setup
> This discussion will reference the following Solidity documentation. **Read through this in detail on your own as it contains several helpful security tips!**
>https://solidity.readthedocs.io/en/develop/security-considerations.html

### Private information and Randomness
> It is worth reiterating that **everything** you use in a smart contract is publicly visible, even variables marked `private`. Everything the contract sees, the public sees.

> When using a blockhash, timestamp or otherm miner-defined value for randomness, keep in mind a miner has a choice of whether or not to publish a block, and thus to potentially cheat a block. 

### Re-Entrancy
> A contract receiving Ether can call back into the initiating contract before the transaction is completed, meaning the initiating contract could be interrupted with multiple `withdraw()` calls being before the balance is updated. For example:
```
    pragma solidity 0.4.18;

// THIS CONTRACT CONTAINS A BUG - DO NOT USE
contract Fund {
    
    /// Mapping of ether shares of the contract.
    mapping(address => uint) shares;
    
    /// Withdraw your share.
    function withdraw() public {
        if (msg.sender.send(shares[msg.sender]))
            shares[msg.sender] = 0;
    }
}
```
Here, the `withdraw()` function could be called multiple times before `msg.sender.send(shares[msg.sender])` completes and `shares[msg.sender]` is set to 0. However in this case, the `.send()` function inherently sets the gas limit at 2300 which is usually enough to create just one event and prevent nested `withdraw()` calls from malicious code from being made.

However, using `address.call.value(...)` function allows you to set the gas limit which could allow for multiple `withdraw()` function calls:
```
    function withdraw() public {
        bool success = msg.sender.call.value(shares[msg.sender])("");
        if (success)
            shares[msg.sender] = 0;
    }
```

> **Best Practice** - use the `Checks-Effects-Interactions` pattern which:
* Check - who called the function, are arguments in range, does their account have enough Ether, etc..
* Effects - changes to the state variables
* Interactions - any interactions with other contracts should be the very last step in any function.

> Exercise - refactor the code above to follow the `Checks-Effects-Interactions` pattern.
  
Here's an example solution:
```
    function withdraw() public {
        uint share = shares[msg.sender];  // Checks the sender's account
        shares[msg.sender] = 0;  // Effects on the 'shares' variable
        msg.sender.transfer(share);  // This is the actual Interaction with the contract, done last.
    }
```

### Underflows / Overflows

>Go to <https://ethfiddle.com/> and add the following code:
```
pragma solidity 0.4.18;

contract OverflowUnderFlowExample {
    uint public myCurrentAccountBalance = 10;
    uint public myDreamAccountBalance = 2**256-1;
    
    function buySomething(uint _cost) public {
        myCurrentAccountBalance -= _cost;
    }
    
    function receivePayment(uint _payment) public {
        myDreamAccountBalance += _payment;
    }
}
```
> Run _Compile_ and then hit _Deploy_. This will prompt you for a wallet address to select. Keep the default and hit _Deploy_. 

![EthFiddle deploy contract](images/EthFiddle_deploy_contract.png)

You will then have the ability to call the public variables and functions.
![EthFiddle functions call](images/EthFiddle_functions.png)

> First call the `myCurrentAccountBalance` and `myDreamAccountBalance` to check the responses are `10` and `255` respectively. 

> Then call `buySomething()` and when prompted, enter the value of 11. Call `myCurrentAccountBalance()` again. Is the response what you expected?

> Similarly, call `receivePayment()` and when prompted, enter the value of 10. Call `myDreamAccountBalance()` again. Is the response what you expected?

 Solidity's integer types are not actually integers - they resemble integers when the values are small, but behave differently if the numbers are large. 

For example, an `uint8` variable type in Solidity is 8 bits so the largest binary value it can hold is `11111111` or 255 in decimal. Thus if you add 1 to this, the value resets back to `00000000`. This is an example of an **overflow**. 
```
    uint8(255) + uint8(1) == 0
```
>The opposite is an **underflow** and in this case, an attacker might be able to spend more tokens than they have!
```
    uint8(0) - uint8(1) == 255  // unsigned integers cannot be negative
```
> **Best Practice** - use a library like SafeMath (<https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/math/SafeMath.sol>) to ensure math operations account for overflows/underflows and revert on error.

> Copy the following code into EthFiddle and go through the same exercise as above and see what happens when you try to over or under spend. 
```
pragma solidity ^0.4.18;
/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {

  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
}

contract OverflowUnderFlowExample {
    using SafeMath for uint;
    uint public myCurrentAccountBalance = 10;
    uint public myDreamAccountBalance = 2**256-1;
    
    function buySomething(uint _cost) public {
        myCurrentAccountBalance = myCurrentAccountBalance.sub(_cost);
    }
    
    function receivePayment(uint _payment) public {
        myDreamAccountBalance = myDreamAccountBalance.add(_payment);
    }
}
```

### Take Compiler Warnings Seriously!
> **Even if you do not think that this particular warning has security implications, there might be another issue buried beneath it. Any compiler warning we issue can be silenced by slight changes to the code.**
