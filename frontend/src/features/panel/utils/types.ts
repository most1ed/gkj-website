// Common Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'majelis' | 'user';
  memberNumber?: string;
  region?: string;
}

// Base User Types
export interface UserProfile {
  personal: {
    name: string;
    email: string;
    phone: string;
    address: string;
    birthDate: string;
    baptismDate?: string;
    marriageDate?: string;
  };
  family?: {
    familyId: string;
    role: string;
    members: Array<{
      name: string;
      relation: string;
    }>;
  };
  activities?: Array<{
    id: string;
    name: string;
    date: string;
    type: string;
  }>;
}

// Majelis Types
export interface JemaatData {
  id: string;
  name: string;
  memberNumber: string;
  region: string;
  status: 'active' | 'inactive';
  familyId?: string;
}

export interface IbadahData {
  id: string;
  date: string;
  type: string;
  theme?: string;
  liturgist?: string;
  preacher?: string;
}

// Admin Types
export interface ContentData {
  id: string;
  title: string;
  content: string;
  type: 'about' | 'history' | 'vision' | 'organization';
  lastUpdated: string;
}

export interface MediaData {
  id: string;
  title: string;
  type: 'image' | 'video' | 'sermon';
  url: string;
  uploadDate: string;
  description?: string;
}
