"use client";

import { useState } from "react";
import { createContext } from "react";
import type { Item } from "@/types";
import * as actions from "@/lib/action";
import AddFormPortal from "./AddFormPortal";
import ItemList from "./ItemList";
import SnackBar from "./SnackBar";

export const MyContext = createContext({
  onChange: (id: number, fieldName: string, value: number | string) => {},
  updateList: (item: Item) => {},
  deleteListItem: (id: number) => {},
  showBar: (type: string) => {},
});

export default function ListsView({ items }: { items: Item[] }) {
  const [itemList, setItemList] = useState<Item[]>(items);
  const [isBoughtListShow, setIsBoughtListShow] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [typeOfShowBar, setTypeOfShowBar] = useState<string>("");
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
    setIsUpdating(true);
    await actions.updateItem(itemList);
    setIsUpdating(false);
    showBar("update");
  };
  const updateList = (item: Item) => {
    setItemList([...itemList, item]);
  };
  const deleteListItem = async (id: number): Promise<void> => {
    await actions.deleteItem(id);
    setItemList(itemList.filter((item) => item.id !== id));
  };
  const showBar = (type: string) => {
    setTypeOfShowBar(type);
    setTimeout(() => {
      setTypeOfShowBar("");
    }, 5000);
  };

  //context
  const config = {
    onChange: onChange,
    updateList: updateList,
    deleteListItem: deleteListItem,
    showBar: showBar,
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
            disabled={isUpdating}
            //className="m-2 p-2 bg-blue-500 text-white rounded ml-auto"
            className={`m-2 p-2 rounded ml-auto ${
              isUpdating
                ? "bg-gray-500 text-white cursor-not-allowed"
                : "bg-blue-500 text-white cursor-pointer"
            }`}
          >
            {isUpdating ? "更新中..." : "更新"}
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
        {typeOfShowBar && <SnackBar type={typeOfShowBar} />}
      </div>
    </MyContext.Provider>
  );
}
