import React, { useRef } from "react";
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleProp,
  TextStyle,
  View,
} from "react-native";
import { twMerge } from "tailwind-merge";

import { Text } from "./Text";

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  errorMessage?: string;
  LeftComponent?: React.ReactElement | null;
  RightComponent?: React.ReactElement | null;
  required?: boolean;
  style?: StyleProp<TextStyle>;
}

export function TextInput({
  label,
  errorMessage,
  LeftComponent,
  RightComponent,
  required,
  style,
  editable: editableProp,
  multiline,
  ...rnTextInputProps
}: TextInputProps) {
  const inputRef = useRef<RNTextInput>(null);

  const editable = editableProp ?? true;
  const isError = !!errorMessage;

  const focusInput = () => inputRef.current?.focus();

  const containerClassName = twMerge(
    "flex-row rounded-[20px] px-3 py-2",
    editable
      ? isError
        ? "border-2 border-redError dark:border-redError"
        : "border border-core dark:border-core-dark"
      : "bg-gray4-light dark:bg-gray4-dark border-transparent"
  );

  const inputClassName = twMerge(
    "flex-1 text-base p-0 font-regular text-black dark:text-text-dark",
    editable
      ? "text-black dark:text-text-dark"
      : "text-gray2-light dark:text-gray2-dark"
  );

  return (
    <View>
      <Pressable onPress={focusInput}>
        <View>
          {!!label && (
            <Text
              variant="paragraphSmall"
              className="mb-1 font-semibold text-core dark:text-core-dark"
            >
              {label}
              {required && <Text className="text-redError"> *</Text>}
            </Text>
          )}

          <View className={containerClassName}>
            {LeftComponent && (
              <View className="mr-16 justify-center">{LeftComponent}</View>
            )}

            <RNTextInput
              ref={inputRef}
              editable={editable}
              multiline={multiline}
              placeholderTextColor="#999"
              style={[
                {
                  textAlignVertical: multiline ? "top" : "center",
                  height: multiline ? 100 : 40,
                },
                style,
              ]}
              className={inputClassName}
              {...rnTextInputProps}
            />

            {RightComponent && (
              <View className="ml-16 justify-center">{RightComponent}</View>
            )}
          </View>

          {isError && (
            <Text variant="paragraphSmall" bold className="text-redError mt-2">
              {errorMessage}
            </Text>
          )}
        </View>
      </Pressable>
    </View>
  );
}
