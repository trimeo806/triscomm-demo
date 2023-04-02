import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { POST_PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  postsById: {
    // example: `key === id of post`: {data of post}
  },
  currentPagePosts: [
    // chi chua id cua post
  ],
};

const slice = createSlice({
  name: "post",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      // add post vua them vao trang luon
      const newPost = action.payload;
      // Xoa post di de dam bao limit duoc 2
      if (state.currentPagePosts.length % POST_PER_PAGE === 0) {
        state.currentPagePosts.pop();
      }
      // Tao key value trong object postsById
      state.postsById[newPost._id] = newPost;
      state.currentPagePosts.unshift(newPost._id);
    },
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      // state.posts = action.payload.posts;
      // Lay posts tu page number
      const { count, posts } = action.payload;
      // state.posts = state.posts.concat(posts);
      posts.forEach((post) => {
        //Luu post bang cach tao key la post._id = post data
        state.postsById[post._id] = post;
        // Check current page posts coi co chua cai o tren khong. Neu co thi khong push. Con k co thi push
        if (!state.currentPagePosts.includes(post._id))
          state.currentPagePosts.push(post._id);
      });
      state.totalPosts = count;
    },
  },
});
// Doc cai nay ki hon ti de coi cach lam middleware
export const createPost =
  ({ content, image }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/posts", { content, image });
      dispatch(slice.actions.createPostSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getPosts =
  ({ userId, page, limit = POST_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(`/posts/user/${userId}`, {
        params,
      });
      dispatch(slice.actions.getPostsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export default slice.reducer;
