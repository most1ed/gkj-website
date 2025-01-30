import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Label {
  id: string;
  name: string;
  color: string;
}

interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
}

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  labels?: Label[];
  assignees?: string[];
  comments?: Comment[];
  attachments?: Attachment[];
  checklist?: ChecklistItem[];
  createdAt: string;
  updatedAt: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface Board {
  id: string;
  title: string;
  description?: string;
  columns: Column[];
  createdAt: string;
  updatedAt: string;
}

interface RencanaState {
  boards: Board[];
  activeBoard: string | null;
  setActiveBoard: (boardId: string | null) => void;
  createBoard: (title: string, description?: string) => void;
  updateBoard: (boardId: string, updates: Partial<Board>) => void;
  deleteBoard: (boardId: string) => void;
  createColumn: (boardId: string, title: string) => void;
  updateColumn: (boardId: string, columnId: string, title: string) => void;
  deleteColumn: (boardId: string, columnId: string) => void;
  createTask: (boardId: string, columnId: string, task: Partial<Task>) => void;
  updateTask: (
    boardId: string,
    columnId: string,
    taskId: string,
    updates: Partial<Task>
  ) => void;
  deleteTask: (boardId: string, columnId: string, taskId: string) => void;
  moveTask: (
    boardId: string,
    sourceColumnId: string,
    destinationColumnId: string,
    taskId: string
  ) => void;
}

export const useRencanaStore = create<RencanaState>()(
  persist(
    (set) => ({
      boards: [],
      activeBoard: null,

      setActiveBoard: (boardId) => set({ activeBoard: boardId }),

      createBoard: (title, description) =>
        set((state) => ({
          boards: [
            ...state.boards,
            {
              id: crypto.randomUUID(),
              title,
              description,
              columns: [
                {
                  id: "todo",
                  title: "Perlu Dikerjakan",
                  tasks: [],
                },
                {
                  id: "in-progress",
                  title: "Sedang Dikerjakan",
                  tasks: [],
                },
                {
                  id: "done",
                  title: "Selesai",
                  tasks: [],
                },
              ],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        })),

      updateBoard: (boardId, updates) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                }
              : board
          ),
        })),

      deleteBoard: (boardId) =>
        set((state) => ({
          boards: state.boards.filter((board) => board.id !== boardId),
          activeBoard: state.activeBoard === boardId ? null : state.activeBoard,
        })),

      createColumn: (boardId, title) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  columns: [
                    ...board.columns,
                    {
                      id: crypto.randomUUID(),
                      title,
                      tasks: [],
                    },
                  ],
                  updatedAt: new Date().toISOString(),
                }
              : board
          ),
        })),

      updateColumn: (boardId, columnId, title) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  columns: board.columns.map((column) =>
                    column.id === columnId ? { ...column, title } : column
                  ),
                  updatedAt: new Date().toISOString(),
                }
              : board
          ),
        })),

      deleteColumn: (boardId, columnId) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  columns: board.columns.filter(
                    (column) => column.id !== columnId
                  ),
                  updatedAt: new Date().toISOString(),
                }
              : board
          ),
        })),

      createTask: (boardId, columnId, task) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  columns: board.columns.map((column) =>
                    column.id === columnId
                      ? {
                          ...column,
                          tasks: [
                            ...column.tasks,
                            {
                              id: crypto.randomUUID(),
                              createdAt: new Date().toISOString(),
                              updatedAt: new Date().toISOString(),
                              ...task,
                            } as Task,
                          ],
                        }
                      : column
                  ),
                  updatedAt: new Date().toISOString(),
                }
              : board
          ),
        })),

      updateTask: (boardId, columnId, taskId, updates) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  columns: board.columns.map((column) =>
                    column.id === columnId
                      ? {
                          ...column,
                          tasks: column.tasks.map((task) =>
                            task.id === taskId
                              ? {
                                  ...task,
                                  ...updates,
                                  updatedAt: new Date().toISOString(),
                                }
                              : task
                          ),
                        }
                      : column
                  ),
                  updatedAt: new Date().toISOString(),
                }
              : board
          ),
        })),

      deleteTask: (boardId, columnId, taskId) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  columns: board.columns.map((column) =>
                    column.id === columnId
                      ? {
                          ...column,
                          tasks: column.tasks.filter(
                            (task) => task.id !== taskId
                          ),
                        }
                      : column
                  ),
                  updatedAt: new Date().toISOString(),
                }
              : board
          ),
        })),

      moveTask: (boardId, sourceColumnId, destinationColumnId, taskId) =>
        set((state) => {
          const board = state.boards.find((b) => b.id === boardId);
          if (!board) return state;

          const sourceColumn = board.columns.find((c) => c.id === sourceColumnId);
          if (!sourceColumn) return state;

          const task = sourceColumn.tasks.find((t) => t.id === taskId);
          if (!task) return state;

          return {
            boards: state.boards.map((board) =>
              board.id === boardId
                ? {
                    ...board,
                    columns: board.columns.map((column) => {
                      if (column.id === sourceColumnId) {
                        return {
                          ...column,
                          tasks: column.tasks.filter((t) => t.id !== taskId),
                        };
                      }
                      if (column.id === destinationColumnId) {
                        return {
                          ...column,
                          tasks: [...column.tasks, task],
                        };
                      }
                      return column;
                    }),
                    updatedAt: new Date().toISOString(),
                  }
                : board
            ),
          };
        }),
    }),
    {
      name: "rencana-storage",
    }
  )
);
