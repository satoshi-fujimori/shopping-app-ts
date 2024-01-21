import type { Item } from "@/types";
import ItemComp from "./ItemComp";
import { useState } from "react";

const colors: string[] = [
  "#F87171",
  "#FBBF24",
  "#60A5FA",
  "#34D399",
  "#818CF8",
  "#F472B6",
  "#A78BFA",
];
export default function ItemList({
  itemList,
  status,
}: {
  itemList: Item[];
  status: boolean;
}) {
  const [tagVisibility, setTagVisibility] = useState<{
    [tag: string]: boolean;
  }>({});

  let tags: string[] = [];
  for (const item of itemList) {
    if (!tags.includes(item.tag)) {
      tags.push(item.tag);
    }
  }

  if (Object.keys(tagVisibility).length === 0) {
    tags.forEach((tag) => {
      setTagVisibility((prev) => ({
        ...prev,
        [tag]: true, // Default visibility
      }));
    });
  }

  // Toggle visibility for a specific tag
  const toggleTagVisibility = (tag: string) => {
    setTagVisibility((prev) => ({
      ...prev,
      [tag]: !tagVisibility[tag],
    }));
  };

  const filteredList = itemList.filter((item) => item.status === status);
  return (
    <>
      {tags.map((tag, index) => (
        <div key={index} className="p-2">
          <div className="flex gap-1">
            <p className="text-lg">{tag}</p>
            <button onClick={() => toggleTagVisibility(tag)}>
              {tagVisibility[tag] ? "↑" : "↓"}
            </button>
          </div>
          {tagVisibility[tag] && (
            <div className="flex flex-col sm:flex-row gap-2">
              {filteredList
                .filter((itemOfTag) => itemOfTag.tag === tag)
                .map((item, itemIndex) => (
                  <div key={itemIndex} className="sm:w-1/2">
                    <ItemComp
                      item={item}
                      color={index <= 6 ? colors[index] : colors[1]}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
