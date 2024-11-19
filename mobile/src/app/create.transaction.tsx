import { createTransaction } from "../actions/transactions/create.transaction";
import { Pressable, View, Text, TextInput, ScrollView } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import Calendar from "../components/calendar";
import Select from "../components/select";

const schemaCreateTransaction = z.object({
  type: z
    .enum(["Receita", "Despesa"], { message: "Preencha o campo" })
    .transform((value) => (value === "Receita" ? "revenue" : "expense")),
  category: z
    .string({ message: "Informe a categoria" })
    .trim()
    .min(1, "Preencha o campo."),
  origin: z
    .string({ message: "Informe a origem" })
    .trim()
    .min(1, "Preencha o campo."),
  payment_method: z
    .string({ message: "Informe o método de pagamento" })
    .trim()
    .min(1, "Preencha o campo."),
  value: z
    .number({ message: "Informe o valor" })
    .min(1, "Preencha o campo.")
    .transform((value) => Number(value)),
  description: z
    .string({ message: "Informe a descrição" })
    .trim()
    .min(1, "Preencha o campo."),
  date: z.string({ message: "Informe a data" }),
});

export type createTransactionType = z.infer<typeof schemaCreateTransaction>;

export default function CreateTransaction() {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<createTransactionType>({
    resolver: zodResolver(schemaCreateTransaction),
  });

  const submit = async (data: createTransactionType) =>
    await createTransaction(data);

  return (
    <ScrollView>
      <View className="flex gap-1 w-full max-w-md">
        <View className="flex-row items-center justify-center mb-4 relative">
          <Pressable
            className="absolute flex text-left w-full p-2"
            onPress={router.back}
          >
            <ArrowLeft color="#fff" size={25} />
          </Pressable>
          <Text className=" font-bold text-2xl text-white text-center">
            Nova Transação
          </Text>
        </View>

        <Text className="text-gray-300">Descrição</Text>
        <TextInput
          className="rounded-md px-4 py-3 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
          placeholder="Descrição da transação (Ex: Salário, Aluguel)"
          placeholderTextColor="#9ca3af"
          onChangeText={(text) => setValue("description", text)}
        />
        <Text className="text-red-500 text-xs">
          {errors.description?.message?.toString()}
        </Text>

        <Text className="text-gray-300">Valor</Text>
        <TextInput
          className="rounded-md px-4 py-3 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
          placeholder="Valor da transação (Ex: 3000.00)"
          placeholderTextColor="#9ca3af"
          onChangeText={(value) => setValue("value", Number(value))}
        />
        <Text className="text-red-500 text-xs">
          {errors.value?.message?.toString()}
        </Text>

        <Text className="text-gray-300">Categoria</Text>
        <TextInput
          className="rounded-md px-4 py-3 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
          placeholder="Categoria (Ex: Alimentação, Transporte)"
          placeholderTextColor="#9ca3af"
          onChangeText={(text) => setValue("category", text)}
        />
        <Text className="text-red-500 text-xs">
          {errors.category?.message?.toString()}
        </Text>

        <Text className="text-gray-300">Origem/Destino</Text>
        <TextInput
          className="rounded-md px-4 py-3 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
          placeholder="Origem/Destino (Ex: Fulano, Supermercado)"
          placeholderTextColor="#9ca3af"
          onChangeText={(text) => setValue("origin", text)}
        />
        <Text className="text-red-500 text-xs">
          {errors.origin?.message?.toString()}
        </Text>

        <Text className="text-gray-300">Método de Pagamento</Text>
        <TextInput
          className="rounded-md px-4 py-3 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
          placeholder="Método de pagamento (Ex: Cartão de crédito, Dinheiro, Pix)"
          placeholderTextColor="#9ca3af"
          onChangeText={(text) => setValue("payment_method", text)}
        />
        <Text className="text-red-500 text-xs">
          {errors.payment_method?.message?.toString()}
        </Text>

        <Text className="text-gray-300">Tipo</Text>

        <Select
          options={["Receita", "Despesa"]}
          setValue={(key, value) =>
            setValue(key as keyof createTransactionType, value)
          }
        />

        <Text className="text-red-500 text-xs">
          {errors.type?.message?.toString()}
        </Text>

        <Calendar setValue={setValue} />
        <Text className="text-red-500 text-xs">
          {errors.date?.message?.toString()}
        </Text>

        <Pressable
          className="bg-blue-500 hover:bg-blue-600 rounded-md py-3 mt-8 active:opacity-80"
          onPress={handleSubmit(submit)}
        >
          <Text className="text-white font-bold text-center">Cadastrar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
