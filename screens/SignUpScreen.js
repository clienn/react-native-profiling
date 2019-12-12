import React from "react";
import {
  TouchableOpacity,
  Dimensions,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput
} from "react-native";
import * as Font from "expo-font";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

function hp(percentage) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textBranding}>SwiftCase</Text>
        <TouchableOpacity style={styles.btnGoogle}>
          <Image
            style={styles.iconGoogle}
            source={require("../assets/icons/google.png")}
          />
          <Text style={styles.textGoogle}>Sign Up With Google</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.inputEmail}
          placeholder="Email Address"
        ></TextInput>
        <TextInput
          secureTextEntry={true}
          style={styles.inputPassword}
          placeholder="Password"
        ></TextInput>
        <TextInput
          secureTextEntry={true}
          style={styles.inputPassword}
          placeholder="Re - type Password"
        ></TextInput>
        <Text style={styles.textTerms}>
          {"By signing up I accept the terms of use" +
            "\n" +
            "and the data privacy policy"}
        </Text>

        <TouchableOpacity style={styles.btnSignUp}>
          <Text style={styles.textSignUp}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: "10%",
    paddingVertical: "10%",
    alignItems: "center"
  },

  textBranding: {
    fontFamily: "open-sans-bold",

    fontSize: 40,
    color: "#ccc",
    fontWeight: "bold",
    marginBottom: "10%",
    marginTop: "7%"
  },

  btnGoogle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dcdcdc",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    width: "100%",
    height: "8%"
  },

  textGoogle: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    color: "#A0A0A0",
    fontWeight: "bold"
  },

  iconGoogle: {
    width: wp(5),
    height: wp(5),
    marginRight: "3%"
  },

  inputEmail: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    width: "100%",
    height: "8%",
    marginTop: "7%",
    paddingLeft: "4%"
  },

  inputPassword: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    width: "100%",
    height: "8%",
    marginTop: "6%",
    paddingLeft: "4%"
  },

  textTerms: {
    fontFamily: "open-sans-bold",
    marginTop: "6%",
    fontSize: 12,
    color: "#ccc",
    textAlign: "center",
    marginBottom: "50%"
  },
  textSignUp: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    color: "#A0A0A0",
    fontWeight: "bold"
  },

  btnSignUp: {
    width: "100%",
    height: "8%",
    backgroundColor: "#dcdcdc",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30
  }
});
