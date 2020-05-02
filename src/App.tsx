import { Box } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import * as React from "react";
import { Component } from "react";
import { Bar } from "react-chartjs-2";
import "./App.css";
import StateSelector from "./components/StateSelector";
import MetricSelector from "./components/MetricSelector";
import { UsStateTerritory } from "./interfaces/UsStatesTerritories";

class App extends Component<PropType, StateType> {
  covidRecord = new CovidRecord();

  state = {
    loading: true,
    usStateAbbrev: "VA",
    usStateName: "Virginia",
    metric: "positive" as CovidRecordKey,
    covidRecords: []
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
          covidRecord.state === this.state.usStateAbbrev &&
          covidRecord.positiveIncrease !== null
      );
      const data = {
        labels: vaRecords.map((cr: CovidRecord) =>
          moment(cr.date, "YYYYMMDD").format("MMM Do")
        ),
        datasets: [
          {
            label: "New Positives",
            data: vaRecords.map((cr: CovidRecord) => cr[this.state.metric]),
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
          text: `${this.state.usStateName} ${this.state.metric}`,
          fontSize: 25
        },
        legend: {
          display: false
        }
      };
      return (
        <Box style={{ height: "50%" }}>
          <Box display={"flex"} flexDirection={"row"}>
            <StateSelector
              updateState={this.updateState}
              usStates={[
                ...new Set(
                  this.state.covidRecords.map((cr: CovidRecord) => cr.state)
                )
              ]}
            ></StateSelector>
            <MetricSelector
              updateMetric={this.updateMetric}
              metrics={Object.keys(this.covidRecord)}
            ></MetricSelector>
          </Box>
          <Bar data={data} options={options} />
        </Box>
      );
    }
  }

  updateState = (state: UsStateTerritory) =>
    this.setState({ usStateAbbrev: state.abbrev, usStateName: state.name });
  updateMetric = (metric: string) =>
    this.setState({ metric: metric as CovidRecordKey });
  onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    this.setState({ usStateAbbrev: "" });
  };
}

type PropType = {};
type StateType = {
  loading: boolean;
  usStateAbbrev: string;
  usStateName: string;
  metric: CovidRecordKey;
  covidRecords: CovidRecord[];
};

class CovidRecord {
  date = 0;
  state = "";
  positive = 0;
  negative = 0;
  pending = 0;
  hospitalizedCurrently = 0;
  hospitalizedCumulative = 0;
  inIcuCurrently = 0;
  inIcuCumulative = 0;
  onVentilatorCurrently = 0;
  onVentilatorCumulative = 0;
  recovered = 0;
  hash = "";
  dateChecked = "";
  death = 0;
  hospitalized = 0;
  total = 0;
  totalTestResults = 0;
  posNeg = 0;
  fips = "";
  deathIncrease = 0;
  hospitalizedIncrease = 0;
  negativeIncrease = 0;
  positiveIncrease = 0;
  totalTestResultsIncrease = 0;
}

type CovidRecordKey = keyof CovidRecord;

export default App;
