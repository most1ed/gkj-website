import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/auth";
import { useToast } from "@/components/ui/use-toast"; // Update useToast import to use hooks index
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
  const [password, setPassword] = useState('');

  const handleUserSelect = (user: typeof savedCredentials[0]) => {
    setSelectedUser(user);
    setPassword(user.password); // Auto-fill password for development
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedUser) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select a user role',
      });
      return;
    }
    
    setLoading(true);
    try {
      await login(selectedUser.username, password);
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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-6 space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            GKJ Panel
          </h1>
          <p className="text-sm text-muted-foreground">
            Welcome back! Please login to continue.
          </p>
        </div>

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
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={selectedUser?.username || ''}
              readOnly
              className="bg-muted"
            />
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                autoFocus={!!selectedUser}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || !selectedUser}
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          <p>Hubungi administrator jika Anda lupa password</p>
        </div>
      </div>
    </div>
  );
}
