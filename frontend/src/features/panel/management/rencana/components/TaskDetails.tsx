import { useState } from "react";
import { format } from "date-fns";
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
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRencanaStore } from "../store/rencana-store";

interface TaskDetailsProps {
  boardId: string;
  columnId: string;
  taskId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaskDetails({
  boardId,
  columnId,
  taskId,
  open,
  onOpenChange,
}: TaskDetailsProps) {
  const [comment, setComment] = useState("");
  const { boards, updateTask } = useRencanaStore();

  const board = boards.find((b) => b.id === boardId);
  const column = board?.columns.find((c) => c.id === columnId);
  const task = column?.tasks.find((t) => t.id === taskId);

  if (!task) return null;

  const formatDate = (date: string) => {
    return formatInTimeZone(new Date(date), "Asia/Jakarta", "d MMMM yyyy");
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    updateTask(boardId, columnId, taskId, {
      comments: [...(task.comments || []), {
        id: crypto.randomUUID(),
        content: comment,
        author: "Admin",
        createdAt: new Date().toISOString(),
      }],
    });
    setComment("");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader className="space-y-4">
          <div className="flex justify-between items-start">
            <SheetTitle className="text-xl">{task.title}</SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <SheetDescription>
            dalam kolom <span className="font-medium">{column?.title}</span>
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Description */}
          <div className="space-y-2">
            <Label>Deskripsi</Label>
            <Textarea
              value={task.description || ""}
              onChange={(e) =>
                updateTask(boardId, columnId, taskId, {
                  description: e.target.value,
                })
              }
              placeholder="Tambahkan deskripsi detail..."
              className="min-h-[100px]"
            />
          </div>

          {/* Due Date */}
          {task.dueDate && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span>Tenggat: {formatDate(task.dueDate)}</span>
            </div>
          )}

          {/* Labels */}
          {task.labels && task.labels.length > 0 && (
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Label
              </Label>
              <div className="flex flex-wrap gap-2">
                {task.labels.map((label) => (
                  <Badge
                    key={label.id}
                    className={label.color}
                    variant="secondary"
                  >
                    {label.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Assignees */}
          {task.assignees && task.assignees.length > 0 && (
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Penanggung Jawab
              </Label>
              <div className="flex flex-wrap gap-2">
                {task.assignees.map((assignee) => (
                  <div
                    key={assignee}
                    className="flex items-center gap-2 bg-secondary p-1 rounded-md"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>
                        {assignee.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{assignee}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Checklist */}
          {task.checklist && task.checklist.length > 0 && (
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4" />
                Checklist
              </Label>
              <div className="space-y-2">
                {task.checklist.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() =>
                        updateTask(boardId, columnId, taskId, {
                          checklist: task.checklist?.map((i) =>
                            i.id === item.id
                              ? { ...i, completed: !i.completed }
                              : i
                          ),
                        })
                      }
                      className="h-4 w-4"
                    />
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Comments */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Komentar
            </Label>

            <form onSubmit={handleCommentSubmit} className="space-y-2">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tambahkan komentar..."
                className="min-h-[80px]"
              />
              <Button type="submit" disabled={!comment.trim()}>
                Kirim
              </Button>
            </form>

            <div className="space-y-4">
              {task.comments?.map((comment) => (
                <div key={comment.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>
                        {comment.author.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">{comment.author}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatInTimeZone(
                        new Date(comment.createdAt),
                        "Asia/Jakarta",
                        "d MMM yyyy HH:mm"
                      )}
                    </span>
                  </div>
                  <p className="text-sm pl-8">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Attachments */}
          {task.attachments && task.attachments.length > 0 && (
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Paperclip className="h-4 w-4" />
                Lampiran
              </Label>
              <div className="space-y-2">
                {task.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between p-2 bg-secondary rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <Paperclip className="h-4 w-4" />
                      <span className="text-sm">{attachment.name}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Unduh
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
