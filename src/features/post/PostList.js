import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./postSlice";
import PostCard from "./PostCard";
import { Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

function PostList({ userId }) {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { postsById, currentPagePosts, totalPosts, isLoading } = useSelector(
    (state) => state.post
  );
  const posts = currentPagePosts.map((postId) => postsById[postId]);

  useEffect(() => {
    if (userId) {
      dispatch(getPosts({ userId, page }));
    }
  }, [userId, page, dispatch]);

  const [openEditPostFormModal, setOpenEditPostFormModal] =
    React.useState(false);
  const handleOpenEditPostFormModal = () => setOpenEditPostFormModal(true);
  const handleCloseEditPostFormModal = () => setOpenEditPostFormModal(false);

  return (
    <div>
      {posts?.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          openEditPostFormModal={openEditPostFormModal}
          handleOpenEditPostFormModal={handleOpenEditPostFormModal}
          handleCloseEditPostFormModal={handleCloseEditPostFormModal}
          page={page}
          userId={userId}
        />
      ))}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {totalPosts ? (
          <LoadingButton
            variant="outlined"
            size="small"
            loading={isLoading}
            onClick={() => {
              setPage((page) => page + 1);
            }}
          >
            Load more
          </LoadingButton>
        ) : (
          <Typography variant="h6"></Typography>
        )}
      </Box>
    </div>
  );
}

export default PostList;
