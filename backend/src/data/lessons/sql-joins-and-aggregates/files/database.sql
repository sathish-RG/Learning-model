-- Locked: a small shop's database. Every query in queries.sql runs on a fresh copy of it.
CREATE TABLE customers (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL
);

CREATE TABLE orders (
  id          INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),  -- a foreign key: whose order it is
  order_date  TEXT    NOT NULL,                           -- 'YYYY-MM-DD'
  total       REAL    NOT NULL,                           -- in rupees
  status      TEXT    NOT NULL                            -- 'shipped', 'delivered' or 'cancelled'
);

INSERT INTO customers (id, name, city) VALUES
  (1, 'Asha',  'Pune'),
  (2, 'Ravi',  'Delhi'),
  (3, 'Meera', 'Pune'),
  (4, 'Kabir', 'Mumbai'),
  (5, 'Zoya',  'Delhi');

INSERT INTO orders (id, customer_id, order_date, total, status) VALUES
  (1,  1, '2026-01-05', 1200, 'delivered'),
  (2,  2, '2026-01-09',  450, 'delivered'),
  (3,  1, '2026-02-11',  800, 'delivered'),
  (4,  3, '2026-02-14', 2500, 'delivered'),
  (5,  4, '2026-03-02',  300, 'cancelled'),
  (6,  1, '2026-03-20',  650, 'shipped'),
  (7,  3, '2026-03-28',  900, 'delivered'),
  (8,  2, '2026-04-01', 1500, 'shipped'),
  (9,  4, '2026-04-15',  700, 'delivered'),
  (10, 3, '2026-04-18',  400, 'cancelled');
