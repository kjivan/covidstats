import * as React from "react";
import { Bar } from "react-chartjs-2";
import { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component<PropType, StateType> {
  state = {
    covidRecords: [],
    loading: true
  };

  getCovidTrackingData = async () => {
    const res = await axios.get(
      "https://covidtracking.com/api/v1/states/daily.json"
    );
    this.setState({ covidRecords: res.data, loading: false });
  };

  componentDidMount() {
    this.getCovidTrackingData();
  }

  render() {
    if (this.state.loading) {
      return <div>loading</div>;
    } else {
      const vaRecords = this.state.covidRecords.filter(
        (covidRecord: CovidRecord) =>
          covidRecord.state === "VA" && covidRecord.positiveIncrease !== null
      );
      const data = {
        labels: vaRecords.map((cr: CovidRecord) => cr.date),
        datasets: [
          {
            label: "New Positives",
            data: vaRecords.map((cr: CovidRecord) => cr.positiveIncrease)
          }
        ]
      };
      return (
        <div>
          <Bar data={data} />
          {vaRecords.map((covidRecord: CovidRecord) => (
            <div key={covidRecord.date + covidRecord.state}>
              {covidRecord.date} &nbsp; {covidRecord.state} &nbsp;
              {covidRecord.positiveIncrease}
            </div>
          ))}
        </div>
      );
    }
  }
}

type PropType = {};
type StateType = {
  loading: boolean;
  covidRecords: CovidRecord[];
};
type CovidRecord = {
  date: number;
  state: string;
  positive: number;
  negative: number;
  pending: number;
  hospitalizedCurrently: number;
  hospitalizedCumulative: number;
  inIcuCurrently: number;
  inIcuCumulative: number;
  onVentilatorCurrently: number;
  onVentilatorCumulative: number;
  recovered: number;
  hash: string;
  dateChecked: string;
  death: number;
  hospitalized: number;
  total: number;
  totalTestResults: number;
  posNeg: number;
  fips: string;
  deathIncrease: number;
  hospitalizedIncrease: number;
  negativeIncrease: number;
  positiveIncrease: number;
  totalTestResultsIncrease: number;
};

export default App;
