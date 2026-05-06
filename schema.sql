-- SQL Schema for PostgreSQL

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    text TEXT,
    file_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional Native INSERT example
-- INSERT INTO messages (text, file_url, created_at) VALUES ('Hello World!', '/uploads/sample.png', NOW());
