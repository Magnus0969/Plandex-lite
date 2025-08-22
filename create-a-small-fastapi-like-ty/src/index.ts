import express from 'express';
import path from 'path';
import http from 'http';

const app = express();
const server = new http.Server(app);
const __dirname = path.resolve();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to return 'hello world!'
app.get('/hello', (req, res) => {
  res.send('hello world!');
});

// Route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});