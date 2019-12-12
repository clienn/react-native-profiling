import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  Dimensions,
  View,
  Text,
  StyleSheet
} from "react-native";
import * as Font from "expo-font";
import GradientBackground from "../components/gradientBackground";
// import styles from "../styles/styles";

export default class Homescreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    fontLoaded: false
  };
  async componentDidMount() {
    await Font.loadAsync({
      "Regular": require("../assets/fonts/WorkSans-Regular.ttf"),
      "Light": require("../assets/fonts/WorkSans-Light.ttf")

    });

    this.setState({ fontLoaded: true });
    this.props.navigation.navigate("SignIn")
  }

  render() {
    return this.state.fontLoaded ? (
      <GradientBackground>
        {/* <View style={styles.container}>
          <View style={localStyles.c1}>
            <Text style={styles.brandName, {fontSize: 30}}>Application</Text>
          </View>
          <View style={localStyles.c2}>
            <Text style={styles.brandName}>Insert Objects here</Text>
          </View>
          <View style={localStyles.c3}>
            <TouchableOpacity style={styles.btnSignIn} onPress = {() => this.props.navigation.navigate("SignIn")}>
              <Text style={styles.txtSignIn}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </GradientBackground>
    ) : null;
  }
}

const localStyles = StyleSheet.create({
  c1: {
    flex: 1,
    width: "100%"
  },

  c1: {
    flex: 1,
    width: "100%"
  },

  c3: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%"
  }
});
