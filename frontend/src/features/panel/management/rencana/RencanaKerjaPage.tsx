import React, { useState, useMemo, useEffect } from "react";
import { format } from "date-fns";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { 
  Plus, 
  Filter, 
  SortDesc, 
  MoreHorizontal, 
  MessageSquare, 
  Trash2, 
  Edit 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { useRencanaStore } from "./store/rencana-store";
import { CreateTaskDialog } from "./components/CreateTaskDialog";
import { TaskDetails } from "./components/TaskDetails";
import { BoardList } from "./components/BoardList";

import { Board, Column, Task, TaskStatus, TaskPriority } from "./types/rencana.types";
import { cn } from "@/lib/utils";

export default function RencanaKerjaPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<{
    boardId: string;
    columnId: string;
    taskId: string;
  } | null>(null);
  const [filterStatus, setFilterStatus] = useState<TaskStatus | null>(null);
  const [sortBy, setSortBy] = useState<'priority' | 'dueDate' | 'createdAt'>('createdAt');
  
  // New state for column management
  const [isAddColumnDialogOpen, setIsAddColumnDialogOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [editingColumn, setEditingColumn] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const { 
    boards, 
    activeBoard, 
    moveTask, 
    getTasksByStatus,
    createBoard,
    createColumn,
    updateColumn,
    deleteColumn
  } = useRencanaStore();

  // Ensure a board always exists
  useEffect(() => {
    if (!boards || boards.length === 0) {
      createBoard('Rencana Kerja Utama', 'Papan kerja default untuk manajemen tugas');
    }
  }, [boards, createBoard]);

  // Find the current board, defaulting to the first board if no active board
  const currentBoard = useMemo(() => {
    if (!boards || boards.length === 0) return null;
    return activeBoard 
      ? boards.find((board) => board.id === activeBoard) 
      : boards[0];
  }, [boards, activeBoard]);

  // Prevent rendering if no board exists
  if (!currentBoard) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Memuat papan kerja...</p>
      </div>
    );
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !currentBoard) return;

    const sourceColumnId = result.source.droppableId;
    const destinationColumnId = result.destination.droppableId;
    const taskId = result.draggableId;

    moveTask(currentBoard.id, sourceColumnId, destinationColumnId, taskId);
  };

  const handleAddColumn = () => {
    if (!newColumnTitle.trim()) return;

    createColumn(currentBoard.id, newColumnTitle.trim());
    setNewColumnTitle('');
    setIsAddColumnDialogOpen(false);
  };

  const handleEditColumn = () => {
    if (!editingColumn || !editingColumn.title.trim()) return;

    updateColumn(currentBoard.id, editingColumn.id, { 
      title: editingColumn.title.trim() 
    });
    setEditingColumn(null);
  };

  const handleDeleteColumn = (columnId: string) => {
    // Prevent deleting if it's the last column
    if (currentBoard.columns.length <= 1) {
      alert('Tidak dapat menghapus kolom terakhir');
      return;
    }

    deleteColumn(currentBoard.id, columnId);
  };

  const filteredColumns = useMemo(() => {
    if (!currentBoard) return [];

    return currentBoard.columns.map(column => ({
      ...column,
      tasks: filterStatus 
        ? column.tasks.filter(task => task.status === filterStatus)
        : column.tasks.sort((a, b) => {
            switch (sortBy) {
              case 'priority':
                const priorityOrder = {
                  'CRITICAL': 4,
                  'HIGH': 3,
                  'MEDIUM': 2,
                  'LOW': 1
                };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
              case 'dueDate':
                return b.dueDate && a.dueDate 
                  ? new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
                  : 0;
              default:
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
          })
    }));
  }, [currentBoard, filterStatus, sortBy]);

  const renderFilterMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setFilterStatus(null)}>
          Semua Status
        </DropdownMenuItem>
        {Object.values(TaskStatus).map(status => (
          <DropdownMenuItem 
            key={status} 
            onClick={() => setFilterStatus(status)}
          >
            {status}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const renderSortMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SortDesc className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setSortBy('createdAt')}>
          Tanggal Dibuat
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortBy('priority')}>
          Prioritas
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortBy('dueDate')}>
          Tanggal Jatuh Tempo
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

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
          {renderFilterMenu()}
          {renderSortMenu()}
          <Button 
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Tambah Tugas
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setIsAddColumnDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Tambah Kolom
          </Button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-4 flex-grow overflow-x-auto">
          {filteredColumns.map((column) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <div 
                  ref={provided.innerRef} 
                  {...provided.droppableProps}
                  className="bg-gray-100 rounded-lg p-4 min-h-[500px] flex flex-col"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">{column.title}</h3>
                    <span className="text-sm text-muted-foreground">
                      {column.tasks.length} Tugas
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem 
                          onSelect={() => setEditingColumn({
                            id: column.id, 
                            title: column.title
                          })}
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit Kolom
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onSelect={() => handleDeleteColumn(column.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Hapus Kolom
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
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
                          className={cn(
                            "bg-white p-3 rounded-lg mb-3 shadow-sm cursor-move",
                            {
                              "border-2 border-red-500": task.priority === 'CRITICAL',
                              "border-2 border-orange-500": task.priority === 'HIGH',
                              "border-2 border-blue-500": task.priority === 'MEDIUM',
                            }
                          )}
                          onClick={() => setSelectedTask({
                            boardId: currentBoard.id,
                            columnId: column.id,
                            taskId: task.id
                          })}
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">{task.title}</h4>
                            <div className="flex items-center gap-2">
                              {task.dueDate && (
                                <span className="text-xs text-muted-foreground">
                                  {format(new Date(task.dueDate), 'dd MMM')}
                                </span>
                              )}
                              <span 
                                className={cn(
                                  "text-xs px-2 py-1 rounded-full",
                                  {
                                    "bg-red-100 text-red-800": task.priority === 'CRITICAL',
                                    "bg-orange-100 text-orange-800": task.priority === 'HIGH',
                                    "bg-blue-100 text-blue-800": task.priority === 'MEDIUM',
                                    "bg-gray-100 text-gray-800": task.priority === 'LOW',
                                  }
                                )}
                              >
                                {task.priority}
                              </span>
                            </div>
                          </div>
                          {task.description && (
                            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                              {task.description}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1">
                              {task.checklist && (
                                <span className="text-xs text-muted-foreground">
                                  {task.checklist.filter(item => item.completed).length} / {task.checklist.length}
                                </span>
                              )}
                              {task.comments && task.comments.length > 0 && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <MessageSquare className="h-3 w-3" />
                                  {task.comments.length}
                                </div>
                              )}
                            </div>
                            {task.assignees && task.assignees.length > 0 && (
                              <div className="flex -space-x-2">
                                {task.assignees.slice(0, 3).map((assignee, index) => (
                                  <Avatar key={index} className="h-6 w-6 border-2 border-white">
                                    <AvatarFallback className="text-xs">
                                      {assignee.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                                {task.assignees.length > 3 && (
                                  <div className="h-6 w-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                                    +{task.assignees.length - 3}
                                  </div>
                                )}
                              </div>
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
          ))}
        </div>
      </DragDropContext>

      <CreateTaskDialog 
        open={isCreateOpen} 
        onOpenChange={setIsCreateOpen} 
        boardId={currentBoard.id} 
      />

      {selectedTask && (
        <TaskDetails 
          boardId={selectedTask.boardId}
          columnId={selectedTask.columnId}
          taskId={selectedTask.taskId}
          onClose={() => setSelectedTask(null)}
        />
      )}

      {/* Add Column Dialog */}
      <Dialog 
        open={isAddColumnDialogOpen} 
        onOpenChange={setIsAddColumnDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Kolom Baru</DialogTitle>
            <DialogDescription>
              Buat kolom baru untuk mengatur tugas Anda
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="columnTitle" className="text-right">
                Nama Kolom
              </Label>
              <Input
                id="columnTitle"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                className="col-span-3"
                placeholder="Contoh: Dalam Proses"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              onClick={handleAddColumn}
              disabled={!newColumnTitle.trim()}
            >
              Tambah Kolom
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Column Dialog */}
      <Dialog 
        open={!!editingColumn} 
        onOpenChange={() => setEditingColumn(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Kolom</DialogTitle>
            <DialogDescription>
              Ubah nama kolom yang ada
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editColumnTitle" className="text-right">
                Nama Kolom
              </Label>
              <Input
                id="editColumnTitle"
                value={editingColumn?.title || ''}
                onChange={(e) => setEditingColumn(prev => 
                  prev ? { ...prev, title: e.target.value } : null
                )}
                className="col-span-3"
                placeholder="Contoh: Dalam Proses"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              onClick={handleEditColumn}
              disabled={!editingColumn?.title.trim()}
            >
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
