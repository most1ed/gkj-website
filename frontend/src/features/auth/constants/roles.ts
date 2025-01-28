export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  BENDAHARA: 'bendahara',
  SEKRETARIAT: 'sekretariat',
  MAJELIS: 'majelis',
  PELAYANAN: 'pelayanan',
  USER: 'user',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

// Role Hierarchy
export const ROLE_HIERARCHY: Record<Role, Role[]> = {
  super_admin: ['admin', 'bendahara', 'sekretariat', 'majelis', 'pelayanan', 'user'],
  admin: ['bendahara', 'sekretariat', 'majelis', 'pelayanan', 'user'],
  bendahara: ['user'],
  sekretariat: ['user'],
  majelis: ['user'],
  pelayanan: ['user'],
  user: [],
};
