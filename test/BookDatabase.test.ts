import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("BookDatabase", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const BookDatabase = await hre.ethers.getContractFactory("BookDatabase");
    const bookDatabase = await BookDatabase.deploy();

    return { bookDatabase, owner, otherAccount };
  }

  it("Should count = 0", async function () {
    const { bookDatabase, owner, otherAccount } = await loadFixture(deployFixture);
    const count = await bookDatabase.count();
    expect(count).to.equal(0);
  });

  it("Should add book", async function () {
    const { bookDatabase, owner, otherAccount } = await loadFixture(deployFixture);
    await bookDatabase.addBook({ title: "New Book", year: 2023, pages: 10, author: "Eu" });
    const count = await bookDatabase.count();
    expect(count).to.equal(1);
  });

  it("Should edit book", async function () {
    const { bookDatabase, owner, otherAccount } = await loadFixture(deployFixture);
    const updatedBook = { title: "New Book 2.0", year: 2023, pages: 10, author: "Eu" };
    await bookDatabase.addBook({ title: "New Book", year: 2023, pages: 10, author: "Eu" });
    await bookDatabase.editBook(1, updatedBook);
    const book = await bookDatabase.books(1);
    expect(book.title).to.equal(updatedBook.title);
  });

  it("Should remove book", async function () {
    const { bookDatabase, owner, otherAccount } = await loadFixture(deployFixture);
    await bookDatabase.addBook({ title: "New Book", year: 2023, pages: 10, author: "Eu" });
    await bookDatabase.removeBook(1);
    const count = await bookDatabase.count();
    expect(count).to.equal(0);
  });

  it("Should NOT remove book", async function () {
    const { bookDatabase, owner, otherAccount } = await loadFixture(deployFixture);
    const instance = bookDatabase.connect(otherAccount);
    await expect(instance.removeBook(1)).to
      .be.revertedWith("You don't have permission.");
  });
});
