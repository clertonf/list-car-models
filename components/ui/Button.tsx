import {
  ActivityIndicator,
  Text as RNText,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { twMerge } from "tailwind-merge";

type ButtonPreset = "primary" | "outline";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  preset?: ButtonPreset;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const buttonPresets = {
  primary: {
    default: "bg-core text-white",
    disabled: "bg-gray-300 text-gray-400",
  },
  outline: {
    default: "border border-core bg-transparent text-core",
    disabled: "border border-gray-300 bg-transparent text-gray-400",
  },
};

export function Button({
  title,
  loading,
  preset = "primary",
  disabled,
  leftIcon,
  rightIcon,
  className,
  style,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const presetStyles = isDisabled
    ? buttonPresets[preset].disabled
    : buttonPresets[preset].default;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isDisabled}
      className={twMerge(
        "flex-row items-center justify-center rounded-[30px] h-14 px-5",
        presetStyles,
        className
      )}
      style={style}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={preset === "primary" ? "white" : "#66376D"} />
      ) : (
        <View className="flex-row items-center space-x-2">
          {leftIcon && <View>{leftIcon}</View>}
          <RNText
            className={twMerge(
              "text-base font-semibold",
              preset === "primary" ? "text-white" : "text-core"
            )}
          >
            {title}
          </RNText>
          {rightIcon && <View>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}
