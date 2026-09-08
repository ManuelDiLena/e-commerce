require('dotenv').config();

const express = require('express');
const cors = require('cors');

const prisma = require('./prisma');

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
    status: 'ok',
    message: 'E-commerce API is running',
    database: 'connected',
  });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});