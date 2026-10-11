// Locked: the shop's customers and orders. Every pipeline in queries.js runs on a fresh copy.
// An order's items are embedded in it; its customer is referenced by customerId.
module.exports = {
  customers: [
    { _id: 1, name: "Asha", city: "Pune" },
    { _id: 2, name: "Ravi", city: "Delhi" },
    { _id: 3, name: "Meera", city: "Pune" },
    { _id: 4, name: "Kabir", city: "Mumbai" },
  ],
  orders: [
    { _id: 101, customerId: 1, date: "2026-01-05", status: "delivered", items: [{ product: "Keyboard", qty: 1, price: 3499 }, { product: "Mouse", qty: 2, price: 799 }] },
    { _id: 102, customerId: 2, date: "2026-01-09", status: "delivered", items: [{ product: "Yoga Mat", qty: 1, price: 999 }] },
    { _id: 103, customerId: 1, date: "2026-02-11", status: "shipped", items: [{ product: "Coffee Mug", qty: 4, price: 249 }] },
    { _id: 104, customerId: 3, date: "2026-02-14", status: "delivered", items: [{ product: "Headphones", qty: 1, price: 8999 }] },
    { _id: 105, customerId: 4, date: "2026-03-02", status: "cancelled", items: [{ product: "Football", qty: 2, price: 699 }] },
    { _id: 106, customerId: 3, date: "2026-03-20", status: "delivered", items: [{ product: "Mouse", qty: 1, price: 799 }, { product: "Coffee Mug", qty: 2, price: 249 }] },
    { _id: 107, customerId: 2, date: "2026-04-01", status: "shipped", items: [{ product: "Cricket Bat", qty: 1, price: 2499 }] },
    { _id: 108, customerId: 4, date: "2026-04-15", status: "delivered", items: [{ product: "Pressure Cooker", qty: 1, price: 2199 }, { product: "Coffee Mug", qty: 1, price: 249 }] },
  ],
};
