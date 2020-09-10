import React, { useState } from "react";
import { mutate } from "swr";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../Modal";
import { Button } from "../../styles";
import api from "../../services/api";
import { ModalActions } from "../Modal/styles";
import { ButtonCancel, Paragraph } from "./styles";
import { toolToRemoveSelector } from "../../store/selectors";
import { setToolToRemove, setSearchQuery } from "../../store/actions";
import Collapse from "../Collapse";
import ErrorBanner from "../ErrorBanner";

const ModalConfirmRemove: React.FC = () => {
  const dispatch = useDispatch();
  const tool = useSelector(toolToRemoveSelector);
  const [error, setError] = useState(false);

  const closeModal = () => {
    dispatch(setToolToRemove(null));
  };

  const closeErrorMessage = () => {
    setError(false);
  };

  const [submitting, setSubmitting] = useState(false);

  const onConfirm = async () => {
    setSubmitting(true);
    try {
      await api.delete(`/tools/${tool?.id}`);
      mutate("/tools/");
      dispatch(setSearchQuery(""));
      closeModal();
    } catch (err) {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={!!tool} onHide={closeModal}>
      <h2>Remove tool</h2>
      <Collapse show={error}>
        <ErrorBanner
          text="There was a problem. Please try later"
          onClose={closeErrorMessage}
        />
      </Collapse>
      <Paragraph>
        Are you sure you want to remove <b>{tool?.title}</b>?
      </Paragraph>
      <ModalActions>
        <ButtonCancel onClick={closeModal}>Cancel</ButtonCancel>
        <Button disabled={submitting} onClick={onConfirm}>
          Yes, remove
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default ModalConfirmRemove;
