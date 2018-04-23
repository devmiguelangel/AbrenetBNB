import React, { Component } from "react";
import {
  ActivityIndicator,
} from "react-native";

export const LoadingView = (props) => {
  return (
    <ActivityIndicator
      style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: 'rgba(255,255,255, 0.6)', zIndex: 1, }}
      size="large"
      color="#607D8B"
    />    
  )
}