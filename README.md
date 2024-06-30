# Book Database Smart Contract

This Solidity smart contract (`BookDatabase`) manages a collection of books on the blockchain. It allows users to add, edit, and remove books from the database. Each book is represented by its title, publication year, number of pages, and author.

## Features

- **Add Book**: Add a new book to the database.
- **Edit Book**: Modify the details of an existing book.
- **Remove Book**: Delete a book from the database.
- **Ownership**: Only the contract owner can modify the database.

## Contract Details

- **Solidity Version**: ^0.8.12
- **License**: MIT

## Functions

#### `constructor()`
- Initializes the contract and sets the owner to the deployer's address.
  
### `addBook`

```solidity
function addBook(Book memory newBook) public
```
- Adds a new book to the database.

### `editBook`

```solidity
function editBook(uint32 id, Book memory newBook) public
```
- Edits the details of an existing book identified by `id`.

### `removeBook`

```solidity
function removeBook(uint32 id) public restricted
```
- Removes the book with the given `id` from the database.

## Modifiers

### `restricted`

```solidity
modifier restricted()
```
- Restricts access to functions only to the owner of the contract.

## Usage
To interact with this contract:
1. Deploy it on a supported Ethereum network.
2. Use a compatible Ethereum wallet (e.g., MetaMask) to play the game by calling the `play` function with the desired choice and the correct amount of ether.
3. Alternatively, you can use [Remix](https://remix.ethereum.org/) — an online Solidity IDE — to deploy and interact with the contract directly from your web browser.

## Acknowledgments
- This contract was inspired by the need for decentralized book management systems.
