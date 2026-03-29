import { Request, Response } from "express";
import Comment from "../models/Comment";
import { successResponse, errorResponse } from "../utils/response";
import { v4 as uuidv4 } from "uuid";

const buildCommentTree = (comments: any[], parentId: string | null = null): any[] => {
  return comments
    .filter(c => c.parent_comment_id === parentId)
    .map(comment => ({
      ...comment.toObject(),
      replies: buildCommentTree(comments, comment.comment_id)
    }));
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const { article_id, user_id, content, parent_comment_id } = req.body;

    if (!article_id || !user_id || !content) {
      return errorResponse(res, "Invalid comment data", 400, 400);
    }

    const comment = await Comment.create({
      article_id,
      user_id,
      content,
      parent_comment_id: parent_comment_id || null
    });

    successResponse(res, "Comment created successfully", {
      comment_id: comment.comment_id,
      article_id: comment.article_id,
      content: comment.content
    }, 201);
  } catch (err) {
    errorResponse(res, "Failed to create comment", 500);
  }
};

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, article_id } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const filter: any = {};
    if (article_id) filter.article_id = article_id;

    const comments = await Comment.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Comment.countDocuments(filter);

    successResponse(res, "Comments fetched successfully", {
      comments,
      pagination: { page: Number(page), limit: Number(limit), total }
    });
  } catch (err) {
    errorResponse(res, "Failed to fetch comments", 500);
  }
};

export const getCommentById = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findOne({ comment_id: req.params.id });
    if (!comment) return errorResponse(res, "Comment not found", 404, 404);

    successResponse(res, "Comment fetched successfully", comment);
  } catch (err) {
    errorResponse(res, "Failed to fetch comment", 500);
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    if (!content) return errorResponse(res, "Invalid update data", 400, 400);

    const comment = await Comment.findOneAndUpdate(
      { comment_id: req.params.id },
      { content },
      { new: true }
    );

    if (!comment) return errorResponse(res, "Comment not found", 404, 404);

    successResponse(res, "Comment updated successfully", {
      comment_id: comment.comment_id,
      content: comment.content
    });
  } catch (err) {
    errorResponse(res, "Failed to update comment", 500);
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findOneAndDelete({ comment_id: req.params.id });
    if (!comment) return errorResponse(res, "Comment not found", 404, 404);

    successResponse(res, "Comment deleted successfully", { comment_id: comment.comment_id });
  } catch (err) {
    errorResponse(res, "Failed to delete comment", 500);
  }
};

export const getCommentsByArticle = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({ article_id: req.params.articleId });
    if (!comments.length) return errorResponse(res, "Article not found", 404, 404);

    const tree = buildCommentTree(comments);
    successResponse(res, "Comments fetched successfully", tree);
  } catch (err) {
    errorResponse(res, "Failed to fetch comments", 500);
  }
};

export const getCommentsByUser = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({ user_id: req.params.userId });
    if (!comments.length) return errorResponse(res, "User not found", 404, 404);

    successResponse(res, "User comments fetched successfully", comments);
  } catch (err) {
    errorResponse(res, "Failed to fetch user comments", 500);
  }
};