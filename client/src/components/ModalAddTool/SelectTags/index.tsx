import React, { useEffect } from "react";
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
  const { register, setValue } = useFormContext<FormAddTool>();
  const { data } = useSWR<Tag[]>("/tags/", fetcher);

  const options: Option[] =
    data?.map((tag) => ({
      value: tag.name,
      label: tag.name,
    })) || [];

  const onChange = (selectedOptions: any) => {
    setValue(
      "tags",
      selectedOptions?.map((option: Option) => {
        return option.value;
      }) || []
    );
  };

  useEffect(() => {
    register({ name: "tags" });
  }, [register]);

  return (
    <FormField
      label="Tags"
      customInput={
        <Select
          isMulti
          closeMenuOnSelect={false}
          onChange={onChange}
          options={options}
          classNamePrefix="select"
          placeholder=""
        />
      }
    />
  );
};

export default SelectTags;
