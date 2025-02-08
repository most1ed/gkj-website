import { api } from './axios';
import { z } from 'zod';

// Reuse existing type validation or create a new one
export const PageSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Judul diperlukan"),
  content: z.record(z.any()).optional(),
  type: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
  authorId: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

export type Page = z.infer<typeof PageSchema>;

export const createPage = async (pageData: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const response = await api.post('/pages', pageData);
    return PageSchema.parse(response.data);
  } catch (error) {
    console.error('Gagal membuat halaman:', error);
    throw error;
  }
};

export const getPages = async (filters?: { type?: 'DRAFT' | 'PUBLISHED' }) => {
  try {
    const response = await api.get('/pages', { params: filters });
    return response.data.map((page: any) => PageSchema.parse(page));
  } catch (error) {
    console.error('Gagal mengambil halaman:', error);
    throw error;
  }
};

export const updatePage = async (id: string, pageData: Partial<Page>) => {
  try {
    const response = await api.patch(`/pages/${id}`, pageData);
    return PageSchema.parse(response.data);
  } catch (error) {
    console.error('Gagal memperbarui halaman:', error);
    throw error;
  }
};

export const deletePage = async (id: string) => {
  try {
    await api.delete(`/pages/${id}`);
  } catch (error) {
    console.error('Gagal menghapus halaman:', error);
    throw error;
  }
};
