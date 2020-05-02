import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  UsStatesTerritories,
  UsStateTerritory
} from "../interfaces/UsStatesTerritories";

export default class StateSelector extends Component<PropType, StateType> {
  state = {};

  render() {
    return (
      <div>
        <Autocomplete
          id="state-selector"
          autoHighlight
          openOnFocus
          options={UsStatesTerritories as any}
          getOptionLabel={(option: UsStateTerritory) => option.name}
          style={{ margin: 20, width: 300 }}
          onChange={this.handleChange}
          renderInput={params => (
            <TextField {...params} label="State" variant="outlined" />
          )}
        />
      </div>
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

type PropType = { updateState: updateStateFn; usStates: string[] };
type StateType = {};
