import axios from 'axios';
import { mockProjects, mockUser } from './mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:5000';
const isProduction = process.env.NODE_ENV === 'production';

// API client with mock data fallback for GitHub Pages
export const apiClient = {
  async getProjects() {
    if (isProduction) {
      // Return mock data for GitHub Pages deployment
      return { data: mockProjects };
    }
    
    try {
      const response = await axios.get(`${API_BASE_URL}/api/projects/`);
      return response;
    } catch (error) {
      console.warn('API not available, using mock data');
      return { data: mockProjects };
    }
  },

  async loginAdmin(password: string) {
    if (isProduction) {
      // Mock login for GitHub Pages
      if (password === 'demo123') {
        return {
          data: {
            token: 'mock-token-for-github-pages',
            message: 'Login successful (Demo Mode)'
          }
        };
      } else {
        throw new Error('Invalid password for demo');
      }
    }

    return axios.post(`${API_BASE_URL}/api/admin/login`, { password });
  },

  async createProject(data: any, token: string) {
    if (isProduction) {
      // Mock create for GitHub Pages
      console.log('Demo mode: Project creation simulated', data);
      return {
        data: {
          message: 'Project created successfully (Demo Mode)',
          project: { id: Date.now(), ...data }
        }
      };
    }

    return axios.post(`${API_BASE_URL}/api/admin/projects`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async updateProject(id: number, data: any, token: string) {
    if (isProduction) {
      // Mock update for GitHub Pages
      console.log('Demo mode: Project update simulated', { id, data });
      return {
        data: {
          message: 'Project updated successfully (Demo Mode)',
          project: { id, ...data }
        }
      };
    }

    return axios.put(`${API_BASE_URL}/api/admin/projects/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async deleteProject(id: number, token: string) {
    if (isProduction) {
      // Mock delete for GitHub Pages
      console.log('Demo mode: Project deletion simulated', id);
      return {
        data: { message: 'Project deleted successfully (Demo Mode)' }
      };
    }

    return axios.delete(`${API_BASE_URL}/api/admin/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};