import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import HoldingInterface from "../Interfaces/HoldingInterface";

interface HoldingsPieChartProps {
  holdings: HoldingInterface[];
}

const HoldingsPieChart: React.FC<HoldingsPieChartProps> = ({ holdings }) => {
  if (!holdings || holdings.length === 0) {
    return <p>No holdings available.</p>;
  }

  const data = holdings.map((h) => ({
    name: h.ticker,
    value: h.units * h.unitprice,
  }));

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a4de6c"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius="80%"
          fill="#8884d8"
          label
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default HoldingsPieChart;
