import { Request, Response } from "express";
import { randomUUID } from "crypto";
import { Comment } from "../models/comment.model";
import { errorResponse, successResponse } from "../utils/response";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { article_id, user_id, content, parent_comment_id } = req.body;

    if (!article_id || !user_id || !content) {
      return res.status(400).json(errorResponse(400, "Invalid comment data"));
    }

    const newComment = await Comment.create({
      comment_id: randomUUID(),
      article_id,
      user_id,
      content,
      parent_comment_id: parent_comment_id || null
    });

    return res.status(201).json(
      successResponse("Comment created successfully", 201, {
        comment_id: newComment.comment_id,
        article_id: newComment.article_id,
        user_id: newComment.user_id,
        content: newComment.content,
        parent_comment_id: newComment.parent_comment_id,
        createdAt: newComment.createdAt,
        updatedAt: newComment.updatedAt
      })
    );
  } catch (error) {
    return res.status(500).json(errorResponse(500, "Failed to create comment"));
  }
};

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const article_id = req.query.article_id as string | undefined;

    const filter: Record<string, unknown> = {};
    if (article_id) {
      filter.article_id = article_id;
    }

    const comments = await Comment.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .json(successResponse("Comments fetched successfully", 200, comments));
  } catch (error) {
    return res.status(500).json(errorResponse(500, "Failed to fetch comments"));
  }
};

export const getCommentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findOne({ comment_id: id });

    if (!comment) {
      return res.status(404).json(errorResponse(404, "Comment not found"));
    }

    return res
      .status(200)
      .json(successResponse("Comment fetched successfully", 200, comment));
  } catch (error) {
    return res.status(500).json(errorResponse(500, "Failed to fetch comment"));
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json(errorResponse(400, "Invalid update data"));
    }

    const updatedComment = await Comment.findOneAndUpdate(
      { comment_id: id },
      { content },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json(errorResponse(404, "Comment not found"));
    }

    return res.status(200).json(
      successResponse("Comment updated successfully", 200, {
        comment_id: updatedComment.comment_id,
        article_id: updatedComment.article_id,
        user_id: updatedComment.user_id,
        content: updatedComment.content,
        parent_comment_id: updatedComment.parent_comment_id,
        createdAt: updatedComment.createdAt,
        updatedAt: updatedComment.updatedAt
      })
    );
  } catch (error) {
    return res.status(500).json(errorResponse(500, "Failed to update comment"));
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedComment = await Comment.findOneAndDelete({ comment_id: id });

    if (!deletedComment) {
      return res.status(404).json(errorResponse(404, "Comment not found"));
    }

    return res.status(200).json(
      successResponse("Comment deleted successfully", 200, {
        comment_id: deletedComment.comment_id
      })
    );
  } catch (error) {
    return res.status(500).json(errorResponse(500, "Failed to delete comment"));
  }
};

export const getCommentsByArticle = async (req: Request, res: Response) => {
  try {
    const { articleId } = req.params;

    const comments = await Comment.find({ article_id: articleId }).sort({
      createdAt: 1
    });

    const topLevelComments = comments.filter(
      (comment) => !comment.parent_comment_id
    );

    const nestedComments = topLevelComments.map((comment) => {
      const replies = comments.filter(
        (reply) => reply.parent_comment_id === comment.comment_id
      );

      return {
        comment_id: comment.comment_id,
        article_id: comment.article_id,
        user_id: comment.user_id,
        content: comment.content,
        parent_comment_id: comment.parent_comment_id,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        replies: replies.map((reply) => ({
          comment_id: reply.comment_id,
          article_id: reply.article_id,
          user_id: reply.user_id,
          content: reply.content,
          parent_comment_id: reply.parent_comment_id,
          createdAt: reply.createdAt,
          updatedAt: reply.updatedAt
        }))
      };
    });

    return res
      .status(200)
      .json(successResponse("Comments fetched successfully", 200, nestedComments));
  } catch (error) {
    return res.status(500).json(errorResponse(500, "Failed to fetch article comments"));
  }
};

export const getCommentsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const comments = await Comment.find({ user_id: userId }).sort({
      createdAt: -1
    });

    return res
      .status(200)
      .json(successResponse("User comments fetched successfully", 200, comments));
  } catch (error) {
    return res.status(500).json(errorResponse(500, "Failed to fetch user comments"));
  }
};