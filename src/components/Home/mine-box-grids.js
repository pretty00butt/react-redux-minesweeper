import React from "react"

export default class MineBoxGrids extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto ",
          width: "200px"
        }}
      >
        {this.props.children}
      </div>
    )
  }
}
