import React from "react";

import { AsyncStorage } from "react-native";
import * as SQLite from "expo-sqlite";
import Constants from "expo-constants";
const db = SQLite.openDatabase("db.db");

import Spinner from "react-native-loading-spinner-overlay";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import {
  Alert,
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput
} from "react-native";

export default class Configuration extends React.Component {
  static navigationOptions = {
    title: "Configuration",
    headerTitleStyle: {
      color: "white"
    },
    headerStyle: {
      backgroundColor: "#214AB9"
    },
    headerTintColor: "white"
  };

  state = {
    server: "",
    port: ""
  };

  componentDidMount() {
    // db.transaction(tx => {


      // tx.executeSql("select * from table_server", [], (_, { rows }) => {
      //   if (rows.length > 0) {
          this.setState({
            server: global.server
          });
    //     }
    //   });
    // });
  }


  update() {
    var text = this.state.server;
    db.transaction(tx => {
      tx.executeSql(
        "UPDATE table_server set value=? where id=1",
        [text],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            global.server = text
            Alert.alert(
              "Success",
              "User updated successfully",
              [
                { text: "Ok" }
              ],
              { cancelable: false }
            );
          } else {
            alert("Updation Failed");
          }
        }
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textStyle={styles.spinnerTextStyle}
        />

        <Text style={styles.text1}>Configuration</Text>

        <TextInput
          style={styles.inptIP}
          placeholderTextColor="lightgray"
          placeholder="server address"
          onChangeText={text => this.setState({ server: text })}
          value={this.state.server}
        />
        {/* <TextInput
          style={styles.inptPort}
          placeholderTextColor="lightgray"
          placeholder="Enter Port"
          onChangeText={text => this.setState({ port: text })}
          value={this.state.port}
        /> */}
        <TouchableOpacity style={styles.btnSave} onPress={() => this.update()}>
          <Text style={styles.text3}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: wp("10%"),
    paddingTop: hp("5%"),
    backgroundColor: "#214AB9"
  },

  text1: {
    fontSize: wp("8%"),
    color: "white",
    fontFamily: "Light",
    marginBottom: hp("2%")
  },

  text3: {
    fontSize: wp("3%"),
    color: "black",
    fontFamily: "Regular"
  },

  inptIP: {
    fontFamily: "Regular",
    marginTop: hp("5%"),
    borderBottomWidth: 1,
    borderColor: "#E6E6E6",
    width: "100%",
    paddingVertical: hp("1%"),
    color: "white",
    marginBottom: hp("10%")
  },

  inptPort: {
    fontFamily: "Regular",
    marginTop: hp("3%"),
    borderBottomWidth: 1,
    borderColor: "#E6E6E6",
    width: "100%",
    paddingVertical: hp("1%"),
    color: "white",
    marginBottom: hp("8%")
  },

  btnSave: {
    height: hp("7%"),
    alignItems: "center",
    borderRadius: 30,
    paddingVertical: hp("1.5%"),
    backgroundColor: "#FFF",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp("3%")
  }
});
