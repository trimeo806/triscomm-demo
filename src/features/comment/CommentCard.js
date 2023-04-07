import React from "react";
import {
  Avatar,
  Box,
  Button,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import { useDispatch } from "react-redux";
import { deleteComment } from "./commentSlice";
import useAuth from "../../hooks/useAuth";

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

function CommentCard({ comment, postId }) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const handleDeleteComment = ({ commentId, postId }) => {
    dispatch(deleteComment({ commentId, postId }));
  };

  const [openDeleteCommentModal, setOpenDeleteCommentModal] =
    React.useState(false);
  const handleOpenDeleteCommentModal = () => setOpenDeleteCommentModal(true);
  const handleCloseDeleteCommentModal = () => setOpenDeleteCommentModal(false);

  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>

          <Button
            disabled={user._id === comment.author._id ? false : true}
            onClick={() => handleOpenDeleteCommentModal()}
          >
            Delete
          </Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openDeleteCommentModal}
            onClose={() => {
              handleCloseDeleteCommentModal();
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
                Do you want to delete this comment?
              </Typography>
              <Stack
                direction="row"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  onClick={() => {
                    handleDeleteComment({ commentId: comment._id, postId });
                  }}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => {
                    handleCloseDeleteCommentModal();
                  }}
                >
                  No
                </Button>
              </Stack>
            </Box>
          </Modal>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
