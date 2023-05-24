const express = require('express');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'favlinks',
  password: 'password',
  port: 5432,
});

const getLinks = (req, res) => {
  pool.query('SELECT * FROM links ORDER BY id ASC', (error, result) => {
    if (error) {
      res.status(500).json({ error: 'Error retrieving links' });
    } else {
      res.status(200).json(result.rows);
    }
  });
};

const createLink = (req, res) => {
  const { title, url } = req.body; // Assuming title and url are provided in the request body

  if (!title || !url) {
    res.status(400).json({ error: 'Title and URL are required' });
    return;
  }

  pool.query(
    'INSERT INTO links (title, url) VALUES ($1, $2)',
    [title, url],
    (error) => {
      if (error) {
        res.status(500).json({ error: 'Error creating link' });
      } else {
        res.status(201).json({ message: 'Link created successfully' });
      }
    }
  );
};

app.use(express.json());

app.get('/links', getLinks);
app.post('/links', createLink);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

