import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { UpdateTaskForm } from "./update-task-form"
import {
  AlertDialog,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { DeleteModal } from "./delete-modal"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { ToggleButton } from "./toggle-button"

interface ITask {
  task: {
    id: string
    title: string
    is_completed: boolean
  }
}

export const Task = ({ task }: ITask) => {
  return (
    <div
      className={cn(
        "flex border p-4 rounded-lg mt-5 gap-2", task.is_completed ?
        "line-through" : ""
      )}
    >
      <ToggleButton task={task} />

      <p>{task.title}</p>

      <div className="ml-auto flex gap-2">
        <AlertDialog>
          <AlertDialogTrigger>
            <Icons.trash className="w-5 h-5 text-red-500" />
          </AlertDialogTrigger>

          <DeleteModal task={task} />
        </AlertDialog>

        <Dialog>
          <DialogTrigger>
            <Icons.pencil className="w-5 h-5 text-yellow-500" />
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Tarefa</DialogTitle>
            </DialogHeader>

            <UpdateTaskForm task={task} /> 
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}