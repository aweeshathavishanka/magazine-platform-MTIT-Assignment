import { Request, Response } from 'express';
import Media from '../models/Media';
import { v4 as uuidv4 } from 'uuid';

const generateTimestamp = () => new Date().toISOString();

const sendSuccessResponse = (res: Response, statusCode: number, message: string, data: any = null) => {
  const response: any = {
    success: true,
    message,
    statusCode
  };
  if (data) {
    response.data = data;
  }
  return res.status(statusCode).json(response);
};

const sendErrorResponse = (res: Response, statusCode: number, message: string) => {
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message,
    service: 'media-service',
    timestamp: generateTimestamp()
  });
};

export const uploadMedia = async (req: Request, res: Response) => {
  try {
    const { file_name, file_type, file_size, uploaded_by, url } = req.body;
    
    if (!file_name || !file_type || !file_size || !uploaded_by || !url) {
      return sendErrorResponse(res, 400, 'Invalid media data');
    }
    
    const newMedia = new Media({
      media_id: uuidv4(),
      file_name,
      file_type,
      file_size,
      uploaded_by,
      url
    });

    await newMedia.save();

    return sendSuccessResponse(res, 201, 'Media uploaded successfully', {
      media_id: newMedia.media_id,
      file_name: newMedia.file_name,
      url: newMedia.url
    });

  } catch (err) {
    return sendErrorResponse(res, 500, 'Internal server error');
  }
};

export const getAllMedia = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const uploaded_by = req.query.uploaded_by as string | undefined;

    const query: any = {};
    if (uploaded_by) {
      query.uploaded_by = uploaded_by;
    }

    const skip = (page - 1) * limit;
    
    const mediaList = await Media.find(query).skip(skip).limit(limit).select('media_id file_name url -_id');

    return sendSuccessResponse(res, 200, 'Media fetched successfully', mediaList);

  } catch (err) {
    return sendErrorResponse(res, 500, 'Failed to fetch media');
  }
};

export const getMediaById = async (req: Request, res: Response) => {
  try {
    const media = await Media.findOne({ media_id: req.params.id }).select('-_id -createdAt -updatedAt');
    
    if (!media) {
      return sendErrorResponse(res, 404, 'Media not found');
    }

    return sendSuccessResponse(res, 200, 'Media fetched successfully', media);
  } catch (err) {
    return sendErrorResponse(res, 500, 'Failed to fetch media');
  }
};

export const updateMedia = async (req: Request, res: Response) => {
  try {
    const { file_name } = req.body;
    
    if (!file_name) {
      return sendErrorResponse(res, 400, 'Invalid update data');
    }
    
    // Original implementation logic had only validation, so I will keep it identical or add a simple stub to satisfy TS compiler.
    // Assuming placeholder just returns 200
    return sendSuccessResponse(res, 200, 'Media updated placeholder');
  } catch (err) {
    return sendErrorResponse(res, 500, 'Internal server error');
  }
};