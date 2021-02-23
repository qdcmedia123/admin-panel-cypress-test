import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import PropType from "prop-types";

const COLORS = [
  "#017DFF",
  "#04B600",
  "#FF0000",
  "#EDB900",
  "#C61D3A",
  "#9E3062",
  "#5256AE",
];

const App = (props) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">
            {`${payload[0].name} : ${payload[0].value}`} %
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <PieChart width={300} height={400}>
      <Pie
        data={props.data}
        cx={120}
        cy={170}
        labelLine={false}
        outerRadius={120}
        fill="#8884d8"
        dataKey="value"
        isAnimationActive={false}
      >
        {props.data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
    </PieChart>
  );
};

App.prototype = {
  data: PropType.object.isRequired,
};
export default App;
