import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TrashIcon from "../icons/TrashIcon";
import { Column, Id, Task } from "../types";
import {CSS} from "@dnd-kit/utilities";
import { useState, useEffect, useRef, useMemo } from "react";
import PlusIcon from "../icons/PlusIcon";
import TaskContaner from "./TaskContainer";

interface ColumnContainerProps {
    column: Column;
    deleteColumn: (id: Id) => void;
    createTask: (id: Id) => void;
    deleteTask: (id: Id) => void;
    tasks: Task[];
}

const ColumnContainer = (props: ColumnContainerProps) => {
    const { column, deleteColumn, tasks, createTask, deleteTask } = props;
    const { setNodeRef, attributes, listeners, transition, transform, isDragging } = useSortable({
        id: column.id,
        data: {
            type: "column",
            column,
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(column.title);
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const taskIds = useMemo(() => {
        return tasks.map((task) => task.id);
    }, [tasks]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setIsEditing(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isDragging) {
            setIsEditing(false);
        }
    }, [isDragging]);

    const handleTitleClick = () => {
        setIsEditing(true);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= 50) {
            setNewTitle(value);
            setError("");
        } else {
            setError("Title cannot exceed 50 characters");
        }
    };

    const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setIsEditing(false);
            // Update the column title here
            column.title = newTitle;
        }
    };

    // Separate handler for delete button to ensure it works
    const handleDeleteColumn = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        console.log("Delete button clicked for column ID:", column.id);
        deleteColumn(column.id);
    };

    // If column is being dragged, return null to avoid rendering
    if (isDragging) {
        return(
        <div 
            ref={setNodeRef}
            style={style}
            className="
                bg-columnBGColor 
                w-[350px] 
                h-[500px] 
                max-h-[500px] 
                rounded-lg 
                flex 
                flex-col 
                gap-2
                opacity-50
                pointer-events-none
                border-2
                border-rose-500
            "
        ></div>
    )
        
    }

  return (
    <div 
        ref={setNodeRef}
        style={style}
        className="
            bg-columnBGColor 
            w-[350px] 
            h-[500px] 
            max-h-[500px] 
            rounded-lg 
            flex 
            flex-col 
            gap-2
        "
    >
        {/* Column title */}
        <div 
            {...(isEditing ? {} : attributes)}
            {...(isEditing ? {} : listeners)}
            className="
                bg-mainBGColor
                text-md
                h-[60px] 
                cursor-grab 
                rounded-md 
                rounded-b-none 
                p-3 
                font-bold 
                border-columnBGColor 
                border-4
                flex
                items-center
                justify-between
            "
        >
            <div className="flex gap-2" >
                <div 
                    className="
                        flex 
                        items-center 
                        justify-center 
                        w-6 
                        h-6 
                        rounded-full 
                        bg-mainBGColor 
                        border-2 
                        border-columnBGColor
                    "
                >
                    {tasks.length}
                </div>
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        value={newTitle}
                        onChange={handleTitleChange}
                        onKeyDown={handleTitleKeyDown}
                        className="bg-mainBGColor border-2 border-rose-900 rounded p-1 focus:outline-none"
                        autoFocus
                    />
                ) : (
                    <span onClick={handleTitleClick}>{column.title}</span>
                )}
            </div>
            <button 
                className="
                    stroke-gray-500
                    hover:stroke-white
                    hover:bg-columnBGColor
                    rounded
                    px-1
                    py-2
                    transition-colors
                    focus:outline-none
                    focus:ring-2
                    focus:ring-gray-300
                    cursor-pointer
                "
                onClick={handleDeleteColumn}
                aria-label={`Delete column ${column.title}`}
                type="button"
            >
                <TrashIcon />
            </button>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        {/* Column content */}
        <div className="flex flex-grow flex-col w-full p-2 overflow-x-hidden overflow-y-auto scrollbar-hide gap-2">
            <SortableContext items={taskIds}>
            {tasks.map((task) => (
                <TaskContaner key={task.id} task={task} deleteTask={deleteTask} />
            ))}
            </SortableContext>
        </div>
        {/* Column footer */}
        <button className="
            flex
            items-center
            gap-2
            cursor-pointer
            rounded-md
            p-4
            border-2
            border-columnBGColor
            text-lg
            hover:bg-mainBGColor
            hover:text-rose-500
            active:bg-black
            transition-colors
            "
        onClick={() => {
            createTask(column.id)
        }
    }
        >
            <PlusIcon />
            Add Task
        </button>
    </div>
  )
}

export default ColumnContainer