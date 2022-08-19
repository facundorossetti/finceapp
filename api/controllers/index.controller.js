const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '180293',
  database: 'firstapi',
  port: '5433'
});

const getUsers = async (req, res) => {
  const response = await pool.query('SELECT * FROM users');
  res.json(response.rows);
}

const deleteUserById = async (req, res) => {
  const response = await pool.query('DELETE FROM users WHERE id = $1', [req.params.id]);
  res.json(`User ${req.params.id} deleted succesfully`);
}

const updateUserById = async (req, res) => {
  const { name, email } = req.body;
  const response = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, req.params.id]);
  res.json(`User ${req.params.id} updated succesfully`);
}

const getUserById = async (req, res) => {
  const response = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
  res.json(response.rows);
}

const createUser = async (req, res) => {
  const { name, email } = req.body;
  const response = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
  res.json({
    message: "User added succesfully",
    body: {
      user: { name, email }
    }
  })
}

module.exports = {
  getUsers,
  createUser,
  deleteUserById,
  updateUserById,
  getUserById
}
