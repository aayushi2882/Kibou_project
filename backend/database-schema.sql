-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Companies Table
CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255),
  industry VARCHAR(255),
  description TEXT,
  logo_url TEXT
);

-- Tenders Table
CREATE TABLE tenders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  description TEXT,
  budget NUMERIC,
  deadline DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Proposals Table
CREATE TABLE proposals (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  tender_id INTEGER REFERENCES tenders(id) ON DELETE CASCADE,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
