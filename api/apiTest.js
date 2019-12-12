import fetch from "react-native-fetch-polyfill";
import { AsyncStorage } from "react-native";
import * as SQLite from "expo-sqlite";
import Constants from "expo-constants";
const db = SQLite.openDatabase("db.db");

export const initDatabase = async (username, password) => {
  var defaultServer = "http://qrkpamisprofile.online/";
  db.transaction(tx => {
    tx.executeSql(
      "create table if not exists table_server (id integer primary key not null, value text);"
    );
    tx.executeSql("select * from table_server", [], (_, { rows }) => {
      if (rows.length > 0) {
        console.log("server: ", rows["_array"][0].value);
      } else {
        console.log("empty");
        db.transaction(tx => {
          tx.executeSql("insert into table_server (value) values (?)", [
            defaultServer
          ]);
        }, null);
      }
    });
  });
};

export const getServer = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql("select * from table_server", [], (_, { rows }) => {
        if (rows.length > 0) {
          resolve(rows["_array"][0].value);
        }
      });
    });
  });
};

export const signIn = async (username, password) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql("select * from table_server", [], (_, { rows }) => {
        if (rows.length > 0) {
          var server = rows["_array"][0].value;
          var url = server + "/api/login";
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
                console.log("Error: " + res.message);
                resolve("error");
              } else {
                console.log("Success fetching token");
                console.log("Token: ", res.access_token);
                resolve(res.access_token);
              }
            })
            .catch(error => {
              console.log(error);
              resolve("error");
            });
        }
      });
    });
  });
};

export const getMemberList = async (token, bear) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql("select * from table_server", [], (_, { rows }) => {
        if (rows.length > 0) {
          var server = rows["_array"][0].value;
          var url = server + "api/members" + bear;
          console.log(url);
        fetch(url, {
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
                resolve(Object.values(res));
              }
            })
            .catch(error => {
            //   console.error(error);
            console.log(error)
              resolve("error");
            });
        }
      });
    });
  });
};

export const searchMember = (token, userID, searchID) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql("select * from table_server", [], (_, { rows }) => {
        if (rows.length > 0) {
          var server = rows["_array"][0].value;
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
              } else {
                resolve(res);
              }
            })
            .catch(error => {
              console.error(error);
              resolve("error");
            });
        }
      });
    });
  });
};
