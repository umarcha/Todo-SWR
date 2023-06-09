import { deleteRequest, patchRequest } from "../config/axiosConfig"
import { TodoCardIF } from "../types"
import useSWRMutation from 'swr/mutation'

interface UpdatePropsIF {
  id: string,
  status: boolean
}

const deleteTodo = async (url: string, { arg }: { arg: string }) => await deleteRequest(`${url}/${arg}`)
const UpdateTodo = async (url: string, { arg }: { arg: UpdatePropsIF }) => await patchRequest(`${url}/${arg.id}`, { status: arg.status })

const TodoCard = ({ item, mutate }: TodoCardIF) => {

  const { trigger: triggerDelete } = useSWRMutation('delete', deleteTodo)
  const { trigger: triggerUpdate } = useSWRMutation('update', UpdateTodo)

  const deleteHandler = async () => {
    await triggerDelete(item._id)
    mutate()
  }

  const updateStatus = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const status = e.target.checked;
    await triggerUpdate({ id: item._id, status: status })
    mutate()
  }
  return (
    <div className="px-4 py-6 rounded-md bg-white shadow-md">
      <div className="flex gap-3 justify-between items-center">
        <h5 className={`${item.status && 'line-through text-gray-400'}`}>{item.title}</h5>
        <input type="checkbox" checked={item.status} onChange={updateStatus} className="cursor-pointer" />
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={deleteHandler} className="bg-red-600 rounded-md px-3 py-2 text-xs text-white">
          Delete
        </button>
      </div>
    </div>
  )
}

export default TodoCard