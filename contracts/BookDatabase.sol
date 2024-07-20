// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

contract BookDatabase {
    
    struct Book {
        string title;
        uint16 year;
        uint8 pages;
        string author;
    }

    uint32 private nextId = 0;
    mapping(uint32 => Book) public books;
    address private immutable owner;
    uint256 public count;

    constructor() {
        owner = msg.sender;
    }

    function compare(string memory str1, string memory str2)
        private
        pure
        returns (bool)
    {
        bytes memory arrA = bytes(str1);
        bytes memory arrB = bytes(str2);

        return arrA.length == arrB.length && keccak256(arrA) == keccak256(arrB);
    }

    function addBook(Book memory newBook) public {
        nextId++;
        books[nextId] = newBook;
        count++;
    }

    function editBook(uint32 id, Book memory newBook) public {
        Book memory oldbook = books[id];
        if (
            !compare(oldbook.title, newBook.title) &&
            !compare(oldbook.title, "")
        ) {
            books[id].title = newBook.title;
        }
        if (oldbook.year != newBook.year && newBook.year > 0) {
            books[id].year = newBook.year;
        }
        if (oldbook.pages != newBook.pages && newBook.pages > 0) {
            books[id].pages = newBook.pages;
        }
        if (
            !compare(oldbook.author, newBook.author) &&
            !compare(oldbook.author, "")
        ) {
            books[id].author = newBook.author;
        }
    }

    function removeBook(uint32 id) public restricted {
        if(books[id].year > 0){
            delete books[id];
            count--;
        }
    }

    modifier restricted() {
        require(owner == msg.sender, "You don't have permission.");
        _;
    }
}
