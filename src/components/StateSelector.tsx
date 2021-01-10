import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  UsStatesTerritories,
  UsStateTerritory,
} from "../interfaces/UsStatesTerritories";
import { Box } from "@material-ui/core";

export default class StateSelector extends Component<PropType, StateType> {
  state = {};

  render() {
    return (
      <Box flexGrow={"1"} style={{ margin: 20 }}>
        <Autocomplete
          id="state-selector"
          autoSelect
          fullWidth
          autoComplete
          autoHighlight
          openOnFocus
          options={UsStatesTerritories as any}
          getOptionLabel={(option: UsStateTerritory) => option.name}
          onChange={this.handleChange}
          value={this.props.selectedState}
          renderInput={(params) => (
            <TextField {...params} label="State" variant="outlined" />
          )}
        />
      </Box>
    );
  }

  handleChange = (
    event: React.ChangeEvent<{}>,
    value: UsStateTerritory | null
  ) => {
    if (value) {
      this.props.updateState(value);
    }
  };
}

interface updateStateFn {
  (usState: UsStateTerritory): void;
}

type PropType = {
  updateState: updateStateFn;
  usStates: string[];
  selectedState: UsStateTerritory;
};
type StateType = {};
