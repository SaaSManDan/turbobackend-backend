import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';

/**
 * Get S3 client instance
 * @returns {S3Client}
 */
function getS3Client() {
  return new S3Client({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  });
}

/**
 * List all files in a project's S3 bucket folder
 * @param {string} projectId - The project ID
 * @returns {Promise<Array>} - Array of file objects with Key and Size
 */
export async function listProjectFiles(projectId) {
  const s3Client = getS3Client();
  const bucketName = process.env.S3_PROJECTS_BUCKET;
  const prefix = `${projectId}/`;
  
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix
    });
    
    const response = await s3Client.send(command);
    
    if (!response.Contents || response.Contents.length === 0) {
      return [];
    }
    
    // Remove the prefix from keys and filter out the folder itself
    return response.Contents
      .filter(function(item) {
        return item.Key !== prefix;
      })
      .map(function(item) {
        return {
          key: item.Key.replace(prefix, ''),
          size: item.Size,
          lastModified: item.LastModified
        };
      });
  } catch (error) {
    console.error('Error listing S3 files:', error);
    throw error;
  }
}

/**
 * Get file content from S3
 * @param {string} projectId - The project ID
 * @param {string} filePath - The file path within the project folder
 * @returns {Promise<string>} - File content as string
 */
export async function getProjectFileContent(projectId, filePath) {
  const s3Client = getS3Client();
  const bucketName = process.env.S3_PROJECTS_BUCKET;
  const key = `${projectId}/${filePath}`;
  
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key
    });
    
    const response = await s3Client.send(command);
    
    // Convert stream to string
    const bodyContents = await streamToString(response.Body);
    
    return bodyContents;
  } catch (error) {
    console.error('Error getting S3 file content:', error);
    throw error;
  }
}

/**
 * Helper function to convert stream to string
 * @param {ReadableStream} stream
 * @returns {Promise<string>}
 */
async function streamToString(stream) {
  const chunks = [];
  
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  
  return Buffer.concat(chunks).toString('utf-8');
}
