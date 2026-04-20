import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Queue } from 'bullmq';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Set up Redis Queue
const redisOptions = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: parseInt(process.env.REDIS_PORT || '6379')
};
const postQueue = new Queue('postQueue', { connection: redisOptions });

app.get('/', (req, res) => {
  res.send('Social Media API is running');
});

app.post('/api/posts', async (req, res) => {
  const { userId, content, platforms } = req.body;
  // TODO: Save to database
  
  // Add job to BullMQ
  for (const platform of platforms) {
     await postQueue.add('publishPost', { userId, content, platform });
  }

  res.status(201).json({ message: 'Post queued for publishing!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});