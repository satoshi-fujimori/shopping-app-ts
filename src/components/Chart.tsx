import type { History } from "@/types";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";

export default function Chart({
  list,
  YaxisKey,
}: {
  list: History[];
  YaxisKey: string;
}) {
  //sortメソッドのコールバック
  const sortByDate = (a: History, b: History) => {
    return new Date(a.purchased).getTime() - new Date(b.purchased).getTime();
  };
  const sortedList: History[] = [...list].sort(sortByDate);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MM/dd");
  };
  const minDataValue = Math.min(
    ...sortedList.map((item) => Number(item[YaxisKey as keyof History]))
  );
  const maxDataValue = Math.max(
    ...sortedList.map((item) => Number(item[YaxisKey as keyof History]))
  );
  const yAxisDomain = [minDataValue, maxDataValue];

  return (
    <div className="p-2 m-2 overflow-x-auto">
      <p className="m-2 p-2 text-xl">{YaxisKey}Chart</p>
      <ResponsiveContainer
        width="100%"
        height={200}
        style={{
          backgroundColor: "white",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <LineChart
          data={sortedList}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="category"
            dataKey="purchased"
            tickFormatter={formatDate}
          />
          <YAxis dataKey={YaxisKey} domain={yAxisDomain} />
          <Line type="monotone" dataKey={YaxisKey} stroke="#8884d8" />
          <Legend />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
