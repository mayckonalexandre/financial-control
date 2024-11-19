export function formatValueInReal(value: number) {
  if (!value || typeof value != "number") return value;

  return value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}
