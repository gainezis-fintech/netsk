import { config } from 'dotenv';
config();

import '@/ai/flows/fraud-detection.ts';
import '@/ai/flows/generate-password.ts';
import '@/ai/flows/get-crypto-price.ts';
import '@/ai/tools/cmc-tool.ts';
