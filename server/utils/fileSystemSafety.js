/**
 * File System Safety Utilities
 * Prevents directory traversal and validates file operations
 */

import path from 'path';
import fs from 'fs/promises';

export function validatePath(targetPath, baseDir) {
  // Resolve both paths to absolute paths
  const resolvedBase = path.resolve(baseDir);
  const resolvedTarget = path.resolve(baseDir, targetPath);
  
  // Check if the resolved target path starts with the base directory
  if (!resolvedTarget.startsWith(resolvedBase)) {
    throw new Error('Directory traversal attempt detected');
  }
  
  return resolvedTarget;
}

export async function safeWriteFile(filePath, content, baseDir) {
  try {
    // Validate the path
    const safePath = validatePath(filePath, baseDir);
    
    // Ensure parent directory exists
    const parentDir = path.dirname(safePath);
    await fs.mkdir(parentDir, { recursive: true });
    
    // Write the file
    await fs.writeFile(safePath, content, 'utf8');
    
    return safePath;
  } catch (error) {
    console.error('Safe write file error:', error);
    throw error;
  }
}

export async function safeCreateDirectory(dirPath, baseDir) {
  try {
    // Validate the path
    const safePath = validatePath(dirPath, baseDir);
    
    // Create the directory
    await fs.mkdir(safePath, { recursive: true });
    
    return safePath;
  } catch (error) {
    console.error('Safe create directory error:', error);
    throw error;
  }
}
