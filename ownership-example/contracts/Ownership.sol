pragma solidity 0.5.4;

contract Ownership {
	address[8] public ownerOf;

	function setOwnership(uint stampId) public {
		require(stampId >= 0 && stampId <=7);
		ownerOf[stampId] = msg.sender;
	}

	function getOwners() public view returns (address[8] memory) {
		return ownerOf;
	}
}