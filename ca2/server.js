const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let users = [
  { email: 'alice@example.com', password: 'alice123' },
  { email: 'bob@example.com', password: 'bob123' },
  { email: 'charlie@example.com', password: 'charlie123' },
];

app.put('/user', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const userIndex = users.findIndex(user => user.email === email);
  if (userIndex !== -1) {
    users[userIndex].password = password;
    return res.json({ message: 'User password updated successfully.' });
  } else {
    return res.status(404).json({ error: 'Email not found.' });
  }
});

app.delete('/user', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  const userIndex = users.findIndex(user => user.email === email);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    return res.json({ message: 'User deleted successfully.' });
  } else {
    return res.status(404).json({ error: 'Email not found.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
