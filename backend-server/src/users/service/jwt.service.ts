// src/jwt/jwt.service.ts
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { raw } from '@nestjs/mongoose';
@Injectable()
export class JwtService {
  private privateKey2: string;
  private publicKey2: string;
  private algorithm = 'aes-256-cbc';
  private iv: Buffer;
  private key: Buffer;
  constructor() {
    // Read your private key from a file or use your own method to load the key
    // this.privateKey = fs.readFileSync('private_key.pem', 'utf8')

    //seconnd pair
    this.privateKey2 = fs.readFileSync(
      'D:/Projects/NestJs/testing/learning-place/Keys2/private_key.pem',
      'utf8',
    );
    this.publicKey2 = fs.readFileSync(
      'D:/Projects/NestJs/testing/learning-place/Keys2/public_key.pem',
      'utf8',
    );

    //crypt iv

    const rawkey = fs.readFileSync(
      'D:/Projects/NestJs/testing/learning-place/Keys/encryptionKey.txt',
      'utf8',
    );
    const rawIv = fs.readFileSync(
      'D:/Projects/NestJs/testing/learning-place/Keys/encryptionIV.txt',
      'utf8',
    );

    this.key = Buffer.from(rawkey, 'hex');
    // this.key = rawkey;
    
    this.iv = Buffer.from(rawIv, 'hex');
    // this.iv = crypto.randomBytes(16);
    
  }
  encryptData(data: string): string {
    try {
      const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);

      let encrypted = cipher.update(data, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      return encrypted;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  decryptData(encryptedData: string): string {
   
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);

    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');

    decrypted += decipher.final('utf8');

    return decrypted;
  }

  signToken(payload: any): string {
    let encryrptedData = this.encryptData(JSON.stringify(payload));

    let token = jwt.sign(encryrptedData, this.privateKey2, {
      algorithm: 'RS256',
    });
    // return encryrptedData;
    return token;
  }

  verifyToken(token: string) {
    const payload = jwt.verify(token, this.publicKey2, {
      algorithms: ['RS256'],
    });

    if (typeof payload == 'string') {
      const value = this.decryptData(payload);
    
      return JSON.parse(value);
    } else {
      return UnauthorizedException;
    }
  }
}
