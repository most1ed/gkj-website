import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidv4 } from 'uuid';
import { 
  Board, 
  Task, 
  Column, 
  TaskStatus, 
  TaskPriority, 
  BoardSchema 
} from '../types/rencana.types';
import { z } from 'zod';

interface RencanaState {
  boards: Board[];
  activeBoard: string | null;
  
  // Board Operations
  createBoard: (title: string, description?: string) => void;
  updateBoard: (boardId: string, updates: Partial<Board>) => void;
  deleteBoard: (boardId: string) => void;
  setActiveBoard: (boardId: string | null) => void;
  
  // Column Operations
  createColumn: (boardId: string, title: string) => void;
  updateColumn: (boardId: string, columnId: string, updates: Partial<Column>) => void;
  deleteColumn: (boardId: string, columnId: string) => void;
  
  // Task Operations
  createTask: (boardId: string, columnId: string, task: Partial<Task>) => void;
  updateTask: (boardId: string, columnId: string, taskId: string, updates: Partial<Task>) => void;
  deleteTask: (boardId: string, columnId: string, taskId: string) => void;
  moveTask: (boardId: string, sourceColumnId: string, destinationColumnId: string, taskId: string) => void;
  
  // Advanced Queries
  getTasksByStatus: (boardId: string, status: TaskStatus) => Task[];
  getTasksByPriority: (boardId: string, priority: TaskPriority) => Task[];
}

export const useRencanaStore = create<RencanaState>()(
  persist(
    (set, get) => ({
      boards: [],
      activeBoard: null,
      
      // Ensure these methods always return a valid state
      createBoard: (title, description) => {
        const newBoard: Board = {
          id: uuidv4(),
          title: title || 'Rencana Kerja Utama',
          description: description || 'Papan kerja default untuk manajemen tugas',
          columns: [
            {
              id: uuidv4(),
              title: 'Belum Dimulai',
              tasks: []
            },
            {
              id: uuidv4(),
              title: 'Sedang Berjalan',
              tasks: []
            },
            {
              id: uuidv4(),
              title: 'Selesai',
              tasks: []
            }
          ]
        };

        set(state => {
          const updatedBoards = [...state.boards, newBoard];
          return {
            boards: updatedBoards,
            activeBoard: newBoard.id
          };
        });

        return newBoard.id;
      },
      
      updateBoard: (boardId, updates) => {
        set(state => ({
          boards: state.boards.map(board => 
            board.id === boardId 
              ? { ...board, ...updates, updatedAt: new Date() } 
              : board
          )
        }));
      },
      
      deleteBoard: (boardId) => {
        set(state => {
          const updatedBoards = state.boards.filter(b => b.id !== boardId);
          return {
            boards: updatedBoards,
            activeBoard: updatedBoards.length > 0 ? updatedBoards[0].id : null
          };
        });
      },
      
      setActiveBoard: (boardId) => {
        set({ activeBoard: boardId });
      },
      
      createColumn: (boardId, title) => {
        set(state => ({
          boards: state.boards.map(board => 
            board.id === boardId 
              ? { 
                  ...board, 
                  columns: [
                    ...board.columns, 
                    { 
                      id: uuidv4(), 
                      title, 
                      tasks: [] 
                    }
                  ] 
                }
              : board
          )
        }));
      },
      
      updateColumn: (boardId, columnId, updates) => {
        set(state => ({
          boards: state.boards.map(board => 
            board.id === boardId 
              ? {
                  ...board,
                  columns: board.columns.map(column => 
                    column.id === columnId
                      ? { ...column, ...updates }
                      : column
                  )
                }
              : board
          )
        }));
      },
      
      deleteColumn: (boardId, columnId) => {
        set(state => {
          const updatedBoards = state.boards.map(board => {
            if (board.id !== boardId) return board;

            // If this is the last column, prevent deletion
            if (board.columns.length <= 1) return board;

            return {
              ...board,
              columns: board.columns.filter(column => column.id !== columnId)
            };
          });

          return { boards: updatedBoards };
        });
      },
      
      createTask: (boardId, columnId, taskData) => {
        set(state => ({
          boards: state.boards.map(board => 
            board.id === boardId
              ? {
                  ...board,
                  columns: board.columns.map(column => 
                    column.id === columnId
                      ? {
                          ...column,
                          tasks: [
                            ...column.tasks,
                            {
                              id: uuidv4(),
                              boardId,
                              columnId,
                              title: taskData.title || 'Tugas Baru',
                              description: taskData.description || '',
                              status: TaskStatus.NotStarted,
                              priority: TaskPriority.Medium,
                              creator: {
                                id: 'current_user',
                                name: 'Current User'
                              },
                              createdAt: new Date(),
                              updatedAt: new Date(),
                              ...taskData
                            }
                          ]
                        }
                      : column
                  )
                }
              : board
          )
        }));
      },
      
      updateTask: (boardId, columnId, taskId, updates) => {
        set(state => ({
          boards: state.boards.map(board => 
            board.id === boardId
              ? {
                  ...board,
                  columns: board.columns.map(column => 
                    column.id === columnId
                      ? {
                          ...column,
                          tasks: column.tasks.map(task => 
                            task.id === taskId
                              ? { 
                                  ...task, 
                                  ...updates, 
                                  updatedAt: new Date() 
                                }
                              : task
                          )
                        }
                      : column
                  )
                }
              : board
          )
        }));
      },
      
      deleteTask: (boardId, columnId, taskId) => {
        set(state => ({
          boards: state.boards.map(board => 
            board.id === boardId
              ? {
                  ...board,
                  columns: board.columns.map(column => 
                    column.id === columnId
                      ? {
                          ...column,
                          tasks: column.tasks.filter(task => task.id !== taskId)
                        }
                      : column
                  )
                }
              : board
          )
        }));
      },
      
      moveTask: (boardId, sourceColumnId, destinationColumnId, taskId) => {
        set(state => {
          const updatedBoards = state.boards.map(board => {
            if (board.id !== boardId) return board;
            
            return {
              ...board,
              columns: board.columns.map(column => {
                // Source column: remove the task
                if (column.id === sourceColumnId) {
                  return {
                    ...column,
                    tasks: column.tasks.filter(task => task.id !== taskId)
                  };
                }
                
                // Destination column: add the task
                if (column.id === destinationColumnId) {
                  const movedTask = state.boards
                    .find(b => b.id === boardId)
                    ?.columns.find(c => c.id === sourceColumnId)
                    ?.tasks.find(t => t.id === taskId);
                  
                  return movedTask ? {
                    ...column,
                    tasks: [
                      ...column.tasks, 
                      { 
                        ...movedTask, 
                        columnId: destinationColumnId 
                      }
                    ]
                  } : column;
                }
                
                return column;
              })
            };
          });
          
          return { boards: updatedBoards };
        });
      },
      
      // Advanced Queries
      getTasksByStatus: (boardId, status) => {
        const board = get().boards.find(b => b.id === boardId);
        if (!board) return [];
        
        return board.columns.flatMap(column => 
          column.tasks.filter(task => task.status === status)
        );
      },
      
      getTasksByPriority: (boardId, priority) => {
        const board = get().boards.find(b => b.id === boardId);
        if (!board) return [];
        
        return board.columns.flatMap(column => 
          column.tasks.filter(task => task.priority === priority)
        );
      }
    }),
    {
      name: "rencana-storage",
      version: 1,
      // Ensure initial state is always valid
      onRehydrateStorage: () => (state) => {
        if (!state || !state.boards) {
          state?.createBoard('Rencana Kerja Utama', 'Papan kerja default untuk manajemen tugas');
        }
      }
    }
  )
);
