pragma solidity =0.6.4;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts-ethereum-package/contracts/Initializable.sol";
import '@openzeppelin/contracts-ethereum-package/contracts/access/Ownable.sol';
import '@openzeppelin/contracts-ethereum-package/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol';
import '@openzeppelin/contracts-ethereum-package/contracts/utils/ReentrancyGuard.sol';

// This is the contract that manages buys and sells
contract TestEPI712 is Initializable, OwnableUpgradeSafe, ReentrancyGuardUpgradeSafe {
    using SafeMath for uint256;

    function initialize() public initializer {
        __Ownable_init();
        __ReentrancyGuard_init();
    }

    function getChainId() internal pure returns (uint256) {
        uint256 chainId;
        assembly { chainId := chainid() }
        return chainId;
    }

    function signas(uint8 v, bytes32 r, bytes32 s) public view returns(address) {
        bytes32 DOMAIN_TYPEHASH = keccak256("EIP712Domain(string name,uint256 chainId,address verifyingContract)");
        bytes32 COLLECTION_TYPEHASH = keccak256("TestCollection(uint256 id,address erc721)");
        string memory name = 'YallaSwap';

        bytes32 domainSeparator = keccak256(abi.encode(
            DOMAIN_TYPEHASH,
            keccak256(bytes(name)),
            getChainId(),
            address(this)
        ));
        bytes32 structHash = keccak256(abi.encode(
            COLLECTION_TYPEHASH,
            1,
            0x165b844857E5Bf5b26c89D9D9e4CB9F0810243Ac
        ));

        bytes32 digest = keccak256(abi.encodePacked(
            "\x19\x01",
            domainSeparator,
            structHash
        ));
        address colores = ecrecover(digest, v, r, s);
        return colores;
    }

    function signas2(uint8 v, bytes32 r, bytes32 s) public view returns(address) {
        bytes32 DOMAIN_TYPEHASH = keccak256("EIP712Domain(string name,uint256 chainId,address verifyingContract)");
        bytes32 COLLECTION_TYPEHASH = keccak256("Collection(uint256 id,address erc721,string name,string description,string url,uint256 fee,address owner)");
        string memory name = 'YallaSwap';

        bytes32 domainSeparator = keccak256(abi.encode(
            DOMAIN_TYPEHASH,
            keccak256(bytes(name)),
            getChainId(),
            address(this)
        ));
        bytes32 structHash = keccak256(abi.encode(
            COLLECTION_TYPEHASH,
            1,
            0x165b844857E5Bf5b26c89D9D9e4CB9F0810243Ac,
            keccak256(bytes('My collection')),
            keccak256(bytes('This is my description')),
            keccak256(bytes('https://test.com')),
            10,
            0x165b844857E5Bf5b26c89D9D9e4CB9F0810243Ac
        ));

        bytes32 digest = keccak256(abi.encodePacked(
            "\x19\x01",
            domainSeparator,
            structHash
        ));
        address colores = ecrecover(digest, v, r, s);
        return colores;
    }

    function signas3(uint8 v, bytes32 r, bytes32 s) public view returns(address) {
        bytes32 DOMAIN_TYPEHASH = keccak256("EIP712Domain(string name,uint256 chainId,address verifyingContract,bytes32 salt)");
        bytes32 COLLECTION_TYPEHASH = keccak256("Collection(uint256 id,address erc721,string name,string description,string url,uint256 fee,address owner)");
        string memory name = 'YallaSwap';

        bytes32 domainSeparator = keccak256(abi.encode(
            DOMAIN_TYPEHASH,
            keccak256(bytes(name)),
            getChainId(),
            address(this),
            0xb926e2f09f9a1a177f65ab4bffb5df165a870492312f5fcac27dbbeddfcf7c95
        ));
        bytes32 structHash = keccak256(abi.encode(
            COLLECTION_TYPEHASH,
            1,
            0x165b844857E5Bf5b26c89D9D9e4CB9F0810243Ac,
            keccak256(bytes('My collection')),
            keccak256(bytes('This is my description')),
            keccak256(bytes('https://test.com')),
            10,
            0x165b844857E5Bf5b26c89D9D9e4CB9F0810243Ac
        ));

        bytes32 digest = keccak256(abi.encodePacked(
            "\x19\x01",
            domainSeparator,
            structHash
        ));
        address colores = ecrecover(digest, v, r, s);
        return colores;
    }

    // A demostration of a signature message with v r s
    function signas4(bytes memory _signedMessage) public view returns(address) {
        bytes32 DOMAIN_TYPEHASH = keccak256("EIP712Domain(string name,uint256 chainId,address verifyingContract,bytes32 salt)");
        bytes32 COLLECTION_TYPEHASH = keccak256("Collection(uint256 id,address erc721,string name,string description,string url,uint256 fee,address owner)");
        string memory name = 'YallaSwap';

        bytes32 domainSeparator = keccak256(abi.encode(
            DOMAIN_TYPEHASH,
            keccak256(bytes(name)),
            getChainId(),
            address(this),
            0xb926e2f09f9a1a177f65ab4bffb5df165a870492312f5fcac27dbbeddfcf7c95
        ));
        bytes32 structHash = keccak256(abi.encode(
            COLLECTION_TYPEHASH,
            1,
            0x165b844857E5Bf5b26c89D9D9e4CB9F0810243Ac,
            keccak256(bytes('My collection')),
            keccak256(bytes('This is my description')),
            keccak256(bytes('https://test.com')),
            10,
            0x165b844857E5Bf5b26c89D9D9e4CB9F0810243Ac
        ));

        bytes32 message = keccak256(abi.encodePacked(
            "\x19\x01",
            domainSeparator,
            structHash
        ));
        bytes32 r;
        bytes32 s;
        uint8 v;
        assembly {
            r := mload(add(_signedMessage, 32))
            s := mload(add(_signedMessage, 64))
            v := byte(0, mload(add(_signedMessage, 96)))
        }
        address colores = ecrecover(message, v, r, s);
        return colores;
    }
}