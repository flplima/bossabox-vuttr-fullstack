import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useForm, FormProvider } from "react-hook-form";
import { mutate } from "swr";

import Modal from "../Modal";
import { Button } from "../../styles";
import { modalAddIsOpenState, searchQueryState } from "../../store/atoms";
import api from "../../services/api";
import FormField from "../FormField";
import { ModalActions } from "../Modal/styles";
import SelectTags from "./SelectTags";
import { FormAddTool } from "../../types";

const ModalAddTool: React.FC = () => {
  const [isOpen, setOpen] = useRecoilState(modalAddIsOpenState);
  const setSearchQuery = useSetRecoilState(searchQueryState);
  const form = useForm<FormAddTool>();

  const onSubmitForm = async (data: FormAddTool) => {
    try {
      await api.post("/tools", data);
      setOpen(false);
      setSearchQuery("");
      mutate("/tools/");
    } catch (err) {
      // todo: handle error
    }
  };

  return (
    <Modal show={isOpen} onHide={() => setOpen(false)}>
      <h2>Add new tool</h2>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)}>
          <FormField
            label="Tool name"
            name="title"
            ref={form.register({ required: true })}
            error={form.errors.title && "This field is required"}
          />
          <FormField
            label="Tool link"
            name="link"
            ref={form.register}
            error={form.errors.link && "This field is required"}
          />
          <FormField
            label="Description"
            name="description"
            ref={form.register}
          />
          <SelectTags />
          <ModalActions>
            <Button type="submit">Add tool</Button>
          </ModalActions>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default ModalAddTool;
