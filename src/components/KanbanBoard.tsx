import PlusIcon from "../icons/PlusIcon"
import { useMemo, useState } from "react"
import { Column, Id, Task } from "../types"
import ColumnContainer from "./ColumnContainer"
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import TaskContainer from "./TaskContainer"

const KanbanBoard = () => {
    const [columns, setColumns] = useState<Column[]>([])
    const [tasks, setTasks] = useState<Task[]>([])
    const columnsId = useMemo(() => columns.map(column => column.id), [columns])
    
    // Track active elements during drag
    const [activeColumn, setActiveColumn] = useState<Column | null>(null)
    const [activeTask, setActiveTask] = useState<Task | null>(null)

    // Configure DnD sensors with proper activation constraints
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3, // 3px minimum drag distance before activation
            },
        })
    );

    /**
     * Creates a new column with a unique ID and a default title.
     * The new column is added to the existing list of columns.
     *
     * @returns {void}
     */
    const createNewColumn = (): void => {
        const newColumn: Column = {
            id: generateId(),
            title: `Column ${columns.length + 1}`,
        }
        setColumns([...columns, newColumn])
    }

    const createTask = (columnId: Id): void => {
        const newTask: Task = {
            id: generateId(),
            title: `Task ${tasks.length + 1}`,
            description: "Task Description",
            columnId,
        }
        setTasks([...tasks, newTask])
    }



    /**
     * Deletes a column by its ID.
     * 
     * @param {Id} id - The ID of the column to delete
     * @returns {void}
     */
    const deleteColumn = (id: Id): void => {
        const filteredColumns = columns.filter(column => column.id !== id)
        setColumns(filteredColumns)
        
        // Also delete all tasks in this column
        const remainingTasks = tasks.filter(task => task.columnId !== id);
        setTasks(remainingTasks);
    }
    
    const deleteTask = (id: Id): void => {
        const filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    /**
     * Generates a random unique identifier.
     *
     * @returns {number} A random number between 0 and 99999.
     */
    const generateId = (): number => {
        return Math.floor(Math.random() * 100000)
    }

    // Handle drag start event
    const onDragStart = (event: DragStartEvent) => {
        if (event.active.data.current?.type === "column") {
            setActiveColumn(event.active.data.current.column)
            return;
        }
        
        if (event.active.data.current?.type === "task") {
            setActiveTask(event.active.data.current.task)
            return;
        }
    }

    // Handle drag over event for changing task column
    const onDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        
        // If no over element or same element, return
        if (!over) return;
        
        const activeId = active.id;
        const overId = over.id;
        
        if (activeId === overId) return;
        
        const isActiveATask = active.data.current?.type === "task";
        const isOverATask = over.data.current?.type === "task";
        
        if (!isActiveATask) return;

        // handle task over a task
        if (isActiveATask && isOverATask) {
            setTasks((prevTasks) => {
                const activeTask = prevTasks.findIndex(task => task.id === activeId);
                const overTask = prevTasks.findIndex(task => task.id === overId);
                
                tasks[activeTask].columnId = tasks[overTask].columnId;

                return arrayMove(prevTasks, activeTask, overTask);
            });
        }

        // handle task over a column

        const isOverAColumn = over.data.current?.type === "column";
        if (isActiveATask && isOverAColumn) {
            setTasks((prevTasks) => {
                const activeTask = prevTasks.findIndex(task => task.id === activeId);
                tasks[activeTask].columnId = over.id;
                return arrayMove(prevTasks, activeTask, activeTask);
            });
        }

    }

    // Handle drag end event
    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        
        if (!over) {
            setActiveColumn(null);
            setActiveTask(null);
            return;
        }
        
        // Handle column reordering
        if (active.data.current?.type === "column" && over.data.current?.type === "column") {
            const oldIndex = columnsId.indexOf(active.id as Id);
            const newIndex = columnsId.indexOf(over.id as Id);

            if (oldIndex !== newIndex) {
                const updatedColumns = arrayMove(columns, oldIndex, newIndex);
                setColumns(updatedColumns);
            }
        }
        
        setActiveColumn(null);
        setActiveTask(null);
    }

  return (
    <div className="
        m-auto
        flex
        min-h-screen
        w-full
        items-center
        overflow-x-auto
        scrollbar-hide
    ">
        <DndContext 
            sensors={sensors} 
            onDragEnd={onDragEnd} 
            onDragStart={onDragStart}
            onDragOver={onDragOver}
        >
            <div className="m-auto flex gap-4">
                <div className="flex gap-4">
                    <SortableContext items={columnsId}>
                    {columns.map((column) => (
                        <ColumnContainer 
                            key={column.id} 
                            column={column} 
                            deleteColumn={deleteColumn}
                            createTask={createTask}
                            deleteTask={deleteTask}
                            tasks={tasks.filter(task => task.columnId === column.id)}
                        />
                    ))}
                    </SortableContext>
                </div>
                <button className="
                    h-[60px]
                    w-[350px]
                    min-w-[350px]
                    cursor-pointer
                    rounded-lg
                    bg-mainBGColor
                    border-2
                    border-columnBGColor
                    p-4
                    ring-rose-500
                    hover:ring-2
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-lg
                    font-semibold
                "
                onClick={() => {
                    createNewColumn()
                }}
                >
                    <PlusIcon /> Add Column
                </button>
            </div>

            <DragOverlay>
                {activeColumn ? <ColumnContainer column={activeColumn} deleteColumn={deleteColumn} createTask={createTask} deleteTask={deleteTask} tasks={tasks.filter(task => task.columnId === activeColumn.id)} /> : null}
                {activeTask ? <TaskContainer task={activeTask} deleteTask={deleteTask} /> : null}
            </DragOverlay>
        </DndContext>
    </div>
  )
}

export default KanbanBoard