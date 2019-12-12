import fetch from 'react-native-fetch-polyfill';
import { AsyncStorage } from "react-native";
import * as SQLite from "expo-sqlite";
import Constants from "expo-constants";
const db = SQLite.openDatabase("db.db");


getServer = () => {
      db.transaction(tx => {
      tx.executeSql("select * from table_server", [], (_, { rows }) => {
        if (rows.length > 0) {
          // this.setState({
          //   server: rows["_array"][0].value
          // });
          server =  rows["_array"][0].value
        }
      });
    });
}


export const signIn = async (username, password) => {

  
  var ip = await AsyncStorage.getItem('ip');
  // var port = await AsyncStorage.getItem('port');
  // var url = "http://" + ip + ":" + port + "/api/login"

  db.transaction(tx => {
    tx.executeSql("select * from table_server", [], (_, { rows }) => {
      if (rows.length > 0) {
        ip =  rows["_array"][0].value
        var url = ip + "/api/login"
        console.log(url)
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
              console.log("Error signing up", "Error: " + res.message);
              return 'error';
            } else {
              // this.setState({ auth_token: res.auth_token });
              console.log("Success fetching token");
              console.log("Token: " ,res.access_token);
              return res.access_token;
            }
          })
          .catch(error => {
            console.log(error);
            return 'error';
      
          });
        
      }
    });
  });


    // return;
};

export const memberList = async (token) => {
    var memberList = await getMembers(token);
    return memberList;
}

export const scan = async (token,myId, id) => {
  var member = await getMember(token, myId,id);
  return member;
}



async function getToken(username, password) {
  var ip = await AsyncStorage.getItem('ip');
  // var port = await AsyncStorage.getItem('port');
  // var url = "http://" + ip + ":" + port + "/api/login"

  db.transaction(tx => {
    tx.executeSql("select * from table_server", [], (_, { rows }) => {
      if (rows.length > 0) {
        ip =  rows["_array"][0].value
        var url = ip + "/api/login"
        console.log(url)
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
              console.log("Error signing up", "Error: " + res.message);
              return 'error';
            } else {
              // this.setState({ auth_token: res.auth_token });
              console.log("Success fetching token");
              console.log("Token: " ,res.access_token);
              return res.access_token;
            }
          })
          .catch(error => {
            console.log(error);
            return 'error';
      
          });
        
      }
    });
  });


    return;
}

async function getMembers(request) {
  var ip = await AsyncStorage.getItem('ip');
  // var port = await AsyncStorage.getItem('port');
  // var url = "http://" + ip + ":" + port + "/api/members"+ request[1]
  var url = ip + "/api/members"+ request[1]

  console.log(url)
  return fetch(url, {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + request[0]
    },
    // body: JSON.stringify({
    //   username: "12345",
    //   password: "test2"
    // })
  })
    .then(response => response.json())
    .then(res => {
      if (typeof res.message != "undefined") {
        console.log("Error signing up", "Error: " + res.message);
      } else {
        // this.setState({ auth_token: res.auth_token });
        console.log("Success Fetching members");
        console.log("response ==================================", Object.values(res));
        console.log("response===========================")
        return Object.values(res);
      }
    })
    .catch(error => {
      console.error(error);
      return 'error'

    });
}


async function getMember(token, myId, id) {
  var ip = await AsyncStorage.getItem('ip');
  // var port = await AsyncStorage.getItem('port');
  // var url = "http://" + ip + ":" + port + "/api/scan"
  var url = ip + "/api/scan"

  console.log(url)
  console.log("myid: ", myId)
  console.log("qr_code id: ", id)
  return fetch(url, {
    method: "put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({
      id: myId,
      qr_code: id
    })
  })
    .then(response => response.json())
    .then(res => {
      if (typeof res.message != "undefined") {
        console.log("Error signing up", "Error: " + res.message);
      } else {
        // this.setState({ auth_token: res.auth_token });
        console.log("Success Fetching members");
        console.log("response ==================================", Object.values(res));
        console.log("response===========================")
        // return Object.values(res);
        return res
      }
    })
    .catch(error => {
      console.error(error);
      return 'error'
    });
}
