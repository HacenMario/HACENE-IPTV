const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors()); // يسمح لموقعك الأمامي بالاتصال به

app.get('/api', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  try {
    const response = await axios.get(targetUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Proxy server running on port ${PORT}`);
});
