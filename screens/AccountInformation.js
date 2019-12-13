import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView
} from "react-native";
import * as Font from "expo-font";
import { leftArrow, qrSVGYellow } from "../components/svg";
import QRCode from "react-native-qrcode-svg";
import { AsyncStorage } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { SvgXml } from "react-native-svg";
import {  searchMember } from "../api/apiTest";

import Spinner from "react-native-loading-spinner-overlay";

export default class AccountInformation extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    data: {},
    raw: {},
    id: '',
    imageServer:'sad',
    spinner: false,
    classification: ['Leader', 'Staff', 'Member']

  };

  async componentWillMount() {
    // this.setState({
    //   spinner: !this.state.spinner
    // });
    var info = this.props.navigation.getParam("data");
    this.setState({
      raw: info,
      imageServer: global.server + "images/"
    });
    console.log(info)
    this.setState({
      accountNumber: info.username,

      data: [
        { left: "Classification", right: this.state.classification[parseInt(info.classification_id)-1] },
        { left: "Branch ID", right: info.branch_id },
        { left: "Branch Name", right: info.name },
        { left: "First Name:", right: info.firstname },
        { left: "Last Name:", right: info.lastname },
        { left: "Middle Name:", right: info.middlename },
        { left: "Age:", right: info.age },
        { left: "Status", right: info.status },
        { left: "Birthdate:", right: info.birthdate },
        { left: "Contact No.", right: info.contact },
        {
          left: "Address:",
          right: info.address
        }
      ]
    });
  }

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
    if (result == "error") {
      alert("No User Found");
    } else {
      var info = result[0];
    this.setState({
      raw: info
    });
    this.setState({
      accountNumber: info.username,

      data: [
        { left: "Classification", right: this.state.classification[parseInt(info.classification_id)-1] },
        { left: "Branch ID:", right: info.branch_id },
        { left: "Branch Name:", right: info.name },

        { left: "First Name:", right: info.firstname },
        { left: "Last Name:", right: info.lastname },
        { left: "Middle Name:", right: info.middlename },
        { left: "Age:", right: info.age },
        { left: "Status", right: info.status },
        { left: "Birthdate:", right: info.birthdate },
        { left: "Contact No.", right: info.contact },
        {
          left: "Address:",
          right: info.address
        }
      ]
    });
      
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView style={styles.container}>
          <Spinner
          visible={this.state.spinner}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.containerUpper}>
          <View style={styles.containerHeader}>
            <View style={styles.containerHeaderLeft}>
              <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                <SvgXml
                  width={hp("3%").toString()}
                  height={hp("3%").toString()}
                  xml={leftArrow}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.containerHeadercenter}>
              <Text style={styles.textHeader}>Profile Info</Text>
            </View>
            <View style={styles.containerHeaderRight}>
              <SvgXml
                onPress={() =>
                  this.props.navigation.navigate("Scanner", {
                    scannedID: this.scannedID.bind(this)
                  })
                  // this.search("QRKP-YFAFLZD2-2019")
                }
                width={hp("6%").toString()}
                height={hp("6%").toString()}
                xml={qrSVGYellow}
              />
            </View>
          </View>
        </View>
        <View style={styles.containerLower}>
          <Text style={styles.textName}>
            {this.state.raw.firstname + " " + this.state.raw.lastname}
          </Text>
          <Text style={styles.textId}>{this.state.raw.username}</Text>
          <Image
            style={styles.imageSign}
            source={{
              uri:
                this.state.imageServer + "signatures/" +
                this.state.raw.username +
                ".png"
            }}
          />
         
          <View style={styles.containerList}>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <View style={styles.list}>
                  <View style={styles.containerLeft}>
                    <Text style={styles.textLeft}>{item.left}</Text>
                  </View>
                  <View style={styles.containerRight}>
                    {item.left == "Classification" ? (
                      <Text style={styles.textClassification}>
                        {item.right}
                      </Text>
                    ) : (
                      <Text>{item.right}</Text>
                    )}
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.list}>
              <View style={styles.containerLeft}>
                <Text style={styles.textLeft}>QR Code:</Text>
              </View>
              <View style={styles.containerRight}>
                <QRCode
                  // size = {"20%"}
                  value={this.state.accountNumber}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.badge}>
          <Image
            style={styles.imageProfile}
            source={{
              uri:
              this.state.imageServer + "pics/" +
              this.state.raw.username +
              ".png"
            }}
          />
          {console.log(this.state.imageServer + "pics/" +
              this.state.raw.username +
              ".png")}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },

  imageProfile: {
    width: hp("20%"),
    height: hp("20%"),
    borderRadius: 100
  },

  containerUpper: {
    height: hp("25%"),
    width: wp("100%"),
    backgroundColor: "#214AB9"
  },

  containerLower: {
    marginTop: hp("15%"),
    alignItems: "center",
    width: wp("100%")
  },

  badge: {
    top: hp("15%"),
    width: "100%",
    position: "absolute",
    alignItems: "center"
  },

  textName: {
    fontSize: wp("7%"),
    fontFamily: "Light",
    color: "black"
  },

  textId: {
    fontSize: wp("4%"),
    fontFamily: "Regular",
    color: "#A1A1A1"
  },

  imageSign: {
    width: wp("60%"),
    height: hp("20%"),
    marginTop: "3%",
    marginBottom: "10%"
  },

  imageSignContainer: {},

  containerList: {
    width: "80%"
  },

  list: {
    flexDirection: "row",
    marginBottom: hp("2%")
  },

  containerLeft: {
    flex: 1,
    justifyContent: "center"
  },
  containerRight: {
    flex: 2,
    flexWrap: "wrap"
  },

  textClassification: {
    backgroundColor: "black",
    color: "white",
    width: wp("20%"),
    textAlign: "center",
    borderRadius: 4,
    padding: wp("1.5%"),
    fontFamily: "Regular"
  },

  textLeft: {
    color: "#A1A1A1",
    fontFamily: "Regular"
  },

  containerHeader: {
    flexDirection: "row",
    marginTop: hp("5%")
  },

  containerHeaderLeft: {
    flex: 1,
    marginLeft: wp("10%"),
    justifyContent: "center"
  },
  containerHeadercenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  containerHeaderRight: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: wp("10%")
  },

  textHeader: {
    fontFamily: "Regular",
    color: "white",
    fontWeight: "bold",
    fontSize: wp("5%")
  }
});
