import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable } from "react-native";
import { TextInput, TextInputProps } from "../ui";

export type PasswordInputProps = Omit<TextInputProps, "RightComponent"> & {};

export function PasswordInput(props: PasswordInputProps) {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  function toggleSecureTextEntry() {
    setIsSecureTextEntry((prev) => !prev);
  }

  return (
    <TextInput
      secureTextEntry={isSecureTextEntry}
      {...props}
      RightComponent={
        <Pressable onPress={toggleSecureTextEntry}>
          {isSecureTextEntry ? (
            <Eye className="text-core-light dark:text-core-dark" size={20} />
          ) : (
            <EyeOff className="text-core-light dark:text-core-dark" size={20} />
          )}
        </Pressable>
      }
    />
  );
}
