import ListsView from "@/components/ListsView";
import * as actions from "@/lib/action";
import type { Item } from "@/types";
import { Text, Button } from "@radix-ui/themes";

export default async function Page() {
  const items: Item[] = await actions.getAllItem();
  return (
    <div>
      <ListsView items={items} />
      {/*
      <div
        id="dialog"
        className="fixed top-1/3 left-1/3 bg-white p-4 shadow-lg rounded-lg"
      ></div>*/}
    </div>
  );
}
