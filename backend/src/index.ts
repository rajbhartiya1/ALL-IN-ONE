import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Queue } from 'bullmq';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Set up Redis Queue gracefully
const redisOptions = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  retryStrategy: (times: number) => {
    if (times > 2) {
      console.warn('⚠️  Redis connection failed. Please make sure Docker or Redis is running on port 6379! Queue is disabled temporarily.');
      return null;
    }
    return Math.min(times * 100, 3000);
  },
  maxRetriesPerRequest: null
};

const postQueue = new Queue('postQueue', { connection: redisOptions });

postQueue.on('error', (err) => {
  // Suppress BullMQ errors if Redis is missing to avoid spam
});

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