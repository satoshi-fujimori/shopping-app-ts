"use client";

import type { History, Item } from "@/types";
import React, { useState } from "react";
import HistoryTable from "./HistoryTable";

export default function BoughtView({
  sortedList,
  items,
}: {
  sortedList: History[];
  items: Item[];
}) {
  const [selectedHistoryDate, setSelectedHisotryDate] = useState<string>(
    sortedList[0]?.purchased
  );
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHisotryDate(e.target.value);
  };
  const options: string[] = [];
  const setOption = (): void => {
    for (const history of sortedList) {
      const dateObj: string = new Date(history.purchased).toLocaleDateString();
      if (!options.includes(dateObj)) {
        options.push(dateObj);
      }
    }
  };
  setOption();

  return (
    <div>
      <select
        className="m-2 p-2 border border-black rounded"
        value={selectedHistoryDate}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <HistoryTable
        histories={sortedList}
        items={items}
        date={selectedHistoryDate}
      />
    </div>
  );
}
