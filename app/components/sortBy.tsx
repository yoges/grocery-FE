"use client";
import React, { useState } from "react";
import { Switch } from "@mantine/core";

const SortBy = ({ value, setValue }) => {
  const toggle = async () => {
    setValue(!value);
  };

  return (
    <Switch
      size="xl"
      onLabel="A-Z"
      offLabel="Z-A"
      checked={value}
      onClick={toggle}
    />
  );
};

export default SortBy;
