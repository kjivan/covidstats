import React, { Component } from "react";
import { Typeahead } from "react-bootstrap-typeahead";

export default class Search extends Component<PropType, StateType> {
  state = {
    usState: "VA"
  };

  render() {
    return (
      <div>
        <Typeahead onChange={this.onChange} options={this.props.usStates} />
      </div>
    );
  }
  onChange = (selectedState: string[]) => {
    this.setState({ usState: selectedState[0] });
    this.props.updateGraph(selectedState[0]);
  };
}

interface updateGraphFn {
  (usState: string): void;
}

type PropType = { updateGraph: updateGraphFn; usStates: string[] };
type StateType = {};
