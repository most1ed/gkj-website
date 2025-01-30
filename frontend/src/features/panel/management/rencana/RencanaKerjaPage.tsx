import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRencanaStore } from "./store/rencana-store";
import { CreateTaskDialog } from "./components/CreateTaskDialog";
import { TaskDetails } from "./components/TaskDetails";
import { BoardList } from "./components/BoardList";

export default function RencanaKerjaPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<{
    boardId: string;
    columnId: string;
    taskId: string;
  } | null>(null);
  const [targetColumnId, setTargetColumnId] = useState<string | null>(null);

  const { boards, activeBoard, moveTask } = useRencanaStore();
  const currentBoard = boards.find((board) => board.id === activeBoard);

  const handleDragEnd = (result: any) => {
    if (!result.destination || !currentBoard) return;

    const sourceColumnId = result.source.droppableId;
    const destinationColumnId = result.destination.droppableId;
    const taskId = result.draggableId;

    moveTask(currentBoard.id, sourceColumnId, destinationColumnId, taskId);
  };

  if (!activeBoard) {
    return <BoardList />;
  }

  if (!currentBoard) {
    return null;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {currentBoard.title}
          </h2>
          {currentBoard.description && (
            <p className="text-muted-foreground">{currentBoard.description}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Tugas
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-4 h-full">
            {currentBoard.columns.map((column) => (
              <div key={column.id} className="w-80 flex-shrink-0">
                <div className="bg-card rounded-lg shadow-sm">
                  <div className="p-3 font-medium border-b">
                    <div className="flex items-center justify-between">
                      <span>{column.title}</span>
                      <span className="text-muted-foreground text-sm">
                        {column.tasks.length}
                      </span>
                    </div>
                  </div>
                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="p-3 space-y-3 min-h-[200px]"
                      >
                        {column.tasks.map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                onClick={() =>
                                  setSelectedTask({
                                    boardId: currentBoard.id,
                                    columnId: column.id,
                                    taskId: task.id,
                                  })
                                }
                                className="bg-background rounded-lg shadow-sm p-3 cursor-pointer hover:shadow-md transition-shadow"
                              >
                                <h3 className="font-medium mb-2">{task.title}</h3>
                                {task.description && (
                                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                    {task.description}
                                  </p>
                                )}
                                {task.labels && task.labels.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mb-2">
                                    {task.labels.map((label) => (
                                      <span
                                        key={label.id}
                                        className={`px-2 py-0.5 rounded-full text-xs ${label.color}`}
                                      >
                                        {label.name}
                                      </span>
                                    ))}
                                  </div>
                                )}
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    {task.assignees && task.assignees.length > 0 && (
                                      <span>{task.assignees.length} assignee(s)</span>
                                    )}
                                    {task.comments && task.comments.length > 0 && (
                                      <span>{task.comments.length} comment(s)</span>
                                    )}
                                  </div>
                                  {task.dueDate && (
                                    <span>
                                      Due {new Date(task.dueDate).toLocaleDateString()}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <div className="p-3 border-t">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-muted-foreground"
                      onClick={() => {
                        setTargetColumnId(column.id);
                        setIsCreateOpen(true);
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Tambah tugas
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>

      <CreateTaskDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        columnId={targetColumnId}
      />

      {selectedTask && (
        <TaskDetails
          open={!!selectedTask}
          onOpenChange={() => setSelectedTask(null)}
          boardId={selectedTask.boardId}
          columnId={selectedTask.columnId}
          taskId={selectedTask.taskId}
        />
      )}
    </div>
  );
}
