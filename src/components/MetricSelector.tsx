import React, { Component } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

export default class MetricSelector extends Component<PropType, StateType> {
  state = {
    selectedMetric: "positive"
  };

  render() {
    return (
      <div>
        <Autocomplete
          id="state-selector"
          options={this.props.metrics}
          style={{ margin: 20, width: 300 }}
          onChange={this.handleChange}
          renderInput={params => (
            <TextField {...params} label="Metric" variant="outlined" />
          )}
        />
      </div>
    );
  }

  handleChange = (event: React.ChangeEvent<{}>, value: string | null) => {
    if (value) {
      this.setState({ selectedMetric: value });
      this.props.updateMetric(value);
    }
  };
}

interface updateMetricFn {
  (metric: string): void;
}

type PropType = { updateMetric: updateMetricFn; metrics: string[] };
type StateType = { selectedMetric: string };
