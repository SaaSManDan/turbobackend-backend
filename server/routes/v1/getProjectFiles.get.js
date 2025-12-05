import { verifyProjectAccess } from '../../utils/rlsCheck.js';
import { listProjectFiles } from '../../services/s3Service.js';

export default defineEventHandler(async function(event) {
  try {
    const userId = event.context.auth.userId;
    const query = getQuery(event);
    const { projectId } = query;
    
    // Validate input
    if (!projectId) {
      setResponseStatus(event, 400);
      return {
        success: false,
        error: 'projectId is required'
      };
    }
    
    // RLS check
    await verifyProjectAccess(userId, projectId);
    
    // List files from S3
    const files = await listProjectFiles(projectId);
    
    return {
      success: true,
      files
    };
    
  } catch (error) {
    console.error('Error fetching project files:', error);
    
    const statusCode = error.statusCode || 500;
    setResponseStatus(event, statusCode);
    
    return {
      success: false,
      error: error.message || 'Failed to fetch project files'
    };
  }
});
