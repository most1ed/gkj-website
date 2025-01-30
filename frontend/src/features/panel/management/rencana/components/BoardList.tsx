import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRencanaStore } from "../store/rencana-store";
import { CreateBoardDialog } from "./CreateBoardDialog";

export function BoardList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { boards, setActiveBoard } = useRencanaStore();

  const filteredBoards = boards.filter((board) =>
    board.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Rencana Kerja</h2>
          <p className="text-muted-foreground">
            Kelola dan pantau perkembangan program kerja gereja
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Papan Baru
        </Button>
      </div>

      <div className="w-full max-w-sm mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari papan kerja..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredBoards.map((board) => (
          <Card
            key={board.id}
            className="cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => setActiveBoard(board.id)}
          >
            <CardHeader>
              <CardTitle>{board.title}</CardTitle>
              {board.description && (
                <CardDescription>{board.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-muted-foreground">
                <div>
                  {board.columns.reduce(
                    (acc, col) => acc + col.tasks.length,
                    0
                  )}{" "}
                  tugas
                </div>
                <div>
                  {board.columns.find((col) => col.id === "done")?.tasks.length ||
                    0}{" "}
                  selesai
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CreateBoardDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </>
  );
}
