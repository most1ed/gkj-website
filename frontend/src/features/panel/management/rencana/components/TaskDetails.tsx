import React, { useState, useMemo } from "react";
import { format, formatDistance } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import {
  Calendar,
  MessageSquare,
  Paperclip,
  Tag,
  Users,
  X,
  Clock,
  CheckSquare,
  Edit3,
  Trash2,
  MoreHorizontal,
  Save
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useRencanaStore } from "../store/rencana-store";
import { 
  Task, 
  TaskStatus, 
  TaskPriority, 
  Comment as CommentType 
} from "../types/rencana.types";
import { cn } from "@/lib/utils";

interface TaskDetailsProps {
  boardId: string;
  columnId: string;
  taskId: string;
  onClose: () => void;
}

export function TaskDetails({
  boardId,
  columnId,
  taskId,
  onClose,
}: TaskDetailsProps) {
  const { boards, updateTask, deleteTask } = useRencanaStore();

  const board = boards.find((b) => b.id === boardId);
  const column = board?.columns.find((c) => c.id === columnId);
  const task = column?.tasks.find((t) => t.id === taskId);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Partial<Task>>({});
  const [newComment, setNewComment] = useState("");

  if (!task) {
    return null;
  }

  const handleUpdateTask = () => {
    updateTask(boardId, columnId, taskId, editedTask);
    setIsEditing(false);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const commentToAdd: CommentType = {
      id: `comment_${Date.now()}`,
      content: newComment,
      author: 'current_user', // Replace with actual user
      createdAt: new Date()
    };

    updateTask(boardId, columnId, taskId, {
      comments: [...(task.comments || []), commentToAdd]
    });

    setNewComment("");
  };

  const handleDeleteTask = () => {
    deleteTask(boardId, columnId, taskId);
    onClose();
  };

  const renderPriorityBadge = (priority: TaskPriority) => {
    const priorityColors = {
      'CRITICAL': 'bg-red-500 text-white',
      'HIGH': 'bg-orange-500 text-white',
      'MEDIUM': 'bg-blue-500 text-white',
      'LOW': 'bg-gray-500 text-white'
    };

    return (
      <Badge className={priorityColors[priority]}>
        {priority}
      </Badge>
    );
  };

  const renderStatusBadge = (status: TaskStatus) => {
    const statusColors = {
      'NOT_STARTED': 'bg-gray-500 text-white',
      'IN_PROGRESS': 'bg-blue-500 text-white',
      'BLOCKED': 'bg-red-500 text-white',
      'UNDER_REVIEW': 'bg-yellow-500 text-white',
      'COMPLETED': 'bg-green-500 text-white'
    };

    return (
      <Badge className={statusColors[status]}>
        {status}
      </Badge>
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            {isEditing ? (
              <Input 
                value={editedTask.title || task.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                className="text-2xl font-bold w-full"
              />
            ) : (
              <DialogTitle className="text-2xl">{task.title}</DialogTitle>
            )}
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {isEditing ? (
                    <>
                      <DropdownMenuItem onClick={handleUpdateTask}>
                        <Save className="mr-2 h-4 w-4" /> Simpan
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setIsEditing(false)}>
                        <X className="mr-2 h-4 w-4" /> Batal
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem onClick={() => setIsEditing(true)}>
                        <Edit3 className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600" 
                        onClick={handleDeleteTask}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Hapus
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <DialogDescription>
            {isEditing ? (
              <Textarea 
                value={editedTask.description || task.description || ''}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                className="w-full min-h-[100px]"
                placeholder="Tambahkan deskripsi tugas"
              />
            ) : (
              task.description || 'Tidak ada deskripsi'
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Komentar</h3>
              <div className="space-y-2">
                {task.comments?.map((comment) => (
                  <div key={comment.id} className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>
                            {comment.author.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{comment.author}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDistance(new Date(comment.createdAt), new Date(), { addSuffix: true })}
                      </span>
                    </div>
                    <p>{comment.content}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Input 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Tambahkan komentar"
                  className="flex-grow"
                />
                <Button 
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                >
                  Kirim
                </Button>
              </div>
            </div>

            {task.checklist && task.checklist.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">Checklist</h3>
                {task.checklist.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={item.completed} 
                      onChange={() => {
                        // Implement checklist item toggle
                      }}
                    />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Detail</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>Status</span>
                  {isEditing ? (
                    <Select 
                      value={editedTask.status || task.status}
                      onValueChange={(value: TaskStatus) => setEditedTask({ ...editedTask, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(TaskStatus).map(status => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    renderStatusBadge(task.status)
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <span>Prioritas</span>
                  {isEditing ? (
                    <Select 
                      value={editedTask.priority || task.priority}
                      onValueChange={(value: TaskPriority) => setEditedTask({ ...editedTask, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(TaskPriority).map(priority => (
                          <SelectItem key={priority} value={priority}>
                            {priority}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    renderPriorityBadge(task.priority)
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Dibuat</span>
                  <span>{format(new Date(task.createdAt), 'dd MMMM yyyy')}</span>
                </div>

                {task.dueDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>Jatuh Tempo</span>
                    {isEditing ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline">
                            {task.dueDate ? format(new Date(task.dueDate), 'dd MMMM yyyy') : 'Pilih tanggal'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <CalendarComponent
                            mode="single"
                            selected={task.dueDate ? new Date(task.dueDate) : undefined}
                            onSelect={(date) => setEditedTask({ ...editedTask, dueDate: date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <span>{format(new Date(task.dueDate), 'dd MMMM yyyy')}</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {task.attachments && task.attachments.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Paperclip className="h-4 w-4" /> Lampiran
                </h3>
                {task.attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                    <div className="flex items-center gap-2">
                      <span>{attachment.name}</span>
                      <Badge variant="secondary">{attachment.type}</Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
