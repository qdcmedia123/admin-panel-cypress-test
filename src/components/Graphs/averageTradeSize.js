import React from "react";
import {
 
  Bar,

  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Line
} from "recharts";
import PropTypes from "prop-types";

const app = (props) => {
  return (
    <ResponsiveContainer width={"99%"} height={400}>
      <ComposedChart
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
        <YAxis yAxisId="right" orientation="right" label={{ value: "No. Of Trades", angle: -90, position: 'insideRight' }} />
        <Tooltip
          itemStyle={{
            fontWeight: "700",
            opacity: 1,
            textTransform: "capitalize",
          }}
        />
        <Legend />
        <Bar dataKey="avgTrades" fill="#017dff" name = "Average Trades"/>
        <Bar dataKey="totalTransactionAmount" fill="#82BFFF" name = "Total Transaction Amount"/>
        
        <Line yAxisId = "right" isAnimationActive={false} type="monotone" dataKey="noOfTrades" stroke="#FFA5B3"  strokeWidth = "2" name = "Number of trades"/>
      </ComposedChart>
    </ResponsiveContainer>
  );
};

app.prototype = {
  data: PropTypes.object.isRequired,
};

export default app;
