import React from "react";
import { Text, View } from "react-native";
import AddEntry from "./components/AddEntry";
import { Slider } from "react-native-gesture-handler";

export default class App extends React.Component {
  state = {
    value: 0
  };

  render() {
    return (
      <View>
        <AddEntry />
      </View>
    );
  }
}
