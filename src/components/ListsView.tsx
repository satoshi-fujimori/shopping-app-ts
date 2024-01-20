"use client";

import { useState } from "react";
import { createContext } from "react";
import type { Item } from "@/types";
import * as actions from "@/lib/action";
import AddFormPortal from "./AddFormPortal";
import ItemList from "./ItemList";

export const MyContext = createContext({
  onChange: (id: number, fieldName: string, value: number | string) => {},
  updateList: (item: Item) => {},
  deleteListItem: (id: number) => {},
});

export default function ListsView({ items }: { items: Item[] }) {
  const [itemList, setItemList] = useState<Item[]>(items);
  const [isBoughtListShow, setIsBoughtListShow] = useState<boolean>(false);
  const onChange = (id: number, fieldName: string, value: number | string) => {
    const newList: Item[] = itemList.map((item) => {
      if (item.id === id) {
        if (fieldName === "status") {
          return {
            ...item,
            status: !item.status,
          };
        }
        return {
          ...item,
          [fieldName]: value,
        };
      }
      return item; // id が一致しない場合はそのまま返す
    });
    setItemList(newList);
  };
  const updateAllItem = async () => {
    await actions.updateItem(itemList);
  };
  const updateList = (item: Item) => {
    setItemList([...itemList, item]);
  };
  const deleteListItem = async (id: number): Promise<void> => {
    await actions.deleteItem(id);
    setItemList(itemList.filter((item) => item.id !== id));
  };

  //context
  const config = {
    onChange: onChange,
    updateList: updateList,
    deleteListItem: deleteListItem,
  };

  return (
    <MyContext.Provider value={config}>
      <div className="m-2 p-2">
        <div className="mb-2">
          <div className="text-xl font-bold">ShoppingList</div>
          <div>
            <ItemList itemList={itemList} status={false} />
          </div>
          <AddFormPortal />
          <button
            type="button"
            onClick={updateAllItem}
            className="m-2 p-2 bg-blue-500 text-white rounded ml-auto"
          >
            更新
          </button>
          <hr className="border-gray-700" />
        </div>
        <div className="flex">
          <div className="text-xl font-bold">Boughtlist</div>
          <button onClick={() => setIsBoughtListShow((prev) => !prev)}>
            {isBoughtListShow ? "↑" : "↓"}
          </button>
        </div>
        {isBoughtListShow && <ItemList itemList={itemList} status={true} />}
      </div>
    </MyContext.Provider>
  );
}
