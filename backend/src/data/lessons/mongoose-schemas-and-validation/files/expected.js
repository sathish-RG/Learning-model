// Hidden: what should happen to each sample. `errors` maps each failing field to its message.
module.exports = {
  "A perfect book (with a little mess to clean up)": {
    errors: {},
    values: { title: "Wings of Fire", genre: "non-fiction", inStock: true, price: 250 },
    absent: ["secretNote"],
  },
  "No title, no author": { errors: { title: "A book needs a title", author: "Who wrote it?" } },
  "A broken ISBN and a negative price": { errors: { isbn: "ISBN must be exactly 13 digits", price: "Price can't be negative" } },
  "A genre the shop doesn't stock": { errors: { genre: "cookbook is not a genre we stock" } },
  "Half a page": { errors: { pages: "Pages must be a whole number" } },
  "Published in the future": { errors: { publishedYear: "Published year can't be in the future" } },
  "Too many tags": { errors: { tags: "A book can have at most 5 tags" } },
  "The price written as text": { errors: {}, values: { price: 299 } },
};
