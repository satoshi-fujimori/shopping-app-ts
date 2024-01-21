import type { Item } from "@/types";
import { MyContext } from "./ListsView";
import React, { useContext, useState } from "react";

export default function ItemComp({
  item,
  color,
}: {
  item: Item;
  color: string;
}) {
  const { onChange, deleteListItem, showBar } = useContext(MyContext);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName: string = e.target.name;
    const inputValue: string | null = e.target.value;
    const value: number | string = isNaN(Number(inputValue))
      ? ""
      : Number(inputValue);
    onChange(item.id, fieldName, value);
  };
  const deleteItem = async () => {
    deleteListItem(item.id);
    showBar("delete");
  };

  return (
    <div
      className="
        m-2
        p-2
        rounded-md
        shadow
        flex
        flex-col
        gap-2 w-full
      "
      style={{
        backgroundColor: color,
      }}
    >
      <div className="flex">
        <input
          type="checkbox"
          checked={item.status}
          className="w-5 h-5"
          onChange={handleChange}
          name="status"
        />
        <div className="w-full border-black pl-1">
          {item.name}({item.unit})
        </div>
        <button onClick={deleteItem} className="text-lg">
          ×
        </button>
      </div>
      <div className="flex items-center gap-2">
        <p>数量</p>
        <input
          autoComplete="off"
          type="text"
          className="p-2 w-1/4"
          name="amount"
          onChange={handleChange}
          value={item.amount}
        />
        <p className="ml-3">金額</p>
        <input
          type="text"
          autoComplete="off"
          className="p-2 w-1/4"
          name="price"
          onChange={handleChange}
          value={item.price}
        />
      </div>
    </div>
  );
}
