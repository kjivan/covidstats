import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default class Search extends Component<PropType, StateType> {
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
            <TextField {...params} label="Combo box" variant="outlined" />
          )}
        />
      </div>
    );
  }

  handleChange = (event: React.ChangeEvent<{}>, value: string | null) => {
    if (value) {
      this.setState({ selectedState: value });
      this.props.updateGraph(value);
    }
  };
}

interface updateGraphFn {
  (usState: string): void;
}

type PropType = { updateGraph: updateGraphFn; usStates: string[] };
type StateType = { selectedState: string };
