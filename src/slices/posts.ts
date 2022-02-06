import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  // PayloadAction,
} from '@reduxjs/toolkit';

import { isPost } from '../functions/typeGuards';
import agent from './agent';
import { browseComment } from './comments';

// type of slice entity ------------------------------------------------------

export type Post = {
  id: number;
  title: string;
  author: string;
  content: string;
  time: string;
  commentIds: number[];
};

// interfaces for response and action payload type check ---------------------

export interface BrowseAllPostsPayload {
  id: number;
  author: string;
  title: string;
  content: string;
  time_: string;
}

export interface ReadPostPayload {
  id: number;
  author: string;
  title: string;
  content: string;
  time_: string;
}

// interfaced of action arguments --------------------------------------------

export interface ReadPostArgs {
  postId: number;
}

export interface AddPostArgs {
  title: string;
  author: string;
  content: string;
}

export interface EditPostArgs {
  postId: number;
  title: string;
  author: string;
  content: string;
}

export interface ReadPostAndCommentsArgs {
  postId: number;
}

// first-level thunks: aligned with backend endpoints and methods ------------

export const browseAllPosts = createAsyncThunk('posts/browseAllPosts', async () => {
  const res = await agent.get<BrowseAllPostsPayload[]>('/post');
  return res.data;
});

export const readPost = createAsyncThunk(
  'posts/readPost',
  async ({ postId }: ReadPostArgs) => {
    const res = await agent.get<ReadPostPayload>(`/post/${postId}`);
    return res.data;
  },
);

export const addPost = createAsyncThunk(
  'posts/addPost',
  async ({ title, author, content }: AddPostArgs, { dispatch }) => {
    await agent.post('/post', { title, author, content });
    // refetch (invalidate) all posts
    dispatch(browseAllPosts());
  },
);

// TODO: editPost
export const editPost = createAsyncThunk(
  'posts/editPost',
  async ({ postId, title, author, content }: EditPostArgs, { dispatch }) => {
    await agent.patch(`/post/${postId}`, { title, author, content });
    // refetch (invalidate) all posts
    dispatch(readPost({ postId }));
  },
);

// higher-level thunks: for component functionalities -------------------------

export const readPostAndComments = createAsyncThunk(
  'post/readPostAndComments',
  async ({ postId }: ReadPostAndCommentsArgs, { dispatch }) => {
    dispatch(readPost({ postId }));
    dispatch(browseComment({ postId }));
  },
);

// entity adaptor -------------------------------------------------------------

const postsAdapter = createEntityAdapter<Post>({
  selectId: (post) => post.id,
});

// slice

const postSlice = createSlice({
  name: 'posts',
  initialState: postsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(browseAllPosts.fulfilled, (state, action) => {
      postsAdapter.upsertMany(
        state,
        action.payload.map(({ id, author, title, content, time_ }) => ({
          id,
          author,
          title,
          content,
          time: time_,
          commentIds: state.entities[id]?.commentIds ?? [],
        })),
      );
    });

    builder.addCase(readPost.fulfilled, (state, action) => {
      const { id, author, title, content, time_ } = action.payload;
      postsAdapter.upsertOne(state, {
        id,
        author,
        title,
        content,
        time: time_,
        commentIds: state.entities[id]?.commentIds ?? [],
      });
    });

    builder.addCase(browseComment.fulfilled, (state, action) => {
      const postId = action.meta.arg.postId;
      const current = state.entities[postId];
      if (isPost(current)) {
        postsAdapter.upsertOne(state, {
          ...current,
          commentIds: action.payload.map(({ id }) => id),
        });
      } else {
        postsAdapter.addOne(state, {
          id: postId,
          author: '',
          title: '',
          content: '',
          time: '',
          commentIds: action.payload.map(({ id }) => id),
        });
      }
    });
  },
});

export default postSlice;
