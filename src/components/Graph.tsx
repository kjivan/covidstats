import React, { Component, ReactText } from "react";
import { Bar } from "react-chartjs-2";
import { CovidRecord } from "../interfaces/CovidRecord";

export default class Graph extends Component<PropType, StateType> {
  state = {};

  render() {
    const data = {
      labels: this.props.dataLabels,
      datasets: [
        {
          label: this.props.label,
          data: this.props.data,
          backgroundColor: "#3d9970",
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000"
        }
      ]
    };
    const options = {
      title: {
        display: true,
        text: this.props.title,
        fontSize: 25
      },
      legend: {
        display: false
      }
    };
    return <Bar data={data} options={options} />;
  }
}

type PropType = {
  data: ReactText[];
  records: CovidRecord[];
  dataLabels: string[];
  label: string;
  title: string;
};
type StateType = {};
