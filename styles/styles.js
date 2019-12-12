import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: '5%',
    paddingVertical: '10%',
  },

  brandName: {
    fontFamily: "open-sans-bold",
    fontSize: 30,
    color: "#FFF",
    fontWeight: "bold",
  },

  txtSignIn: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },

  btnSignIn: {
    width: "100%",
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 1
  },
});
