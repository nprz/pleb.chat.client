import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  modalRoot: {
    border: "1px solid red",
  },
}));

const ModalBody = styled.div`
  background-color: #f2efe4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  text-align: center;
  transform: translate(0%, 120%);
  outline-style: none;
`;

export default function PlebChatModal({ open, handleClose, children }) {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      classes={{ root: classes.modalRoot }}
    >
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
}
