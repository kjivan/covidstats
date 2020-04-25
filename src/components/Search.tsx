import React, { Component } from "react";

export default class Search extends Component<PropType, StateType> {
  state = {
    usState: "VA"
  };

  render() {
    return (
      <div>
        <form className="form">
          <input
            type="text"
            name="state"
            placeholder="State..."
            value={this.state.usState}
            onChange={this.onChange}
          />
        </form>
      </div>
    );
  }
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ usState: e.target.value });
    this.props.updateGraph(e.target.value);
  };
}

interface updateGraphFn {
  (usState: string): void;
}

type PropType = { updateGraph: updateGraphFn };
type StateType = {};
