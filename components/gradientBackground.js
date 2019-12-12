import React, { Component } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default class GradientBackground extends Component {
  render() {
    const { children: renderProp } = this.props;

    return (
      <LinearGradient colors={["#214AB9", "#214AB9"]} style={{ flex: 1 }}>
        {renderProp}
      </LinearGradient>
    );
  }
}
