import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { isPost } from '../functions/typeGuards';
import CommentList from '../partials/PostContent/CommentList';
import { useAppDispatch, useAppSelector } from '../reduxHooks';
import { editPost, readPostAndComments } from '../slices/posts';

export default function PostContent() {
  const { postId } = useParams();
  const posts = useAppSelector((state) => state.posts);
  const post = useMemo(() => posts.entities[Number(postId)], [postId, posts.entities]);
  const dispatch = useAppDispatch();

  const [openEditPost, setOpenEditPost] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleEditPost = async () => {
    await dispatch(editPost({ postId: Number(postId), title, author, content }));
    setOpenEditPost(false);
  };

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setAuthor(post.author);
      setContent(post.content);
    }
  }, [post]);

  useEffect(() => {
    // just to show you that we can await a dispatch
    const refetch = async () => {
      await dispatch(readPostAndComments({ postId: Number(postId) }));
    };
    refetch();
  }, [dispatch, postId]);

  // type guard
  if (isPost(post))
    // typeof post === 'Post' here
    return (
      <div className="flex flex-col bg-sky-200 p-6 rounded-l shadow-md">
        <div className="flex flex-row justify-between">
          <div
            className={
              openEditPost
                ? 'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'
                : 'fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'
            }
            id="my-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-1">
                <h2 className="text-2xl font-bold text-gray-900">Edit Post</h2>
                <div className="flex flex-col justify-start">
                  <div className="text-base mt-2 border-t-4 border-transparent">
                    Title
                  </div>
                  <div className="mt-0">
                    <input
                      id="Title"
                      name="Title"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded trasition ease-in-out m-0 focus:text-gray:700 focus:bg-white focus:border-sky-400 focus:outline-none"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-start">
                  <div className="text-base mt-2 border-t-4 border-transparent">
                    Author
                  </div>
                  <div className="mt-0">
                    <input
                      id="Author"
                      name="Author"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded trasition ease-in-out m-0 focus:text-gray:700 focus:bg-white focus:border-sky-400 focus:outline-none"
                      placeholder="Author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-start">
                  <div className="text-base mt-2 border-t-4 border-transparent">
                    Content
                  </div>
                  <div className="m-0">
                    <textarea
                      id="Content"
                      name="Author"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded trasition ease-in-out m-0 focus:text-gray:700 focus:bg-white focus:border-sky-400 focus:outline-none"
                      placeholder="Content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-end mt-4">
                  <button
                    id="cancel-add-post-btn"
                    className="mx-2 px-4 py-2 bg-gray-300 text-white text-base font-medium uppercase rounded-md w-50 shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={() => setOpenEditPost(false)}>
                    Cancel
                  </button>
                  <button
                    id="add-post-btn"
                    className="px-4 py-2 bg-sky-500 text-white text-base font-medium uppercase rounded-md w-50 shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-300"
                    onClick={handleEditPost}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-3xl mb-2 font-bold">{post.title}</h2>
          <button
            className="text-sm bg-cyan-600 text-white rounded-md shadow-md shadow-cyan-900 px-3 hover:bg-sky-300 hover:cursor-pointer active:bg-sky-800 transition-all"
            onClick={() => setOpenEditPost(true)}>
            Edit Post
          </button>
        </div>
        <div className="flex flex-col">
          <span className="text-lg">by {post.author}</span>
          <span className="my-1 text-sm">{moment(post.time).format('MMM DD, YYYY')}</span>
        </div>
        <span className="my-5">{post.content}</span>
        <CommentList post={post} />
      </div>
    );
  else
    return (
      <div className="bg-sky-200 p-6 rounded-l shadow-md">
        <h2 className="text-xl font-bold">404 Not Found</h2>
      </div>
    );
}
