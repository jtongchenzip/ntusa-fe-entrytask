import { Comment } from '../slices/comments';
import { Post } from '../slices/posts';
export function isPost(p: Post | undefined): p is Post {
  return p !== undefined;
}
export function isComment(c: Comment | undefined): c is Comment {
  return c !== undefined;
}
