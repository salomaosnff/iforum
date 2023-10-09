import dotenv from 'dotenv';
import path from 'path';

const ROOT = path.resolve(__dirname, '../../..');

const files =
  process.env.NODE_ENV === 'production'
    ? [
      '.env',
      '.env.prod',
      '.env.local',
    ]
    : [
      '.env',
      '.env.dev',
      '.env.local',
    ];

for (const file of files) {
  dotenv.config({
    path: path.resolve(ROOT, file),
    override: true, 
  });
}