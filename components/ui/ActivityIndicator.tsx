import React from "react";
import {
  ActivityIndicatorProps,
  ActivityIndicator as RNActivityIndicator,
} from "react-native";

interface Props extends Omit<ActivityIndicatorProps, "color"> {
  color?: "black" | "white" | "gray" | "red" | "blue" | "green";
}

const colorsMap: Record<string, string> = {
  black: "#000000",
  white: "#ffffff",
  gray: "#6b7280",
  red: "#ef4444",
  blue: "#3b82f6",
  green: "#22c55e",
};

export function ActivityIndicator({ color = "black", ...props }: Props) {
  return (
    <RNActivityIndicator
      color={colorsMap[color] || colorsMap.black}
      {...props}
    />
  );
}
