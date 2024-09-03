"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ComboboxItem,
  Card,
  Text,
  Badge,
  Button,
  Group,
  Grid,
  GridCol,
  Loader,
  LoadingOverlay,
} from "@mantine/core";
import SearchBar from "./components/searchBar";
import SortBy from "./components/sortBy";
import DropDown from "./components/dropdown";
import { groceryApi } from "./api";
import { useRouter } from "next/navigation";

export default function Page() {
  const [value, setValue] = useState<ComboboxItem | null>({
    value: "brand",
    label: "brand",
  });
  const [sortByvalue, setSortByValue] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await groceryApi.fetchGroceries(
        searchValue,
        value,
        sortByvalue
      );
      setData(response);
      setLoading(false);
    };

    fetchData();
  }, [searchValue, sortByvalue, value]);

  return (
    <main className="flex min-h-screen flex-col p-6 space-y-4">
      <div className="w-5">
        <SearchBar setValue={setSearchValue} />
      </div>
      <div className="w-[192px]">
        Sort By: <DropDown value={value} setValue={setValue} />
      </div>
      <div className="w-2">
        Sort Direction: <SortBy value={sortByvalue} setValue={setSortByValue} />
      </div>
      <LoadingOverlay
        visible={loading}
        loaderProps={{
          children: <Loader className="self-center" size={50} type="bars" />,
        }}
      />
      <Grid>
        {data?.map((object, i) => (
          <GridCol span={3}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{object.brand}</Text>
                <Badge color="pink">On Sale</Badge>
              </Group>

              <Text size="sm" c="dimmed">
                {object.product_name}
              </Text>

              <Button
                color="blue"
                mt="md"
                radius="md"
                onClick={() => router.push(`/ui/edit?id=${object.id}`)}
              >
                Edit
              </Button>
            </Card>
          </GridCol>
        ))}
      </Grid>
    </main>
  );
}
