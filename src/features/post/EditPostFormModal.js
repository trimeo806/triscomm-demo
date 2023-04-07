import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import EditPostForm from "./EditPostForm";

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

function EditPostFormModal({
  openEditPostFormModal,
  handleCloseEditPostFormModal,
  handleOpenEditPostFormModal,
  handleClose,
  post,
}) {
  console.log(post);
  return (
    <Box>
      <Button
        variant="text"
        onClick={() => {
          handleOpenEditPostFormModal();
        }}
        sx={{ width: 100 }}
      >
        Edit
      </Button>
      <Modal
        open={openEditPostFormModal}
        onClose={() => {
          handleCloseEditPostFormModal();
          handleClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditPostForm
            post={post}
            handleCloseEditPostFormModal={handleCloseEditPostFormModal}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default EditPostFormModal;
