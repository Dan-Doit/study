# 암호와 알고리즘 사용



## aes 알고리즘 (암복호화)

```typescript
import { createCipheriv, randomBytes } from 'crypto';
import { createDecipheriv } from 'crypto';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const environment: string = process.env.NODE_ENV || 'development';
const envPath = `.env.${environment}`;
let data = process.env;
data = dotenv.parse(fs.readFileSync(envPath));

export const encrypt = async (text: string) => {
  const algorithm = 'aes-128-ctr';
  const secretKey = randomBytes(16);
  const iv = randomBytes(16);
  const cipher = createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  };
};

export const decrypt = async (hash: string, iv: string) => {
  const algorithm = 'aes-256-ctr';
  const secretKey = data.SECRET_KEY_CRYPTO_32;

  const decipher = createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(iv, 'hex'),
  );
  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash, 'hex')),
    decipher.final(),
  ]);
  return decrpyted.toString();
};

```



## ECB 알고리즘(암복호화)

