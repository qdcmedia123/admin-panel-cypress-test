import React from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";
import { PropTypes } from "prop-types";

const ClientReport = (props) => {
  return (
    <ResponsiveContainer width={"99%"} height={400}>
      <BarChart
        width={1}
        height={400}
        data={props.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip
          itemStyle={{
            fontWeight: "700",
            opacity: 1,
            textTransform: "capitalize",
          }}
        />
        <Legend />
        {props.whichAttribute === "active" ? (
          <Bar
            isAnimationActive={false}
            type="monotone"
            dataKey="active"
            stroke="#6898cc"
            strokeWidth="1"
            fill="#82BFFF"
          />
        ) : (
          <Bar
            isAnimationActive={false}
            type="monotone"
            dataKey="approved"
            stroke="#017dff"
            strokeWidth="1"
            fill="#017dff"
          />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};

ClientReport.propstype = {
  whichAttribute: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};
export default ClientReport;
