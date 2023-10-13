import React, { Component } from "react";
import { SafeAreaView, View, StyleSheet, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

import {
  DrawerContentScrollView,
  DrawerItemList
} from "@react-navigation/drawer";

export default class CustomSidebarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    let props = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#3f3f4e"
        }}
      >
        <Image
          source={require("../assets/logo.png")}
          style={styles.sideMenuProfileIcon}
        ></Image>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70),
    alignSelf: "center",
    marginTop: RFValue(60),
    resizeMode: "contain"
  }
});
