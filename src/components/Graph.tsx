import React, { Component, ReactText } from "react";
import { Bar } from "react-chartjs-2";
import { CovidRecord } from "../interfaces/CovidRecord";

export default class Graph extends Component<PropType, StateType> {
  state = {};

  render() {
    const averageRange = 7;
    const data = {
      labels: this.props.dataLabels,
      datasets: [
        {
          type: "line",
          fill: false,
          borderColor: "#039BE5",
          label: "average",
          data: this.props.data.map((v, i, a) => {
            if (i < (averageRange-1)) {
              return 0;
            } 
            return (
              a
                .slice(i - (averageRange-1), i)
                .reduce((a: number, v: ReactText) => a + (v as number), 0) /
              averageRange
            );
          }),
        },
        {
          label: this.props.label,
          data: this.props.data,
          backgroundColor: "#3d9970",
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000",
        },
      ],
    };
    const options = {
      title: {
        display: true,
        text: this.props.title,
        fontSize: 25,
      },
      legend: {
        display: false,
      },
      maintainAspectRatio: false,
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
