import {
  View,
  Text,
  Alert,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authentication } from "../actions/authenticate";
import { router } from "expo-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react-native";

const schema = z.object({
  email: z
    .string({ message: "Informe seu email." })
    .email("Informe um email.")
    .trim(),
  password: z.string({ message: "Informe sua senha." }).trim(),
});

type schemaType = z.infer<typeof schema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(true);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
  });

  const submit = async ({ email, password }: schemaType) => {
    const response = await authentication(email, password);

    if (!response.access_token) {
      Alert.alert("Falha na autenticação!", response.message);
      return;
    }

    router.push("/");
  };

  return (
    <View className="flex justify-center items-center w-full h-full">
      <View className="rounded-lg gap-1 p-4 w-full max-w-md flex flex-col shadow-xl">
        <Text className="text-white text-xl font-bold text-center w-full">
          Login
        </Text>

        <Text className="text-gray-300">Email</Text>
        <TextInput
          className="rounded-md px-4 py-3 mt-1 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
          placeholder="Digite seu email"
          placeholderTextColor="#9ca3af"
          onChangeText={(text) => setValue("email", text)}
          keyboardType="email-address"
        />
        <Text className="text-red-500 text-xs mt-1">
          {errors.email?.message?.toString()}
        </Text>

        <View className="relative">
          <Text className="text-gray-300">Senha</Text>
          <TextInput
            className="rounded-md px-4 py-3 mt-1 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
            placeholder="Digite sua senha"
            placeholderTextColor="#9ca3af"
            onChangeText={(text) => setValue("password", text)}
            secureTextEntry={showPassword}
          />
          <TouchableOpacity
            onPress={handleClickShowPassword}
            style={{
              position: "absolute",
              right: 10,
              top: 20,
              padding: 5,
            }}
          >
            {showPassword ? (
              <Eye size={24} color="white" />
            ) : (
              <EyeOff size={24} color="white" />
            )}
          </TouchableOpacity>
          <Text className="text-red-500 text-xs mt-1">
            {errors.password?.message?.toString()}
          </Text>
        </View>

        <Pressable
          className="bg-blue-500 hover:bg-blue-600 rounded-md py-3 mt-4 active:opacity-80 shadow-md transition-colors duration-300"
          onPress={handleSubmit(submit)}
        >
          <Text className="text-white font-bold text-center">Entrar</Text>
        </Pressable>

        <View className="flex p-2 mt-4">
          <Pressable onPress={() => router.push("/create.account")}>
            <Text className="color-white text-center font-bold">
              Cadastre-se
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
