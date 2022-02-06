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
  // const posts = useAppSelector((state) => state.posts);
  // const post = useMemo(() => posts.entities[Number(postId)], [postId, posts.entities]);
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

  console.log(postId, username, content);

  return (
    <div className="mt-10">
      <div className="flex justify-between">
        <h1 className="text-xl mb-3 font-semibold">Comments</h1>
        <button
          className="text-sm bg-cyan-600 text-white rounded-md shadow-md shadow-cyan-900 px-3 hover:bg-sky-300 hover:cursor-pointer active:bg-sky-800 transition-all"
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
        id="my-modal">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-1">
            <h2 className="text-2xl font-bold text-gray-900">Add Comment</h2>

            <div className="flex flex-col justify-start">
              <div className="text-base mt-2 border-t-4 border-transparent">Username</div>
              <div className="mt-0">
                <input
                  id="Username"
                  name="Username"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded trasition ease-in-out m-0 focus:text-gray:700 focus:bg-white focus:border-sky-400 focus:outline-none"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col justify-start">
              <div className="text-base mt-2 border-t-4 border-transparent">Content</div>
              <div className="m-0">
                <textarea
                  id="Content"
                  name="Content"
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
                onClick={() => setOpenAddComment(false)}>
                Cancel
              </button>
              <button
                id="add-post-btn"
                className="px-4 py-2 bg-sky-500 text-white text-base font-medium uppercase rounded-md w-50 shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-300"
                onClick={handleAddComment}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <ul className="flex flex-col gap-3 mt-3">
        {post.commentIds.map((id) => (
          <CommentListItem key={id} commentId={id} />
        ))}
      </ul>
    </div>
  );
}
