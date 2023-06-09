import { useState } from 'react'
import { postRequest } from '../config/axiosConfig';
import useSWRMutation from 'swr/mutation'
import { TodoIF } from '../types';

interface AddTodoIF {
  title: string,
  status: boolean
}

interface AddTodoProps {
  mutate: () => Promise<TodoIF[]>;
}

const addTodo = async (url: string, { arg }: { arg: AddTodoIF }) => await postRequest(url, arg)


const AddTodo: React.FC<AddTodoProps> = ({ mutate }) => {

  const [todo, setTodo] = useState("");
  const { trigger } = useSWRMutation('add-todo', addTodo)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await trigger({ title: todo, status: false })
    mutate()
    setTodo("")
  }

  return (
    <div className="px-6 py-8 shadow-lg rounded-xl w-full max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit}>
        <input type="text" className="block outline-none border border-gray-400 rounded h-9 w-full px-2"
          onChange={(e) => setTodo(e.target.value)}
          required
          value={todo}
        />
        <button type="submit" className="mt-4 px-4 py-2 block mx-auto w-fit rounded font-semibold text-base leading-5 text-white bg-teal-600">
          {/* {mutation.isLoading ? " Loading..." : "Add Todo"} */}
          Add Todo
        </button>
      </form>
    </div>
  )
}

export default AddTodo
