import React, { Component } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import {
  MetricFriendlyNames,
  MetricFriendlyName
} from "../interfaces/MetricFriendlyNames";

export default class MetricSelector extends Component<PropType, StateType> {
  state = {};

  render() {
    return (
      <div>
        <Autocomplete
          id="metric-selector"
          autoHighlight
          openOnFocus
          options={MetricFriendlyNames as any}
          getOptionLabel={(option: MetricFriendlyName) => option.friendlyName}
          style={{ margin: 20, width: 300 }}
          onChange={this.handleChange}
          renderInput={params => (
            <TextField {...params} label="Metric" variant="outlined" />
          )}
        />
      </div>
    );
  }

  handleChange = (
    event: React.ChangeEvent<{}>,
    value: MetricFriendlyName | null
  ) => {
    if (value) {
      this.props.updateMetric(value);
    }
  };
}

interface updateMetricFn {
  (metric: MetricFriendlyName): void;
}

type PropType = { updateMetric: updateMetricFn; metrics: string[] };
type StateType = {};
