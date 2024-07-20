import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BookDatabaseModule = buildModule("BookDatabaseModule", (m) => {
  //Deploy
  const BookDatabase = m.contract("BookDatabase");
  return { BookDatabase };
});

export default BookDatabaseModule;
