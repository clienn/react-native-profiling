import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  TextInput,
  View,
  Text,
  StyleSheet,
  FlatList
} from "react-native";
import * as Font from "expo-font";
import { AsyncStorage } from "react-native";
import {
  search,
  qrSVGYellow,
  rightArrow,
  leftArrow,
  rightArrowGray,
  logout
} from "../components/svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Spinner from "react-native-loading-spinner-overlay";
import { memberList, scan } from "../api/api";
import { getServer, getMemberList, searchMember } from "../api/apiTest";

import { SvgXml } from "react-native-svg";
console.ignoredYellowBox = ["Remote debugger"];

export default class DashboardScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    data: [],
    id: "",
    myId: "",
    pageInfo: {},
    spinner: false,
    imageServer: ""
  };

  scannedID(id) {
    this.setState({ id: id });
    this.search(id);
  }

  search = async id => {
    this.setState({
      spinner: !this.state.spinner
    });

    var result = await searchMember(global.token, global.id, id, global.server);
    this.setState({
      spinner: !this.state.spinner
    });
    if (result.length == 0) {
      alert("No User Found");
    } else {
      this.props.navigation.navigate("AccountInformation", {
        data: result[0],
      });
    }
  };

  async componentDidMount() {
    console.log(global.server)
    console.log(global.id)
    console.log(global.token)
    this.setState({
      imageServer: global.server + "images/",
      server: global.server
    });
    var raw = await getMemberList(global.token, " ", global.server);
    if (raw != undefined) {
      this.setState({
        pageInfo: raw[raw.length - 1]
      });
      raw.pop();
      this.setState({
        data: raw
      });
    }
  }

  prev = async () => {
    var raw = await getMemberList(global.token, " ", global.server);

    if (raw != undefined) {
      this.setState({
        pageInfo: raw[raw.length - 1]
      });
      raw.pop();
      this.setState({
        data: raw
      });
    }
  };

  next = async () => {
    var raw = await getMemberList(global.token, " ", global.server);
    if (raw != undefined) {
      this.setState({
        pageInfo: raw[raw.length - 1]
      });
      raw.pop();
      this.setState({
        data: raw
      });
    }
  };

  logout = async () => {
    global.id = ""
    global.token = ""
    this.props.navigation.navigate("SignIn");
  };

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.containerUpper}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <TouchableOpacity onPress={() => this.logout()}>
              <SvgXml
                onPress={() => this.logout()}
                width={hp("5%").toString()}
                height={hp("5%").toString()}
                xml={logout}
              />
            </TouchableOpacity>
            <Text style={styles.logout}>Sign Out</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Scanner", {
                scannedID: this.scannedID.bind(this)
              })
              // this.search("QRKP-YFAFLZD2-2019")
            }
          >
            <SvgXml
              width={hp("6%").toString()}
              height={hp("6%").toString()}
              xml={qrSVGYellow}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.containerBottom}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("AccountInformation", {
                    data: item,
                    server: this.state.server,
                    token: this.props.navigation.getParam("token"),
                    id: this.props.navigation.getParam("id"),
                    server: this.props.navigation.getParam("server")
                  })
                }
              >
                <View style={styles.card}>
                  <Image
                    style={styles.imageProfile}
                    source={{
                      uri:
                        this.state.imageServer +
                        "pics/" +
                        item.username +
                        ".png"
                    }}
                  />
                  {console.log(
                    this.state.imageServer + "pics/" + item.username + ".png"
                  )}
                  <View>
                    <Text style={styles.textName}>
                      {item.firstname + " " + item.lastname}
                    </Text>
                    <Text style={styles.textName}>{item.username}</Text>
                  </View>
                  <View style={styles.arrowContainer}>
                    <SvgXml
                      width={hp("2%").toString()}
                      height={hp("2%").toString()}
                      xml={rightArrowGray}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={styles.containerPagination}>
          <View>
            <TouchableOpacity
              style={styles.containerPageNav}
              onPress={() => this.prev()}
            >
              <SvgXml
                marginRight={wp("2%")}
                width={hp("2%").toString()}
                height={hp("2%").toString()}
                xml={leftArrow}
              />
              <Text style={styles.textPage}>Previous</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.containerPageNav}
              onPress={() => this.next()}
            >
              <Text style={styles.textPage}>Next</Text>

              <SvgXml
                marginLeft={wp("2%")}
                width={hp("2%").toString()}
                height={hp("2%").toString()}
                xml={rightArrow}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  containerUpper: {
    paddingTop: "5%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: wp("5%"),
    flex: 1,
    backgroundColor: "#214AB9"
  },

  containerBottom: {
    flex: 5,
    backgroundColor: "white"
  },

  card: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: hp("10%"),
    marginBottom: hp("1%"),
    backgroundColor: "white",
    alignItems: "center",
    paddingLeft: wp("5%")
  },

  textName: {
    marginLeft: wp("2%"),
    fontFamily: "Regular",
    color: "black"
  },

  textLastName: {
    fontFamily: "Regular",
    color: "white"
  },

  imageProfile: {
    width: hp("7%"),
    height: hp("7%"),
    borderRadius: 100 / 2
  },

  inptID: {
    fontFamily: "Regular",
    borderColor: "#E6E6E6",
    paddingVertical: hp("1%"),
    color: "white",
    width: wp("60%")
  },

  arrowContainer: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: wp("5%")
  },

  containerPagination: {
    flex: 0.5,
    backgroundColor: "#214AB9",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },

  containerPageNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  textPage: {
    fontFamily: "Regular",
    color: "#E6E6E6"
  },

  logout: {
    marginLeft: wp("3%"),
    fontFamily: "Regular",
    color: "#FFF",
    fontWeight: "bold"
  }
});
