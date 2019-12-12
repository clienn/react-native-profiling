import React from "react";
import {
  TouchableOpacity,
  Dimensions,
  View,
  Text,
  StyleSheet
} from "react-native";
import * as Font from "expo-font";

export default class LoadingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: "8%",
    paddingVertical: "10%",
    alignItems: 'center',
    justifyContent: 'center'
  }
});
