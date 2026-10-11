// Locked: 8 books someone is trying to save. Your schema decides which ones are allowed in.
module.exports = [
  {
    label: "A perfect book (with a little mess to clean up)",
    doc: {
      title: "  Wings of Fire  ",
      author: "A.P.J. Abdul Kalam",
      isbn: "9788173711466",
      genre: "Non-Fiction",
      price: 250,
      pages: 180,
      publishedYear: 1999,
      tags: ["biography", "india"],
      secretNote: "not in the schema",
    },
  },
  { label: "No title, no author", doc: { isbn: "9780261103344", genre: "fantasy", price: 399 } },
  { label: "A broken ISBN and a negative price", doc: { title: "Dune", author: "Frank Herbert", isbn: "12345", genre: "science", price: -5 } },
  { label: "A genre the shop doesn't stock", doc: { title: "Easy Curries", author: "Asha Rao", isbn: "9781234567897", genre: "cookbook", price: 499 } },
  { label: "Half a page", doc: { title: "Tiny Tales", author: "Ravi K", isbn: "9781111111111", genre: "fiction", price: 99, pages: 12.5 } },
  { label: "Published in the future", doc: { title: "Time Travel 101", author: "Meera S", isbn: "9782222222222", genre: "science", price: 450, publishedYear: 2999 } },
  { label: "Too many tags", doc: { title: "Sapiens", author: "Yuval Noah Harari", isbn: "9780099590088", genre: "history", price: 699, tags: ["a", "b", "c", "d", "e", "f"] } },
  { label: "The price written as text", doc: { title: "1984", author: "George Orwell", isbn: "9780451524935", genre: "fiction", price: "299" } },
];
