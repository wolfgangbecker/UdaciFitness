import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getMetricsMetaInfo, timeToString } from "../utils/helpers";
import UdaciSlider from "./UdaciSlider";
import UdaciSteppers from "./UdaciSteppers";
import TextButton from "./TextButton";
import DateHeader from "./DateHeader";
import Ionicons from "@expo/vector-icons/Ionicons";

function SubmitButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>SUBMIT</Text>
    </TouchableOpacity>
  );
}

export default class AddEntry extends Component {
  state = { run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 };

  increment = metric => {
    const { max, step } = getMetricsMetaInfo(metric);

    this.setState(state => {
      const count = state[metric] + step;

      return { ...state, [metric]: count > max ? max : count };
    });
  };

  decrement = metric => {
    this.setState(state => {
      const count = state[metric] - getMetricsMetaInfo(metric).step;

      return { ...state, [metric]: count < 0 ? 0 : count };
    });
  };

  slide = (metric, value) => {
    this.setState(() => ({ [metric]: value }));
  };

  submit = () => {
    const key = timeToString();
    const entry = this.state;

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    }));

    // Navigate to home

    // Save to 'DB'

    // Clear local notification
  };

  reset = () => {
    const key = timeToString();

    // Update Redux

    // Route to Home

    // Update 'DB'
  };

  render() {
    const metaInfo = getMetricsMetaInfo();

    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons name="ios-happy-outline" size={100} />
          <Text>You already logged your information for today</Text>
          <TextButton onPress={this.reset}>Reset</TextButton>
        </View>
      );
    }

    return (
      <View>
        <DateHeader date={new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map(key => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];

          return (
            <View key={key}>
              {getIcon()}
              {type === "slider" ? (
                <UdaciSlider
                  value={value}
                  onChange={value => this.slide(key, value)}
                  {...rest}
                />
              ) : (
                <UdaciSteppers
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                  {...rest}
                />
              )}
            </View>
          );
        })}
        <SubmitButton onPress={this.submit} />
      </View>
    );
  }
}
