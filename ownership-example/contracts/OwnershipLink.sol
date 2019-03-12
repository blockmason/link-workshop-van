pragma solidity 0.5.4;

contract OwnershipLink {
	address public authority;
    address[8] public ownerOf;

    constructor() public {
        authority = msg.sender;
    }

	function setOwnership(uint stampId, address owner) public returns (bool) {
		require(msg.sender == authority);
        require(stampId >= 0 && stampId <=7);
		ownerOf[stampId] = owner;
		return true;
	}

    function getOwners() public view returns (address[8] memory) {
		return ownerOf;
	}
}