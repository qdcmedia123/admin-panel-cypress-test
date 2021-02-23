import React from "react";
import {
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";
import PropTypes from "prop-types";
import CustomTooltip from "./CustomToltip";

const DashboardPieChart = (props) => {
  //const totalLeads = getSum()

  return (
    <div className="pie__container">
      {props.section !== "Leads" && (
        <div className="block__graph">
          <h2 className="locationMap__text price__evolution">Gender</h2>
          <div className="gender__graph__warper">
            <div className="p__item left__bar">
              Femals {props.genderData.female}
            </div>
            <div
              className="p__item right__bar bg__green"
              style={{
                width:
                  "" +
                  ((props.genderData.female / props.total) * 100).toFixed(2) +
                  "%",
              }}
            >
              {((props.genderData.female / props.total) * 100).toFixed(2)} %
            </div>
          </div>

          <div className="gender__graph__warper">
            <div className="p__item left__bar">
              Male {props.genderData.male}
            </div>
            <div
              className="p__item right__bar bg__blue"
              style={{
                width:
                  "" +
                  ((props.genderData.male / props.total) * 100).toFixed(2) +
                  "%",
              }}
            >
              {((props.genderData.male / props.total) * 100).toFixed(2)} %
            </div>
          </div>
        </div>
      )}

      <div className="block__graph">
        <h2 className="locationMap__text price__evolution">Age Group</h2>
        <BarChart width={730} height={417} data={props.ageData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            content={
              <CustomTooltip section={props.section} total={props.total} type= 'Age Group'/>
            }
          />
          <Legend />
          <Bar dataKey="value" fill="#017DFF" />
        </BarChart>
      </div>
    </div>
  );
};

DashboardPieChart.propTypes = {
  ageData: PropTypes.array.isRequired,
  genderData: PropTypes.object.isRequired,
  section: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default DashboardPieChart;
