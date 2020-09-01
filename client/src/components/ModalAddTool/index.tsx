import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { mutate } from "swr";

import Modal from "../Modal";
import { Button } from "../../styles";
import { modalAddIsOpenState, searchQueryState } from "../../store/atoms";
import api from "../../services/api";
import FormField from "../FormField";

interface Form {
  title: string;
  link: string;
  description: string;
  tags: string; // string[]
}

const ModalAddTool: React.FC = () => {
  const [isOpen, setOpen] = useRecoilState(modalAddIsOpenState);
  const setSearchQuery = useSetRecoilState(searchQueryState);
  const form = useForm<Form>();

  const onSubmitForm = async (data: Form) => {
    try {
      await api.post("/tools", {
        ...data,
        tags: data.tags.split(","),
      });
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
          ref={form.register({ required: true })}
          error={form.errors.link && "This field is required"}
        />
        <FormField label="Description" name="description" ref={form.register} />
        <FormField label="Tags" name="tags" ref={form.register} />
        <Button type="submit">Add tool</Button>
      </form>
    </Modal>
  );
};

export default ModalAddTool;
