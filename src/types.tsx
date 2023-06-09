export interface TodoIF {
  _id: string,
  title: string,
  status: boolean
}

export interface TodoCardIF {
  item: TodoIF,
  mutate: () => Promise<TodoIF[]>;
}