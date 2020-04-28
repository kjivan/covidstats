import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default class StateSelector extends Component<PropType, StateType> {
  state = {
    selectedState: "VA"
  };

  render() {
    return (
      <div>
        <Autocomplete
          id="state-selector"
          options={this.props.usStates}
          style={{ margin: 20, width: 300 }}
          onChange={this.handleChange}
          renderInput={params => (
            <TextField {...params} label="State" variant="outlined" />
          )}
        />
      </div>
    );
  }

  handleChange = (event: React.ChangeEvent<{}>, value: string | null) => {
    if (value) {
      this.setState({ selectedState: value });
      this.props.updateState(value);
    }
  };
}

interface updateStateFn {
  (usState: string): void;
}

type PropType = { updateState: updateStateFn; usStates: string[] };
type StateType = { selectedState: string };
