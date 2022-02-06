import moment from 'moment';
import React, { useMemo } from 'react';

import { isComment } from '../../functions/typeGuards';
import { useAppSelector } from '../../reduxHooks';
interface ParamsType {
  commentId: number;
}

export default function CommentListItem({ commentId }: ParamsType) {
  const comments = useAppSelector((state) => state.comments);
  const comment = useMemo(
    () => comments.entities[Number(commentId)],
    [commentId, comments.entities],
  );

  if (isComment(comment)) {
    return (
      <li className="bg-slate-200 rounded-md shadow-md p-4 transition-all flex flex-col gap-2 w-full">
        <div className="flex flex-row justify-between">
          <span className="text-base font-semibold">{comment.username}</span>
          <span className="text-sm text-right">
            {moment(comment.time).format('MMM DD, YYYY')}
          </span>
        </div>
        <span>{comment.content}</span>
      </li>
    );
  } else {
    return (
      <li className="bg-slate-200 rounded-md shadow-md p-4 transition-all flex flex-col gap-2 w-full"></li>
    );
  }
}
