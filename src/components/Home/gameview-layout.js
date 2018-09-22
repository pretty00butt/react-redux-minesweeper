import React from "react"

export default class GameViewLayout extends React.Component {
  render() {
    return <section>{this.props.children}</section>
  }
}
