import { verifyProjectAccess } from '../../utils/rlsCheck.js';
import { getProjectFileContent } from '../../services/s3Service.js';

export default defineEventHandler(async function(event) {
  try {
    const userId = event.context.auth.userId;
    const query = getQuery(event);
    const { projectId, filePath } = query;
    
    // Validate input
    if (!projectId || !filePath) {
      setResponseStatus(event, 400);
      return {
        success: false,
        error: 'projectId and filePath are required'
      };
    }
    
    // RLS check
    await verifyProjectAccess(userId, projectId);
    
    // Get file content from S3
    const content = await getProjectFileContent(projectId, filePath);
    
    return {
      success: true,
      content,
      filePath
    };
    
  } catch (error) {
    console.error('Error fetching project file content:', error);
    
    const statusCode = error.statusCode || 500;
    setResponseStatus(event, statusCode);
    
    return {
      success: false,
      error: error.message || 'Failed to fetch project file content'
    };
  }
});
