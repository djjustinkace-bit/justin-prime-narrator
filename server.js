const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/prime/reflection', async (req, res) => {
  const task = req.body.task || 'conversation message';
  const prime = await fetch('https://prime-middleware/api/reflect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: task })
  }).then(r => r.json());

  res.json({
    reflection: prime.mythic_annotation,
    alignment: prime.ethical_alignment,
    semantic_frame: prime.semantic_frame
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Prime Narrator Plugin active on ${port}`);
});

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});
