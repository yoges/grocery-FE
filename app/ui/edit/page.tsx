"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { groceryApi } from "@/app/api";
import { Loader, LoadingOverlay, NumberInput } from "@mantine/core";
import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const searchParams = useSearchParams();
  const groceryId = searchParams.get("id");
  const router = useRouter();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      brand: "",
      product_name: "",
      barcode: "",
    },

    validate: {
      brand: (value) =>
        value !== undefined && value.replace(/\s/g, "") !== ""
          ? null
          : "Invalid brand",
      product_name: (value) =>
        value !== undefined && value.replace(/\s/g, "") !== ""
          ? null
          : "Invalid product name",
      barcode: (value) => (value !== "" ? null : "Invalid barcode"),
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await groceryApi.fetchGrocery(groceryId);
      form.setValues({
        brand: response.brand,
        product_name: response.product_name,
        barcode: response.barcode,
      });
      setLoading(false);
    };

    fetchData();
  }, []);

  const updateData = async (values) => {
    setLoading(true);
    await groceryApi.updateGrocery(groceryId, values);
    setLoading(false);
    router.push("/");
  };

  return (
    <main className="flex min-h-screen flex-col p-6 space-y-4">
      <LoadingOverlay
        visible={loading}
        loaderProps={{
          children: <Loader className="self-center" size={50} type="bars" />,
        }}
      />
      <form onSubmit={form.onSubmit((values) => updateData(values))}>
        <NumberInput
          withAsterisk
          className="mb-4"
          label="UPC12 Barcode"
          clampBehavior="strict"
          min={1}
          max={999999999999}
          key={form.key("barcode")}
          {...form.getInputProps("barcode")}
        />
        <TextInput
          withAsterisk
          label="Brand"
          className="mb-4"
          key={form.key("brand")}
          {...form.getInputProps("brand")}
        />
        <TextInput
          withAsterisk
          label="Product Name"
          className="mb-4"
          key={form.key("product_name")}
          {...form.getInputProps("product_name")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Save</Button>
          <Button onClick={() => router.push("/")}>Cancel</Button>
        </Group>
      </form>
    </main>
  );
}
