import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
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
      return (
        <div>
          {this.state.covidRecords
            .filter(
              covidRecord =>
                covidRecord.state === "VA" &&
                covidRecord.positiveIncrease !== null
            )
            .map(covidRecord => (
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

export default App;
