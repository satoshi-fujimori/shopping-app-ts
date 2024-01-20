import type { History, Item } from "@/types";

export default function HistoryTable({
  histories,
  items,
  date,
}: {
  histories: History[];
  items: Item[];
  date: string;
}) {
  //ここのfilter関数がおかしい
  const filteredHistory: History[] = histories.filter(
    (history) => new Date(history.purchased).toLocaleDateString() === date
  );
  return (
    <table className="m-2 p-2 border border-gray-600 w-auto max-w-screen">
      <thead>
        <tr>
          <th className="p-2">ItemName</th>
          <th className="p-2">Amount</th>
          <th className="p-2">Price</th>
        </tr>
      </thead>
      <tbody>
        {filteredHistory.map((history, index) => (
          <tr key={index} className="border-t">
            <td className="p-2">
              {items.find((item) => item.id === history.itemId)?.name}
            </td>
            <td className="p-2">{history.amount}</td>
            <td className="p-2">
              {items.find((item) => item.id === history.itemId)?.price}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
