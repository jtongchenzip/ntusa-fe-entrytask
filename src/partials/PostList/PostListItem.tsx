import moment from 'moment';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../reduxHooks';

interface ParamsType {
  key: string;
  postId: number;
}

export default function PostListItem({ postId }: ParamsType) {
  const posts = useAppSelector((state) => state.posts);
  const navigate = useNavigate();
  const post = useMemo(() => posts.entities[postId], [posts, postId]);

  return (
    <button
      className="bg-slate-200 rounded-md shadow-md p-4 hover:bg-slate-300 hover:cursor-pointer active:bg-slate-400 transition-all flex flex-col gap-2 w-full"
      onClick={() => navigate(`/post/${postId}`)}>
      <h2 className="text-xl font-bold">{post?.title}</h2>
      <span className="">{post?.author}</span>
      <span className="text-sm">{moment(post?.time).format('MMM DD, YYYY')}</span>
    </button>
  );
}
