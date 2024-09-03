"use client";
import { Select } from "@mantine/core";

const DropDown = ({ value, setValue }) => {
  return (
    <Select
      data={[
        { value: "brand", label: "brand" },
        { value: "product_name", label: "product name" },
      ]}
      value={value ? value.value : null}
      onChange={(_value, option) => setValue(option)}
      comboboxProps={{ width: 200 }}
      allowDeselect={false}
    />
  );
};

export default DropDown;
