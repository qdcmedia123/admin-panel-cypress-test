import React from "react";
import PropTypes from "prop-types";

class CustomTooltip extends React.Component {
  getIntroOfPage(label) {
    if (label === "value") {
      return "Number of leads";
    } else if (label === "name") {
      return label;
    }
  }

  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;
      return (
        <div className="custom-tooltip">
          <p className="label">{`Age Group ${label} : ${payload[0].value} ${
            this.props.section
          } (${((payload[0].value / this.props.total) * 100).toFixed(
            2
          )} %)`}</p>
          {/*
            <p className="intro">{this.getIntroOfPage(label)}</p>
            <p className="desc"></p>
            */}
        </div>
      );
    }

    return null;
  }
}

CustomTooltip.propTypes = {
  type: PropTypes.string,
  payload: PropTypes.array,
  label: PropTypes.string,
};

export default CustomTooltip;
