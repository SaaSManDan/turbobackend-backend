/**
 * Encryption Utilities
 * Handles encryption and decryption of sensitive data like MCP keys
 */

import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

/**
 * Encrypts a plaintext string
 * @param {string} plaintext - The text to encrypt
 * @returns {string} - Encrypted text in format: iv:authTag:encryptedData (hex encoded)
 */
export function encryptKey(plaintext) {
  const encryptionKey = process.env.MCP_ENCRYPTION_KEY;
  
  if (!encryptionKey) {
    throw new Error('MCP_ENCRYPTION_KEY environment variable is not set');
  }
  
  // Convert hex string to buffer
  const key = Buffer.from(encryptionKey, 'hex');
  
  // Generate random IV
  const iv = crypto.randomBytes(IV_LENGTH);
  
  // Create cipher
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  
  // Encrypt
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  // Get auth tag
  const authTag = cipher.getAuthTag();
  
  // Return format: iv:authTag:encryptedData
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

/**
 * Decrypts an encrypted string
 * @param {string} encryptedText - The encrypted text in format: iv:authTag:encryptedData
 * @returns {string} - Decrypted plaintext
 */
export function decryptKey(encryptedText) {
  const encryptionKey = process.env.MCP_ENCRYPTION_KEY;
  
  if (!encryptionKey) {
    throw new Error('MCP_ENCRYPTION_KEY environment variable is not set');
  }
  
  // Convert hex string to buffer
  const key = Buffer.from(encryptionKey, 'hex');
  
  // Split the encrypted text
  const parts = encryptedText.split(':');
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted text format');
  }
  
  const iv = Buffer.from(parts[0], 'hex');
  const authTag = Buffer.from(parts[1], 'hex');
  const encrypted = parts[2];
  
  // Create decipher
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  
  // Decrypt
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}
