import * as historyAction from "@/lib/historyAction";
import * as actions from "@/lib/action";
import type { History, Item } from "@/types";
import ChartView from "@/components/ChartView";

export default async function HistoryPage() {
  const getHistory = async () => {
    return await historyAction.getAllHistory();
  };
  const histories: History[] = await getHistory();

  const getItem = async () => {
    return await actions.getAllItem();
  };
  const items: Item[] = await getItem();
  return (
    <div>
      <ChartView histories={histories} items={items} />
    </div>
  );
}
