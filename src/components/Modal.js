import React from "react";
import styled from "styled-components";
import Modal from "@material-ui/core/Modal";

const ModalBody = styled.div`
  background-color: #f2efe4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  text-align: center;
  transform: ${({ translate }) => `translate(0%, ${translate}%)`};
  outline-style: none;
`;

export default function PlebChatModal({ open, handleClose, number, children }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <ModalBody translate={number}>{children}</ModalBody>
    </Modal>
  );
}
