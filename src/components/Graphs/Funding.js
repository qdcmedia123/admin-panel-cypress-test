import React from "react";
import PropTypes from 'prop-types';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const FundingGraph = (props) => {
  return (
    <ResponsiveContainer width={"99%"} height={400}>
      <BarChart
        width={500}
        height={300}
        data={props.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} stroke="#000" />
        <Bar isAnimationActive={false} dataKey="deposit" fill="#017DFF" />
        <Bar isAnimationActive={false} dataKey="withdrawals" fill="#FF0000" />
      </BarChart>
    </ResponsiveContainer>
  );
};

FundingGraph.proptype = {
  data: PropTypes.object.isRequired
}

export default FundingGraph;
