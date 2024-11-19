import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react-native";
import { createAccount } from "../actions/create.account";

const schemaCreateAccount = z
  .object({
    name: z.string({ message: "Infome seu nome" }).trim(),
    email: z
      .string({ message: "Informe seu email" })
      .email("Informe um email.")
      .trim(),
    password: z
      .string({ message: "Informe sua senha" })
      .trim()
      .min(5, { message: "Mínimo 5 digitos." })
      .refine((value) => /[A-Z]/.test(value), {
        message: "A senha deve conter pelo menos uma letra maiúscula.",
      })
      .refine((value) => /\d/.test(value), {
        message: "A senha deve conter pelo menos um número.",
      })
      .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: "A senha deve conter pelo menos um caractere especial.",
      }),
    confirmPassword: z.string({ message: "Confirme sua senha" }).trim(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não coindidem.",
        path: ["confirmPassword"],
      });
    }
  });

type schemaType = z.infer<typeof schemaCreateAccount>;

export default function CreateAccount() {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<schemaType>({
    resolver: zodResolver(schemaCreateAccount),
  });

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const submit = async (data: schemaType) => await createAccount(data);

  return (
    <View className="flex justify-center items-center w-full h-full">
      <View className="rounded-lg gap-1 p-2 w-full max-w-md flex flex-col shadow-xl">
        <Text className="text-white text-xl font-bold text-center w-full">
          Criar Conta
        </Text>

        <Text className="text-gray-300">Nome</Text>
        <TextInput
          className="rounded-md px-4 py-3 mt-1 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
          placeholder="Informe seu nome"
          onChangeText={(text) => setValue("name", text)}
          placeholderTextColor="#9ca3af"
        />
        <Text className="text-red-500 text-xs mt-1">
          {errors.name?.message?.toString()}
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

        <View className="relative">
          <Text className="text-gray-300">Confirme sua senha</Text>
          <TextInput
            className="rounded-md px-4 py-3 mt-1 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
            placeholder="Confirme sua senha"
            placeholderTextColor="#9ca3af"
            onChangeText={(text) => setValue("confirmPassword", text)}
            secureTextEntry={showConfirmPassword}
          />
          <TouchableOpacity
            onPress={handleClickShowConfirmPassword}
            style={{
              position: "absolute",
              right: 10,
              top: 20,
              padding: 5,
            }}
          >
            {showConfirmPassword ? (
              <Eye size={24} color="white" />
            ) : (
              <EyeOff size={24} color="white" />
            )}
          </TouchableOpacity>
          <Text className="text-red-500 text-xs mt-1">
            {errors.confirmPassword?.message?.toString()}
          </Text>
        </View>

        <Pressable
          className="bg-blue-500 hover:bg-blue-600 rounded-md py-3 mt-4 active:opacity-80 shadow-md transition-colors duration-300"
          onPress={handleSubmit(submit)}
        >
          <Text className="text-white font-bold text-center">Criar</Text>
        </Pressable>

        <View className="flex p-2 mt-4">
          <Pressable onPress={() => router.push("/login")}>
            <Text className="color-white text-center font-bold">
              Já possui uma conta ?
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
