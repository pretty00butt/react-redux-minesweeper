import React from "react"
import PropTypes from "prop-types"

export default class MineBoxLayout extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    onContextMenu: PropTypes.func
  }

  render() {
    const { onClick, onContextMenu } = this.props

    return (
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          border: "1px solid rgba(0, 0, 0, 0.8)",
          padding: "20px",
          fontSize: "30px",
          textAlign: "center",
          cursor: "pointer"
        }}
        onClick={onClick ? onClick : null}
        onContextMenu={onContextMenu ? onContextMenu : null}
      >
        {this.props.children}
      </div>
    )
  }
}
