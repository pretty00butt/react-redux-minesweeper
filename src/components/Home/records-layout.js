import React from "react"

export default class RecordsLayout extends React.Component {
  render() {
    return (
      <section>
        <h3>Records</h3>
        <ol>{this.props.children}</ol>
      </section>
    )
  }
}
