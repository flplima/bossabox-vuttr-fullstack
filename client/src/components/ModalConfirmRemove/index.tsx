import React from "react";
import { mutate } from "swr";

import Modal from "../Modal";
import { Button } from "../../styles";
import api from "../../services/api";
import { ModalActions } from "../Modal/styles";
import { ButtonCancel, Paragraph } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { toolToRemoveSelector } from "../../store/selectors";
import { setToolToRemove, setSearchQuery } from "../../store/actions";

const ModalConfirmRemove: React.FC = () => {
  const dispatch = useDispatch();
  const tool = useSelector(toolToRemoveSelector);

  const closeModal = () => {
    dispatch(setToolToRemove(null));
  };

  const onConfirm = async () => {
    try {
      await api.delete(`/tools/${tool?.id}`);
      mutate("/tools/");
      dispatch(setSearchQuery(""));
      closeModal();
    } catch (err) {
      // todo: handle error
    }
  };

  return (
    <Modal show={!!tool} onHide={closeModal}>
      <h2>Remove tool</h2>
      <Paragraph>
        Are you sure you want to remove <b>{tool?.title}</b>?
      </Paragraph>
      <ModalActions>
        <ButtonCancel onClick={closeModal}>Cancel</ButtonCancel>
        <Button onClick={onConfirm}>Yes, remove</Button>
      </ModalActions>
    </Modal>
  );
};

export default ModalConfirmRemove;
