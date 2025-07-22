const express = require('express');

const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

app.post('/getAccessToken', async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET, // ✅ Use : not =
        code: code,
      },
      {
        headers: {
          accept: 'application/json',
        },
      }
    );

    console.log('GitHub response:', response.data);


    const accessToken = response.data.access_token;
    res.json({ access_token: accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get access token' });
  }
});

app.post('/createFile', async (req, res) => {
  const { access_token, owner, repo, path, content, message } = req.body;

  const response = await axios.put(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      message,
      content: Buffer.from(content).toString('base64'),
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  res.json(response.data);
});

// ✅ NEW LYZR ROUTE
// ---------------------------
app.post('/upgradeCode', async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post(
      'https://agent-prod.studio.lyzr.ai/v3/inference/chat/',
      {
        user_id: "rohanvishwa0852@gmail.com",
        agent_id: "687df0c3fb3a642b3ba36472",
        session_id: "687df0c3fb3a642b3ba36472-ufkl4iqe68",
        message: code,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.LYZR_API_KEY, // ✅ secure
        },
      }
    );

    res.json({ improvedCode: response.data.response });
  } catch (error) {
    console.error('Lyzr AI upgrade failed:', error.response?.data || error.message);
    res.status(500).json({ error: 'Lyzr AI upgrade failed' });
  }
});


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
