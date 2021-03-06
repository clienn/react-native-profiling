import fetch from "react-native-fetch-polyfill";
import { AsyncStorage } from "react-native";
import * as SQLite from "expo-sqlite";
import Constants from "expo-constants";
const db = SQLite.openDatabase("db.db");

export const initDatabase = async (username, password) => {
  return new Promise((resolve, reject) => {
    var defaultServer = "http://qrkpamisprofile.online/";
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists table_server (id integer primary key not null, value text);"
      );
      tx.executeSql("select * from table_server", [], (_, { rows }) => {
        if (rows.length > 0) {
          console.log("server: ", rows["_array"][0].value);
          resolve(rows["_array"][0].value);
        } else {
          // console.log("empty");
          db.transaction(tx => {
            tx.executeSql("insert into table_server (value) values (?)", [
              defaultServer
            ]);
          }, null);
          resolve(defaultServer);
        }
      });
    });
  });
};

export const signIn = async (username, password, server) => {
  var url = server + "api/login";
  // console.log(url)
  return fetch(url, {
    timeout: 10 * 1000,
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
    .then(response => response.json())
    .then(res => {
      if (typeof res.message != "undefined") {
        // console.log("Error: " + res.message);
        return("error 1");
      } else {
        // console.log("Success fetching token");
        // console.log("Token: ", res.access_token);
        return res.access_token;
      }
    })
    .catch(error => {
      // console.log(error);
      return "error 2";
    });
};

export const getMemberList = async (token, bear, server) => {
  var url = server + "api/members" + bear;
  console.log(url);
  return fetch(url, {
    timeout: 10 * 1000,
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  })
    .then(response => response.json())
    .then(res => {
      if (typeof res.message != "undefined") {
        console.log("Error: " + res.message);
      } else {
        console.log("Success Fetching members");
        console.log(Object.values(res));
        return Object.values(res);
      }
    })
    .catch(error => {
      //   console.error(error);
      // console.log(error);
      return "error";
    });
};

export const searchMember = async (token, userID, searchID, server) => {
  var url = server + "api/scan";
  return fetch(url, {
    method: "put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({
      id: userID,
      qr_code: searchID
    })
  })
    .then(response => response.json())
    .then(res => {
      if (typeof res.message != "undefined") {
        console.log("Error: " + res.message);
        return "error"
      } else {
        return(res);
      }
    })
    .catch(error => {
      // console.error(error);
      return("error");
    });
};
