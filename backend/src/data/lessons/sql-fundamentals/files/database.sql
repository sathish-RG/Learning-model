-- Locked: the library's database. Every query in queries.sql runs on a fresh copy of it.
CREATE TABLE books (
  id       INTEGER PRIMARY KEY,
  title    TEXT    NOT NULL,
  author   TEXT    NOT NULL,
  genre    TEXT    NOT NULL,
  year     INTEGER NOT NULL,
  pages    INTEGER NOT NULL,
  price    REAL    NOT NULL,  -- in rupees
  in_stock INTEGER NOT NULL   -- 1 = yes, 0 = no
);

INSERT INTO books (id, title, author, genre, year, pages, price, in_stock) VALUES
  (1,  'The Hobbit',              'J.R.R. Tolkien',     'Fantasy',         1937, 310, 399, 1),
  (2,  '1984',                    'George Orwell',      'Dystopia',        1949, 328, 299, 1),
  (3,  'Animal Farm',             'George Orwell',      'Dystopia',        1945, 112, 199, 0),
  (4,  'Pride and Prejudice',     'Jane Austen',        'Romance',         1813, 432, 249, 1),
  (5,  'The Alchemist',           'Paulo Coelho',       'Fiction',         1988, 208, 350, 1),
  (6,  'Dune',                    'Frank Herbert',      'Science Fiction', 1965, 612, 599, 1),
  (7,  'Sapiens',                 'Yuval Noah Harari',  'History',         2011, 498, 699, 1),
  (8,  'The Martian',             'Andy Weir',          'Science Fiction', 2011, 369, 450, 0),
  (9,  'Wings of Fire',           'A.P.J. Abdul Kalam', 'Biography',       1999, 180, 250, 1),
  (10, 'The God of Small Things', 'Arundhati Roy',      'Fiction',         1997, 340, 399, 1),
  (11, 'Brave New World',         'Aldous Huxley',      'Dystopia',        1932, 311, 320, 1),
  (12, 'Project Hail Mary',       'Andy Weir',          'Science Fiction', 2021, 476, 650, 1);
