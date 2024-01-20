"use client";

import type { History, Item } from "@/types";
import Chart from "./Chart";
import React, { useState } from "react";

export default function ChartView({
  histories,
  items,
}: {
  histories: History[];
  items: Item[];
}) {
  const [selectedItem, setSelectedItem] = useState<number>(1);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItem: Item | undefined = items.find(
      (item) => item.id === Number(e.target.value)
    );
    if (newItem) {
      setSelectedItem(newItem.id);
    }
  };
  return (
    <div>
      <select
        className="m-2 p-2 border border-gray-600 rounded"
        onChange={handleChange}
        value={selectedItem}
      >
        {items.map((item, index) => (
          <option key={index} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <Chart
        list={histories.filter((history) => history.itemId === selectedItem)}
        YaxisKey="unitPrice"
      />
      <Chart
        list={histories.filter((history) => history.itemId === selectedItem)}
        YaxisKey="amount"
      />
    </div>
  );
}
