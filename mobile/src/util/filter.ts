export const filter = (transaction: object, search: string) =>
  search
    ? Object.values(transaction).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    : true;
