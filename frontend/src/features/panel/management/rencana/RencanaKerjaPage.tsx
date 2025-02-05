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

  const renderFilterMenu = () => (
    <div className="rencana-filters">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="rencana-filter-button">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setFilterStatus(null)}>
            Semua
          </DropdownMenuItem>
          {Object.values(TaskStatus).map((status) => (
            <DropdownMenuItem
              key={status}
              onClick={() => setFilterStatus(status)}
            >
              {status}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="rencana-filter-button">
            <SortDesc className="h-4 w-4" />
            Urutkan
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setSortBy('priority')}>
            Prioritas
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortBy('dueDate')}>
            Tenggat Waktu
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortBy('createdAt')}>
            Tanggal Dibuat
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

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

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Mobile-friendly header */}
      <div className="flex flex-col md:flex-row items-center justify-between p-4 space-y-2 md:space-y-0">
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <h1 className="text-xl font-bold truncate flex-grow">
            {currentBoard.title}
          </h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="md:hidden"
                  onClick={() => setIsCreateOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Tambah Tugas</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Responsive filter and action buttons */}
        <div className="flex flex-wrap justify-end gap-2 w-full md:w-auto">
          <div className="flex space-x-2">
            {renderFilterMenu()}
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden md:flex"
              onClick={() => setIsCreateOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Tugas
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden md:flex"
              onClick={() => setIsAddColumnDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Kolom
            </Button>
          </div>
        </div>
      </div>

      {/* Drag and Drop Context with Mobile Scrolling */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex-grow overflow-x-auto overflow-y-hidden">
          <div className="flex space-x-4 p-4 h-full min-w-[1000px] md:min-w-full">
            {filteredColumns.map((column, columnIndex) => (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided) => (
                  <div 
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                    className="bg-muted/50 rounded-lg p-3 w-[300px] min-w-[250px] max-w-[350px]"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-sm truncate flex-grow mr-2">
                        {column.title}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-7 w-7"
                                onClick={() => {
                                  setEditingColumn({
                                    id: column.id,
                                    title: column.title
                                  });
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit Kolom</TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-7 w-7"
                                onClick={() => handleDeleteColumn(column.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Hapus Kolom</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    <div 
                      className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar"
                    >
                      {column.tasks.map((task, taskIndex) => (
                        <Draggable 
                          key={task.id} 
                          draggableId={task.id} 
                          index={taskIndex}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-background border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
                              onClick={() => setSelectedTask({
                                boardId: currentBoard.id,
                                columnId: column.id,
                                taskId: task.id
                              })}
                            >
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium text-sm flex-grow mr-2 truncate">
                                  {task.title}
                                </h4>
                                <div 
                                  className={cn(
                                    "px-2 py-1 rounded-full text-xs font-semibold",
                                    task.priority === 'CRITICAL' && 'bg-red-100 text-red-800',
                                    task.priority === 'HIGH' && 'bg-orange-100 text-orange-800',
                                    task.priority === 'MEDIUM' && 'bg-yellow-100 text-yellow-800',
                                    task.priority === 'LOW' && 'bg-green-100 text-green-800'
                                  )}
                                >
                                  {task.priority}
                                </div>
                              </div>
                              {task.dueDate && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  {format(new Date(task.dueDate), 'dd MMM yyyy')}
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      </DragDropContext>

      {/* Dialogs and Modals */}
      <CreateTaskDialog 
        open={isCreateOpen} 
        onOpenChange={setIsCreateOpen}
        boardId={currentBoard.id}
      />

      <TaskDetails 
        task={selectedTask} 
        onClose={() => setSelectedTask(null)} 
      />

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
              Ubah nama kolom yang dipilih
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
