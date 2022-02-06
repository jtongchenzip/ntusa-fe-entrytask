import React, { useEffect, useState } from 'react';

import PostListItem from '../partials/PostList/PostListItem';
import { useAppDispatch, useAppSelector } from '../reduxHooks';
import { addPost, browseAllPosts } from '../slices/posts';

export default function PostListItemList() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts);

  const [openAddPost, setOpenAddPost] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleAddPost = async () => {
    await dispatch(addPost({ title, author, content }));
    setOpenAddPost(false);
    setTitle('');
    setAuthor('');
    setContent('');
  };

  useEffect(() => {
    dispatch(browseAllPosts());
  }, [dispatch]);

  return (
    <div className="bg-sky-200 p-6 rounded-l shadow-md">
      <div className="flex flex-row justify-between align-middle py-2 mb-2">
        <h1 className="text-3xl font-bold mb-3">Posts</h1>
        {/* TODO: Add post */}
        <div
          className={
            openAddPost
              ? 'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'
              : 'fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'
          }
          id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-1">
              <h2 className="text-2xl font-bold text-gray-900">Add Post</h2>
              <div className="flex flex-col justify-start">
                <div className="text-base mt-2 border-t-4 border-transparent">Title</div>
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
                <div className="text-base mt-2 border-t-4 border-transparent">Author</div>
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
                  onClick={() => setOpenAddPost(false)}>
                  Cancel
                </button>
                <button
                  id="add-post-btn"
                  className="px-4 py-2 bg-sky-500 text-white text-base font-medium uppercase rounded-md w-50 shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-300"
                  onClick={handleAddPost}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          className="bg-cyan-600 text-white rounded-md shadow-md shadow-cyan-900 px-4 hover:bg-sky-300 hover:cursor-pointer active:bg-sky-800 transition-all"
          onClick={() => setOpenAddPost(true)}>
          Add
        </button>
      </div>
      <ul className="flex flex-col gap-3">
        {posts.ids.map((id) => (
          <PostListItem key={id.toString()} postId={Number(id)} />
        ))}
      </ul>
    </div>
  );
}
