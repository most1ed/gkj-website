import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/auth";
import { useToast } from "@/components/ui/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

const savedCredentials = [
  { 
    username: 'admin', 
    password: 'admin123',
    role: 'Administrator',
    description: 'Akses penuh ke sistem dan manajemen pengguna'
  },
  { 
    username: 'majelis', 
    password: 'majelis123',
    role: 'Majelis',
    description: 'Akses ke manajemen pelayanan dan data jemaat'
  },
  { 
    username: 'user', 
    password: 'user123',
    role: 'Warga Gereja',
    description: 'Akses ke informasi umum dan kegiatan gereja'
  }
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof savedCredentials[0] | null>(null);

  const handleUserSelect = (user: typeof savedCredentials[0]) => {
    setSelectedUser(user);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedUser) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Silakan pilih peran untuk login',
      });
      return;
    }
    
    setLoading(true);
    try {
      await login(selectedUser.username, selectedUser.password);
      navigate('/panel');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Login gagal',
        description: 'Username atau password salah',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px]">
        <div className="bg-card rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold tracking-tight">
              GKJ Panel
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Welcome back! Please login to continue.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between"
                  type="button"
                >
                  {selectedUser ? (
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">{selectedUser.role}</span>
                        <span className="text-xs text-muted-foreground">{selectedUser.username}</span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Pilih peran untuk login</span>
                  )}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <div className="rounded-lg border bg-card">
                  {savedCredentials.map((cred) => (
                    <button
                      key={cred.username}
                      type="button"
                      className="flex w-full items-center gap-3 p-3 hover:bg-accent transition-colors first:rounded-t-lg last:rounded-b-lg border-b last:border-0"
                      onClick={() => handleUserSelect(cred)}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{cred.role}</span>
                        <span className="text-sm text-muted-foreground">{cred.description}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            <div className="space-y-2">
              <div className="space-y-1">
                <label className="text-sm font-medium">Username</label>
                <Input
                  type="text"
                  value={selectedUser?.username || ''}
                  readOnly
                  className="bg-muted"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={selectedUser?.password || ''}
                    readOnly
                    className="bg-muted pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={loading || !selectedUser}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Hubungi administrator jika Anda lupa password
          </p>
        </div>
      </div>
    </div>
  );
}
