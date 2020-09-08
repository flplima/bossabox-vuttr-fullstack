import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { useFormContext } from "react-hook-form";

import { fetcher } from "../../../services/api";
import { Tag, FormAddTool } from "../../../types";
import { Select } from "./styles";
import FormField from "../../FormField";

interface Option {
  label: string;
  value: string;
}

const SelectTags: React.FC = () => {
  const form = useFormContext<FormAddTool>();
  const { data } = useSWR<Tag[]>("/tags/", fetcher);

  const [inputValue, setInputValue] = useState("");

  const selectRef = useRef<any>();

  const selectedTags = form.watch("tags");

  const options: Option[] =
    data?.map((tag) => ({
      value: tag.name,
      label: tag.name,
    })) || [];

  const onChange = (selectedOptions: any) => {
    form.setValue(
      "tags",
      selectedOptions?.map((option: Option) => {
        return option.value;
      }) || []
    );
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    const spaceKeyCode = 32;
    const commaKeyCode = 188;
    if ([spaceKeyCode, commaKeyCode].includes(e.keyCode)) {
      e.preventDefault();
      form.setValue("tags", [...(selectedTags || []), inputValue]);
      setInputValue("");
      selectRef.current?.focus();
    }
  };

  const onInputChange = (value: string) => {
    setInputValue(value);
  };

  const { register, unregister } = form;
  useEffect(() => {
    register({ name: "tags" });
    return () => {
      unregister("tags");
    };
  }, [register, unregister]);

  return (
    <FormField
      label="Tags"
      customInput={
        <Select
          ref={selectRef}
          isMulti
          closeMenuOnSelect={false}
          onChange={onChange}
          onKeyDown={onKeyDown}
          inputValue={inputValue}
          onInputChange={onInputChange}
          options={options}
          classNamePrefix="select"
          placeholder=""
          value={selectedTags?.map((tag) => ({
            label: tag,
            value: tag,
          }))}
        />
      }
    />
  );
};

export default SelectTags;
