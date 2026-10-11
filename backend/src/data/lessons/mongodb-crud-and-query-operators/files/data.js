// Locked: the shop's products collection. Every query in queries.js runs on a fresh copy.
module.exports = {
  products: [
    { _id: 1, name: "Wireless Mouse", category: "electronics", price: 799, stock: 25, rating: 4.3, tags: ["computer", "wireless"] },
    { _id: 2, name: "Mechanical Keyboard", category: "electronics", price: 3499, stock: 8, rating: 4.7, tags: ["computer", "gaming"] },
    { _id: 3, name: "USB-C Cable", category: "electronics", price: 299, stock: 0, rating: 4.0, tags: ["cable"] },
    { _id: 4, name: "Noise-Cancelling Headphones", category: "electronics", price: 8999, stock: 5, rating: 4.6, tags: ["audio", "wireless"] },
    { _id: 5, name: "Yoga Mat", category: "sports", price: 999, stock: 40, rating: 4.4, tags: ["fitness"] },
    { _id: 6, name: "Cricket Bat", category: "sports", price: 2499, stock: 12, rating: 4.5, tags: ["cricket"] },
    { _id: 7, name: "Football", category: "sports", price: 699, stock: 0, rating: 4.1, tags: ["football"] },
    { _id: 8, name: "Steel Water Bottle", category: "kitchen", price: 449, stock: 60, rating: 4.2, tags: ["eco"] },
    { _id: 9, name: "Pressure Cooker", category: "kitchen", price: 2199, stock: 15, rating: 4.8, tags: ["cooking"] },
    { _id: 10, name: "Coffee Mug", category: "kitchen", price: 249, stock: 100, rating: 3.9, tags: ["coffee"] },
    { _id: 11, name: "Desk Lamp", category: "home", price: 1299, stock: 7, rating: 4.0, tags: ["light"] },
    { _id: 12, name: "Bluetooth Speaker", category: "electronics", price: 2999, stock: 0, rating: 4.4, tags: ["audio", "wireless"] },
  ],
};
