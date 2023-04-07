import React from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  IconButton,
  Menu,
  Button,
  Modal,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostReaction from "./PostReaction";
import CommentList from "../comment/CommentList";
import CommentForm from "../comment/CommentForm";

import EditPostFormModal from "./EditPostFormModal";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { deletePost } from "./postSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function PostCard({
  post,
  openEditPostFormModal,
  handleOpenEditPostFormModal,
  handleCloseEditPostFormModal,
  page,
  userId,
}) {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeletePost = ({ postId, page, userId }) => {
    dispatch(deletePost({ postId, page, userId }));
  };
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  return (
    <Card sx={{ m: 2 }}>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <>
            <IconButton
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon sx={{ fontSize: 30 }} />
            </IconButton>
            {user._id === post.author._id && (
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <EditPostFormModal
                  openEditPostFormModal={openEditPostFormModal}
                  handleOpenEditPostFormModal={handleOpenEditPostFormModal}
                  handleCloseEditPostFormModal={handleCloseEditPostFormModal}
                  post={post}
                  handleClose={handleClose}
                />

                <Button sx={{ width: 100 }} onClick={handleOpenDeleteModal}>
                  Delete
                </Button>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={openDeleteModal}
                  onClose={() => {
                    handleCloseDeleteModal();
                    handleClose();
                  }}
                  closeAfterTransition
                  slotProps={{
                    backdrop: {
                      timeout: 500,
                    },
                  }}
                >
                  <Box sx={style}>
                    <Typography
                      id="transition-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Do you want to delete this post?
                    </Typography>
                    <Stack
                      direction="row"
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Button
                        onClick={() => {
                          handleDeletePost({ postId: post._id, userId, page });
                          handleClose();
                        }}
                      >
                        Yes
                      </Button>
                      <Button
                        onClick={() => {
                          handleCloseDeleteModal();
                          handleClose();
                        }}
                      >
                        No
                      </Button>
                    </Stack>
                  </Box>
                </Modal>
              </Menu>
            )}
          </>
        }
      />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography>{post.content}</Typography>
        {post.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 300,
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={post.image} alt="post" />
          </Box>
        )}
        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
    </Card>
  );
}

export default PostCard;
