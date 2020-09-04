import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { mutate } from "swr";

import Modal from "../Modal";
import { Button } from "../../styles";
import { toolToRemoveState, searchQueryState } from "../../store/atoms";
import api from "../../services/api";
import { ModalActions } from "../Modal/styles";
import { ButtonCancel, Paragraph } from "./styles";

const ModalConfirmRemove: React.FC = () => {
  const [tool, setTool] = useRecoilState(toolToRemoveState);
  const setSearchQuery = useSetRecoilState(searchQueryState);

  const closeModal = () => {
    setTool(null);
  };

  const onConfirm = async () => {
    try {
      await api.delete(`/tools/${tool?.id}`);
      setSearchQuery("");
      mutate("/tools/");
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
