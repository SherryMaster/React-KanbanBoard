import { useState } from 'react'
import TrashIcon from '../icons/TrashIcon'
import { Id, Task } from '../types'
import EditIcon from '../icons/EditIcon'
import CheckIcon from '../icons/CheckIcon'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface TaskContainerProps {
    task: Task
    deleteTask: (id: Id) => void
}

const TaskContainer = (props: TaskContainerProps) => {
    const { task, deleteTask } = props

    const [editMode, setEditMode] = useState<boolean>(false)

    const [newTitle, setNewTitle] = useState<string>(task.title)
    const [newDescription, setNewDescription] = useState<string>(task.description)

    const [isHovering, setIsHovering] = useState<boolean>(false)

    const { setNodeRef, attributes, listeners, transition, transform, isDragging } = useSortable({
        id: task.id,
        data: {
            type: 'task',
            task,
        },
        disabled: editMode,
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewTitle(e.target.value)
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewDescription(e.target.value)
    }

    const saveEdit = () => {
      setEditMode(false)
      task.title = newTitle
      task.description = newDescription
    }


    if (isDragging) {
        return (
          <div className="bg-mainBGColor rounded-md shadow-md mb-2 ring-2 
    ring-rose-500 min-h-[100px] h-[100px] opacity-30"
          ref={setNodeRef}
          style={style}
          >

    </div>
        )
    }
    
  if (editMode) {
    return (
      <div className="bg-mainBGColor rounded-md shadow-md mb-2 
      min-h-[100px] h-[100px] items-center"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
        {/* Task Title */}
        <div className="font-bold bg-gray-800 w-auto rounded-md rounded-b-none
         p-1 flex items-center min-h-[35px] relative"
         >
          <h3>
            <input 
            className="bg-mainBGColor border-2 border-rose-900 rounded p-1 w-full
            focus:outline-none" 
            type="text" 
            value={newTitle} 
            onChange={handleTitleChange}
            autoFocus />
          </h3>
          {isHovering && 
            <button className='stroke-white absolute right-1 rounded-md p-1
             cursor-pointer opacity-40 hover:opacity-100 transition-opacity'
              onClick={() => saveEdit()} 
            >
              <CheckIcon />
            </button>
          }
        </div>

        {/* Task Description */}
        <input 
        className="bg-mainBGColor border-2 border-rose-900 rounded 
        focus:outline-none m-2 w-[95%]" 
        value={newDescription} 
        onChange={handleDescriptionChange} 
        />
    </div>
    )
  }

  return (
    <div className="bg-mainBGColor rounded-md shadow-md mb-2 hover:ring-2 
    hover:ring-rose-500 cursor-grab min-h-[100px] h-[100px] items-center"
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => setIsHovering(false)}
    ref={setNodeRef}
    {...attributes}
    {...listeners}
    style={style}
    
    >
        {/* Task Title */}
        <div className="font-bold bg-gray-800 w-auto rounded-md rounded-b-none
         p-1 flex items-center min-h-[35px] relative"
         >
          <h3>{task.title}</h3> 
          {isHovering && 
            <button className='stroke-white absolute right-10 rounded-md p-1
             cursor-pointer opacity-40 hover:opacity-100 transition-opacity'
              onClick={() => setEditMode(true)} 
            >
              <EditIcon />
            </button>
          }
          {isHovering && 
            <button className='stroke-white absolute right-1 rounded-md p-1
             cursor-pointer opacity-40 hover:opacity-100 transition-opacity'
              onClick={() => deleteTask(task.id)} 
            >
              <TrashIcon />
            </button>
          }
        </div>

        {/* Task Description */}
        <p className='m-2'
        >{task.description}</p>
    </div>
  )
}

export default TaskContainer