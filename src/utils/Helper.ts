import * as crypto from 'crypto';
import { CommonConfig } from 'src/config/CommonConfig';

export const encodeData = (data: any) => {
    const cipher = crypto.createCipher('aes-256-cbc', CommonConfig?.CRYPTO_SECRET_KEY);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

export const decodeData = (encryptedData: any) => {
    const decipher = crypto.createDecipher('aes-256-cbc', CommonConfig?.CRYPTO_SECRET_KEY);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

