import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { View } from "react-native";

import {
  Button,
  FormPasswordInput,
  FormTextInput,
  Screen,
  Text,
} from "@/components";
import { useAuth } from "@/contexts";
import { LoginSchema, loginSchema } from "../../schemas/loginSchema";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const { control, formState, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      user: "",
      password: "",
    },
    mode: "onChange",
  });

  async function onSubmitForm({ user, password }: LoginSchema) {
    try {
      await login(user, password);
      router.replace("/main");
    } catch (error) {
      console.log("erro no login:", error);
    }
  }

  return (
    <Screen scrollable>
      <Text bold variant="headingLarge" className="mb-12">
        Login
      </Text>
      <View className="flex-1">
        <FormTextInput
          control={control}
          name="user"
          label="Usuário"
          placeholder="Usuário"
          autoCapitalize="none"
        />

        <FormPasswordInput
          label="Senha"
          control={control}
          name="password"
          placeholder="Senha"
        />
      </View>

      <Button
        title="Entrar"
        onPress={handleSubmit(onSubmitForm)}
        loading={formState.isSubmitting}
        disabled={!formState.isValid || formState.isSubmitting}
        className="mb-12"
      />
    </Screen>
  );
}
