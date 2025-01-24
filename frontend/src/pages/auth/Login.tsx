import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Users, Shield, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

type UserRole = 'warga' | 'majelis' | 'admin';

interface RoleOption {
  id: UserRole;
  title: string;
  description: string;
  icon: React.ReactNode;
  fields: Array<{
    id: string;
    label: string;
    type: string;
    placeholder: string;
    required?: boolean;
  }>;
}

const roleOptions: RoleOption[] = [
  {
    id: 'warga',
    title: 'Warga Gereja',
    description: 'Akses ke informasi umum dan kegiatan gereja',
    icon: <User className="w-6 h-6" />,
    fields: [
      {
        id: 'noAnggota',
        label: 'Nomor Anggota',
        type: 'text',
        placeholder: 'Masukkan nomor anggota',
        required: true
      },
      {
        id: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Masukkan password',
        required: true
      }
    ]
  },
  {
    id: 'majelis',
    title: 'Majelis',
    description: 'Akses ke manajemen pelayanan dan data jemaat',
    icon: <Users className="w-6 h-6" />,
    fields: [
      {
        id: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Masukkan email majelis',
        required: true
      },
      {
        id: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Masukkan password',
        required: true
      },
      {
        id: 'bidang',
        label: 'Bidang Pelayanan',
        type: 'text',
        placeholder: 'Masukkan bidang pelayanan',
        required: true
      }
    ]
  },
  {
    id: 'admin',
    title: 'Admin',
    description: 'Akses penuh ke sistem dan manajemen pengguna',
    icon: <Shield className="w-6 h-6" />,
    fields: [
      {
        id: 'username',
        label: 'Username Admin',
        type: 'text',
        placeholder: 'Masukkan username admin',
        required: true
      },
      {
        id: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Masukkan password',
        required: true
      },
      {
        id: 'token',
        label: 'Token Autentikasi',
        type: 'text',
        placeholder: 'Masukkan token autentikasi',
        required: true
      }
    ]
  }
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setFormData({});
    setError(null);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    try {
      setIsLoading(true);
      setError(null);

      // Call login from useAuth hook
      await login(selectedRole, formData);

      // Redirect based on role
      switch (selectedRole) {
        case 'warga':
          navigate('/dashboard/warga');
          break;
        case 'majelis':
          navigate('/dashboard/majelis');
          break;
        case 'admin':
          navigate('/dashboard/admin');
          break;
      }
    } catch (err) {
      setError('Login gagal. Silakan periksa kembali kredensial Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <Card className="p-6">
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400"
            >
              GKJ Grogol Jakarta
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground mt-2"
            >
              Silakan pilih peran dan masuk ke sistem
            </motion.p>
          </div>

          {!selectedRole ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {roleOptions.map((role) => (
                <motion.div
                  key={role.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={() => handleRoleSelect(role.id)}
                    className="w-full p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:border-primary/50 hover:bg-accent transition-colors"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-3 rounded-full bg-primary/10 text-primary">
                        {role.icon}
                      </div>
                      <h2 className="text-xl font-semibold">{role.title}</h2>
                      <p className="text-sm text-muted-foreground text-center">
                        {role.description}
                      </p>
                      <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
                    </div>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Button
                variant="ghost"
                onClick={() => setSelectedRole(null)}
                className="mb-6"
              >
                ← Kembali ke pilihan peran
              </Button>

              <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
                <div className="text-xl font-semibold mb-4 flex items-center gap-2">
                  {roleOptions.find(r => r.id === selectedRole)?.icon}
                  <span>Login sebagai {roleOptions.find(r => r.id === selectedRole)?.title}</span>
                </div>

                {roleOptions
                  .find(r => r.id === selectedRole)
                  ?.fields.map((field) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <label
                        htmlFor={field.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {field.label}
                      </label>
                      <div className="relative">
                        <Input
                          id={field.id}
                          type={field.type === 'password' ? (showPassword ? 'text' : 'password') : field.type}
                          placeholder={field.placeholder}
                          value={formData[field.id] || ''}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          required={field.required}
                          className="w-full"
                        />
                        {field.type === 'password' && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-500 mt-2"
                  >
                    {error}
                  </motion.p>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    'Masuk'
                  )}
                </Button>
              </form>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
