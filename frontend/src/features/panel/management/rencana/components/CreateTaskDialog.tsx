import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Calendar as CalendarIcon, 
  Tag, 
  Users, 
  UserPlus, 
  CheckCircle2 
} from "lucide-react";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { cn } from "@/lib/utils";
import { useRencanaStore } from "../store/rencana-store";
import { 
  Task, 
  TaskStatus, 
  TaskPriority, 
  Board, 
  Column 
} from "../types/rencana.types";

interface CreateTaskDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  boardId: string;
  columnId?: string;
}

export function CreateTaskDialog({
  open = true,
  onOpenChange,
  boardId,
  columnId: initialColumnId,
}: CreateTaskDialogProps) {
  const { boards, createTask, createColumn } = useRencanaStore();
  const currentBoard = boards.find(b => b.id === boardId);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.NotStarted);
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.Medium);
  const [dueDate, setDueDate] = useState<Date>();
  const [columnId, setColumnId] = useState(initialColumnId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!boardId || !columnId) {
      console.error("Board or Column not selected");
      return;
    }

    createTask(boardId, columnId, {
      title,
      description,
      status,
      priority,
      dueDate,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setStatus(TaskStatus.NotStarted);
    setPriority(TaskPriority.Medium);
    setDueDate(undefined);

    // Close dialog
    onOpenChange?.(false);
  };

  const handleCreateColumn = () => {
    if (!boardId) return;

    const newColumnTitle = `Kolom Baru ${currentBoard?.columns.length || 0 + 1}`;
    const newColumn = createColumn(boardId, newColumnTitle);
    
    // Assuming createColumn returns the new column's ID
    setColumnId(newColumn.id);
  };

  const formatDate = (date: Date) => {
    return formatInTimeZone(date, "Asia/Jakarta", "d MMMM yyyy");
  };

  if (!currentBoard) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Buat Tugas Baru</DialogTitle>
          <DialogDescription>
            Tambahkan tugas baru ke dalam rencana kerja Anda.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Judul
            </Label>
            <Input 
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul tugas"
              className="col-span-3"
              required
            />
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right">
              Deskripsi
            </Label>
            <Textarea 
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tambahkan deskripsi tugas (opsional)"
              className="col-span-3 min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="column" className="text-right">
              Kolom
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <Select 
                value={columnId} 
                onValueChange={setColumnId}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kolom" />
                </SelectTrigger>
                <SelectContent>
                  {currentBoard.columns.map(column => (
                    <SelectItem key={column.id} value={column.id}>
                      {column.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={handleCreateColumn}
                title="Buat Kolom Baru"
              >
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select 
              value={status} 
              onValueChange={(value: TaskStatus) => setStatus(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(TaskStatus).map(statusOption => (
                  <SelectItem key={statusOption} value={statusOption}>
                    {statusOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              Prioritas
            </Label>
            <Select 
              value={priority} 
              onValueChange={(value: TaskPriority) => setPriority(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih prioritas" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(TaskPriority).map(priorityOption => (
                  <SelectItem key={priorityOption} value={priorityOption}>
                    {priorityOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dueDate" className="text-right">
              Tanggal Jatuh Tempo
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "col-span-3 pl-3 text-left font-normal",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? formatDate(dueDate) : "Pilih tanggal"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Batal
              </Button>
            </DialogClose>
            <Button type="submit">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Buat Tugas
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
