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

const updateLink = (req, res) => {
  const { id, title, url } = req.body; // Assuming id, title, and url are provided in the request body

  if (!id || !title || !url) {
    res.status(400).json({ error: 'ID, title, and URL are required' });
    return;
  }

  pool.query(
    'UPDATE links SET title = $1, url = $2 WHERE id = $3',
    [title, url, id],
    (error) => {
      if (error) {
        res.status(500).json({ error: 'Error updating link' });
      } else {
        res.status(200).json({ message: 'Link updated successfully' });
      }
    }
  );
};

const deleteLink = (req, res) => {
  const id = req.params.id; // Assuming the link ID is passed as a route parameter

  pool.query('DELETE FROM links WHERE id = $1', [id], (error) => {
    if (error) {
      res.status(500).json({ error: 'Error deleting link' });
    } else {
      res.status(200).json({ message: 'Link deleted successfully' });
    }
  });
};

app.use(express.json());

app.get('/links', getLinks);
app.post('/links', createLink);
app.put('/links', updateLink);
app.delete('/links/:id', deleteLink);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
