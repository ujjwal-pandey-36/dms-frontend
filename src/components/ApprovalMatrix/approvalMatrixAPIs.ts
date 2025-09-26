// services/approvalMatrix.ts

import axios from '@/api/axios';

const API_BASE = '/approvalMatrix';

export interface ApprovalMatrixPayload {
  deptID: number;
  subDeptID: number;
  AllorMajority: 'all' | 'majority';
  NumberofApprover: number;
}

export interface ApprovalMatrixList extends ApprovalMatrixPayload {
  id: number;
}

export const createApprovalMatrix = async (payload: ApprovalMatrixPayload) => {
  try {
    const { data } = await axios.post(`${API_BASE}/create`, payload);
    return data;
  } catch (error: any) {
    console.error('Error creating approval matrix:', error);
    throw new Error(
      error?.response?.data?.message || 'Failed to create approval matrix'
    );
  }
};

export const listApprovalMatrix = async (): Promise<ApprovalMatrixList[]> => {
  try {
    const { data } = await axios.get(`${API_BASE}/list`);
    return data;
  } catch (error: any) {
    console.error('Error fetching approval matrix list:', error);
    throw new Error(
      error?.response?.data?.message || 'Failed to fetch approval matrix list'
    );
  }
};

export const deleteApprovalMatrix = async (id: number) => {
  try {
    const { data } = await axios.delete(`${API_BASE}/delete/${id}`);
    return data;
  } catch (error: any) {
    console.error(`Error deleting approval matrix with id ${id}:`, error);
    throw new Error(
      error?.response?.data?.message || 'Failed to delete approval matrix'
    );
  }
};
