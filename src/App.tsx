import AddTodo from "./components/AddTodo";
import TodoCard from "./components/TodoCard";
import { getRequest } from "./config/axiosConfig";
import { TodoIF } from "./types";
import useSWR from 'swr'

const fetcher = (url: string) => getRequest(url)

function App() {

  const { data, mutate } = useSWR('get-todo', fetcher)

  return (
    <main className="max-w-4xl mx-auto px-5">
      <AddTodo mutate={mutate} />
      <div className="grid grid-cols-2 gap-4 mt-12">
        {data?.todos.map((item: TodoIF, index: number) => <TodoCard key={index} item={item} mutate={mutate} />)}
      </div>
    </main>
  )
}

export default App
