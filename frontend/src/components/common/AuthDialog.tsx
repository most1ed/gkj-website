import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useAuth, useToast } from '@/hooks';
import { cn } from "@/lib/utils";

export interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
  variant?: 'login' | 'register' | 'reset-password';
  onSwitchVariant?: (variant: 'login' | 'register' | 'reset-password') => void;
  className?: string;
}

export function AuthDialog({ 
  open, 
  onClose, 
  variant = 'login', 
  onSwitchVariant,
  className 
}: AuthDialogProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login, register, resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      switch (variant) {
        case 'login':
          await login(email, password);
          break;
        case 'register':
          if (password !== confirmPassword) {
            throw new Error("Passwords do not match");
          }
          await register(email, password);
          break;
        case 'reset-password':
          await resetPassword(email);
          break;
      }
      onClose();
    } catch (error) {
      console.error(`${variant} failed`, error);
    }
  };

  const renderDialogTitle = () => {
    switch (variant) {
      case 'login': return 'Login';
      case 'register': return 'Register';
      case 'reset-password': return 'Reset Password';
    }
  };

  const renderForm = () => {
    switch (variant) {
      case 'login':
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <Button 
                type="button" 
                variant="link" 
                onClick={() => onSwitchVariant?.('reset-password')}
              >
                Forgot Password?
              </Button>
              <Button 
                type="button" 
                variant="link" 
                onClick={() => onSwitchVariant?.('register')}
              >
                Register
              </Button>
            </div>
          </>
        );
      
      case 'register':
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <Button 
                type="button" 
                variant="link" 
                onClick={() => onSwitchVariant?.('login')}
              >
                Already have an account?
              </Button>
            </div>
          </>
        );
      
      case 'reset-password':
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <Button 
                type="button" 
                variant="link" 
                onClick={() => onSwitchVariant?.('login')}
              >
                Back to Login
              </Button>
            </div>
          </>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={cn("sm:max-w-[425px]", className)}>
        <DialogHeader>
          <DialogTitle>{renderDialogTitle()}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderForm()}
          <Button type="submit" className="w-full">
            {renderDialogTitle()}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
