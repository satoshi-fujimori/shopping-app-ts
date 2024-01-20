import * as historyAction from "@/lib/historyAction";
import * as actions from "@/lib/action";
import type { History, Item } from "@/types";
import BoughtView from "@/components/BoughtView";

//購入機会単位での履歴を表示
export default async function BoughtPage() {
  const getHistory = async () => {
    return await historyAction.getAllHistory();
  };
  const histories: History[] = await getHistory();
  const sortedList = histories.sort(
    (a: History, b: History) =>
      new Date(a.purchased).getTime() - new Date(b.purchased).getTime()
  );
  const getItem = async () => {
    return await actions.getAllItem();
  };
  const items: Item[] = await getItem();
  return (
    <div>
      <BoughtView sortedList={sortedList} items={items} />
    </div>
  );
}
