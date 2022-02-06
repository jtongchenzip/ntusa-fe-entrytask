import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../reduxHooks';
import { addComment } from '../../slices/comments';
import { Post } from '../../slices/posts';
import CommentListItem from './CommentListItem';

interface ParamsType {
  post: Post;
}

export default function CommentList({ post }: ParamsType) {
  const { postId } = useParams();
  const dispatch = useAppDispatch();

  const [openAddComment, setOpenAddComment] = useState(false);
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');

  const handleAddComment = async () => {
    await dispatch(addComment({ postId: Number(postId), username, content }));
    setOpenAddComment(false);
    setUsername('');
    setContent('');
  };

  return (
    <div className="mt-2">
      <div className="flex flex-row justify-between mb-3 border-b-2 py-4">
        <h1 className="text-2xl pt-1 font-semibold">Comments</h1>
        <button
          className="text-sm py-2 bg-cyan-600 text-white rounded-md shadow-md shadow-cyan-900 px-3 hover:bg-sky-300 hover:cursor-pointer active:bg-sky-800 transition-all"
          onClick={() => setOpenAddComment(true)}>
          Add Comment
        </button>
      </div>

      <div
        className={
          openAddComment
            ? 'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'
            : 'fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'
        }
        id="add-comment-modal">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <h2 className="my-2 text-2xl font-bold text-gray-900">Add Comment</h2>

          <div className="my-1 flex flex-col justify-start">
            <div className="my-1 text-base">Username</div>
            <input
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded trasition ease-in-out focus:text-gray:700 focus:bg-white focus:border-sky-400 focus:outline-none"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="my-1 flex flex-col justify-start">
            <div className="my-1 text-base">Content</div>
            <textarea
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded trasition ease-in-out focus:text-gray:700 focus:bg-white focus:border-sky-400 focus:outline-none"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="mt-4 flex flex-row justify-end">
            <button
              className="mx-2 px-4 py-2 bg-gray-300 text-white text-base font-medium uppercase rounded-md w-50 shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={() => setOpenAddComment(false)}>
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-sky-500 text-white text-base font-medium uppercase rounded-md w-50 shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-300"
              onClick={handleAddComment}>
              Add
            </button>
          </div>
        </div>
      </div>

      <ul className="flex flex-col gap-3">
        {post.commentIds.map((id) => (
          <CommentListItem key={id} commentId={id} />
        ))}
      </ul>
    </div>
  );
}
