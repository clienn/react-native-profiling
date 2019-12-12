import React from "react";
import { qrSVG, gear, login } from "../components/svg";
import { initDatabase,signIn } from "../api/apiTest";
import { SvgXml } from "react-native-svg";
import Spinner from "react-native-loading-spinner-overlay";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  BackHandler,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { AsyncStorage } from "react-native";

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    //Setting up global variable
    global.server = '';
    global.token ='';
  }

  state = {
    id: "",
    password: "",
    token: "",
    spinner: false,
  };

  

  async componentWillMount() {
    global.server = await initDatabase();
  }
  scannedID(id) {
    this.setState({ id: id });
    console.log(id);
  }

  signIn = async () => {
    this.setState({
      spinner: !this.state.spinner
    });
    global.token = await signIn(this.state.id, this.state.password, global.server);
    this.setState({
      spinner: !this.state.spinner,
    });
    if (token == 'error') {
      alert("Invalid Credentials/Server Address");
    } else {
      global.id = this.state.id;

      this.props.navigation.navigate("DashBoard");
    }
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    return true;
  };

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textStyle={styles.spinnerTextStyle}
        />

        <View style={styles.containerConfigure}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Configuration")}
          >
            <SvgXml
              width={hp("3%").toString()}
              height={hp("3%").toString()}
              xml={gear}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.text1}>Members Profiling</Text>
        <Text style={styles.text2}>
          Please use QR Code ID scanner or type member code and password
        </Text>
        <SvgXml xml={login} />

        <TextInput
          style={styles.inptID}
          placeholderTextColor="lightgray"
          placeholder="Enter member code"
          onChangeText={text => this.setState({ id: text })}
          value={this.state.id}
        />
        <TextInput
          style={styles.inptPassword}
          placeholderTextColor="lightgray"
          placeholder="Enter Password"
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
        />
        <TouchableOpacity style={styles.btnLogin} onPress={() => this.signIn()}>
          <Text style={styles.text3}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Scanner", {
              scannedID: this.scannedID.bind(this)
            })
          }
          style={styles.btnScan}
        >
          <SvgXml xml={qrSVG} />

          <Text style={styles.text4}>Scan QR Code</Text>
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

  text2: {
    fontSize: wp("3%"),
    color: "white",
    fontFamily: "Regular",
    textAlign: "center",
    marginBottom: hp("7%")
  },

  text3: {
    fontSize: wp("3%"),
    color: "black",
    fontFamily: "Regular"
  },

  text4: {
    fontSize: wp("3%"),
    color: "#5D5757",
    fontFamily: "Regular",
    marginLeft: wp("2%")
  },

  imageCard: {
    // width: wp("60%"),
    // height: hp("20%")
  },

  inptID: {
    fontFamily: "Regular",
    marginTop: hp("5%"),
    borderBottomWidth: 1,
    borderColor: "#E6E6E6",
    width: "100%",
    paddingVertical: hp("1%"),
    color: "white"
  },

  inptPassword: {
    fontFamily: "Regular",
    marginTop: hp("3%"),
    borderBottomWidth: 1,
    borderColor: "#E6E6E6",
    width: "100%",
    paddingVertical: hp("1%"),
    color: "white",
    marginBottom: hp("8%")
  },

  btnScan: {
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 30,
    paddingVertical: hp("1.5%"),
    width: "100%",
    height: hp("7%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB100"
  },

  btnLogin: {
    height: hp("7%"),
    alignItems: "center",
    borderRadius: 30,
    paddingVertical: hp("1.5%"),
    backgroundColor: "#FFF",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp("3%")
  },

  spinnerTextStyle: {
    color: "#214AB9"
  },

  containerConfigure: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    alignItems: "center"
  }
});
