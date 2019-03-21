pragma solidity 0.5.4;

contract Ownership {
    address[8] public ownerOf;

    constructor() public {
        // Default constructor
    }

    function setOwnership(<pass some arguments here>) public returns (bool) {
        // Set ownership
        return true;
    }

    function getOwners() public view returns (address[8] memory) {
		return ownerOf;
    }
}