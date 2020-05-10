import React, { Component } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, Box } from "@material-ui/core";
import {
  MetricFriendlyNames,
  MetricFriendlyName
} from "../interfaces/MetricFriendlyNames";

export default class MetricSelector extends Component<PropType, StateType> {
  state = {};

  render() {
    return (
      <Box flexGrow={"1"} style={{ margin: 20 }}>
        <Autocomplete
          id="metric-selector"
          autoHighlight
          openOnFocus
          fullWidth
          options={MetricFriendlyNames as any}
          getOptionLabel={(option: MetricFriendlyName) => option.friendlyName}
          onChange={this.handleChange}
          renderInput={params => (
            <TextField {...params} label="Metric" variant="outlined" />
          )}
        />
      </Box>
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
