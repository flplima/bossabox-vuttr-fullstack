import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { mutate } from "swr";

import Modal from "../Modal";
import api from "../../services/api";
import FormField from "../FormField";
import { ModalActions } from "../Modal/styles";
import SelectTags from "./SelectTags";
import { FormAddTool } from "../../types";
import { modalAddIsOpenSelector } from "../../store/selectors";
import { closeModalAdd, setSearchQuery } from "../../store/actions";
import Collapse from "../Collapse";
import ErrorBanner from "../ErrorBanner";
import { Scrollable, ButtonAdd } from "./styles";

const putLinkProtocol = (link: string) => {
  if (link && !link.startsWith("http")) {
    return `http://${link}`;
  }
  return link;
};

const ModalAddTool: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(modalAddIsOpenSelector);
  const form = useForm<FormAddTool>();
  const [error, setError] = useState(false);

  const closeModal = () => {
    dispatch(closeModalAdd());
  };

  const onSubmitForm = async (data: FormAddTool) => {
    try {
      await api.post("/tools", {
        ...data,
        link: putLinkProtocol(data.link),
        tags: data.tags || [],
      });
      mutate("/tools/");
      dispatch(setSearchQuery(""));
      closeModal();
    } catch (err) {
      setError(true);
    }
  };

  const closeErrorMessage = () => setError(false);

  return (
    <Modal show={isOpen} onHide={closeModal}>
      <h2>Add new tool</h2>
      <Collapse show={error}>
        <ErrorBanner
          text="There was a problem. Please try later"
          onClose={closeErrorMessage}
        />
      </Collapse>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)}>
          <Scrollable>
            <FormField
              label="Tool name"
              name="title"
              ref={form.register({ required: true })}
              error={form.errors.title && "Enter a name"}
            />
            <FormField
              label="Tool link"
              name="link"
              ref={form.register({
                pattern: /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)/,
              })}
              error={form.errors.link && "Enter a valid link"}
            />
            <FormField
              multiline
              label="Description"
              name="description"
              ref={form.register}
            />
            <SelectTags />
          </Scrollable>
          <ModalActions>
            <ButtonAdd type="submit">Add tool</ButtonAdd>
          </ModalActions>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default ModalAddTool;
