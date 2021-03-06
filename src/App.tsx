import { Box } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import * as React from "react";
import { Component } from "react";
import "./App.css";
import StateSelector from "./components/StateSelector";
import MetricSelector from "./components/MetricSelector";
import { UsStateTerritory } from "./interfaces/UsStatesTerritories";
import { MetricFriendlyName } from "./interfaces/MetricFriendlyNames";
import Graph from "./components/Graph";
import { CovidRecordKey, CovidRecord } from "./interfaces/CovidRecord";
import Spinner from "./components/Spinner";

class App extends Component<PropType, StateType> {
  covidRecord = new CovidRecord();

  state = {
    loading: true,
    usStateAbbrev: "VA",
    usStateName: "Virginia",
    metric: "positive" as CovidRecordKey,
    metricFriendlyName: "Positive Tests",
    covidRecords: [],
  };

  getCovidTrackingData = async () => {
    const res = await axios.get(
      "https://api.covidtracking.com/v1/states/daily.json"
    );
    this.setState({ covidRecords: res.data, loading: false });
  };

  componentDidMount() {
    this.getCovidTrackingData();
  }

  render() {
    if (this.state.loading) {
      return <Spinner />;
    } else {
      const records = this.state.covidRecords
        .filter(
          (covidRecord: CovidRecord) =>
            covidRecord.state === this.state.usStateAbbrev &&
            covidRecord.positiveIncrease !== null
        )
        .reverse();

      return (
        <Box>
          <Box display={"flex"} flexDirection={"row"}>
            <StateSelector
              selectedState={{
                abbrev: this.state.usStateAbbrev,
                name: this.state.usStateName,
              }}
              updateState={this.updateState}
              usStates={[
                ...new Set(
                  this.state.covidRecords.map((cr: CovidRecord) => cr.state)
                ),
              ]}
            ></StateSelector>
            <MetricSelector
              selectedMetric={{
                metric: this.state.metric,
                friendlyName: this.state.metricFriendlyName,
              }}
              updateMetric={this.updateMetric}
              metrics={Object.keys(this.covidRecord)}
            ></MetricSelector>
          </Box>
          <Box height="75vh">
            <Graph
              records={records}
              dataLabels={records.map((cr: CovidRecord) =>
                moment(cr.date, "YYYYMMDD").format("MMM Do")
              )}
              data={records.map((cr: CovidRecord) => cr[this.state.metric])}
              label={this.state.metricFriendlyName}
              title={`${this.state.usStateName} - ${this.state.metricFriendlyName}`}
            ></Graph>
          </Box>
          <div style={{ margin: 20, fontSize: "xx-small" }}>
            <p>
              Date provided by
              <a href="https://covidtracking.com/" target="_blank">
                The COVID Tracking Project
              </a>
            </p>
            <p>Favicon made by Freepik from www.flaticon.com</p>
          </div>
        </Box>
      );
    }
  }

  updateState = (state: UsStateTerritory) =>
    this.setState({ usStateAbbrev: state.abbrev, usStateName: state.name });
  updateMetric = (metricFriendlyName: MetricFriendlyName) =>
    this.setState({
      metric: metricFriendlyName.metric as CovidRecordKey,
      metricFriendlyName: metricFriendlyName.friendlyName,
    });
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
  metricFriendlyName: string;
  covidRecords: CovidRecord[];
};

export default App;
