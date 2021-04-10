import React, { Component, useRef, useState } from "react";
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";

interface Props {
  stopwatchStart: boolean;
  stopwatchReset: boolean;
}

export const StopWatchContainer: React.FC<Props> = ({ stopwatchReset, stopwatchStart }) => {
  const currentTime = useRef<any>();
  const getFormattedTime = (time) => {
    currentTime.current = time;
  };

  return (
    <View>
      <Stopwatch start={stopwatchStart} reset={stopwatchReset} options={options} getTime={getFormattedTime} />
    </View>
  );
};

const options = {
  container: {
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    color: "#FFF",
  },
};
