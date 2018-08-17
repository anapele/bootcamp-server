import Logger from '../utils/logger';
import * as MediaModel from '../models/MediaModel';
import * as PostModel from '../models/postModel';

const logger = Logger('mediaController');

const addPost = async (req, res) => {
  logger.log('debug', `addPost: ${JSON.stringify(req.body)}`);
  const { user } = req;
  const { caption, contentId } = req.body;
  const { path } = await MediaModel.getMediaById(contentId);
  const post = await PostModel.save({
    caption,
    username: user.username,
    media: {
      path,
      contentId,
    },
  });
  res.status(200).send({ payload: { post } });
};

const getAllPosts = async (req, res) => {
  logger.log('debug', `getAllPosts`);
  const posts = await PostModel.getAllPosts();
  res.status(200).send({ payload: posts });
};

const getPostsById = async (req, res) => {
  logger.log('debug', `getPostsById ${JSON.stringify(req.params)}`);
  const post = await PostModel.getPostsById(req.params.id);
  res.status(200).send({ payload: post });
};

const uploadImage = async (req, res) => {
  logger.log('debug', 'Upload Image!');
  const { user } = req;
  const {
    file: { filename },
  } = req;

  const path = `/${process.env.UPLOAD_FOLDER}/${filename}`;
  const media = await MediaModel.save({
    username: user.username,
    path,
  });

  res.status(200).send({ payload: {
      contentId: media.id,
      path,
      },
  });
};

export { uploadImage, addPost, getAllPosts, getPostsById };
