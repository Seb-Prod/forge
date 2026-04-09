import type { HealthResponse, ActionsResponse, DevProcess, ActionResponse, ActionCategory } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const checkHealth = async (): Promise<HealthResponse> => {
  const response = await fetch(`${API_URL}/api/health`);
  return response.json();
};

export const getAllActions = async (): Promise<ActionsResponse> => {
  const response = await fetch(`${API_URL}/api/actions`);
  return response.json();
};

export const getActionsByCategory = async (category: ActionCategory): Promise<ActionsResponse> => {
  const response = await fetch(`${API_URL}/api/actions/category/${category}`);
  return response.json();
};

export const getActionStatus = async (actionId: string): Promise<DevProcess> => {
  const response = await fetch(`${API_URL}/api/actions/${actionId}`);
  return response.json();
};

export const startAction = async (actionId: string, args: string[] = []): Promise<ActionResponse> => {
  const response = await fetch(`${API_URL}/api/actions/${actionId}/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ args }),
  });
  return response.json();
};

export const stopAction = async (actionId: string): Promise<ActionResponse> => {
  const response = await fetch(`${API_URL}/api/actions/${actionId}/stop`, {
    method: 'POST',
  });
  return response.json();
};

export const restartAction = async (actionId: string, args: string[] = []): Promise<ActionResponse> => {
  const response = await fetch(`${API_URL}/api/actions/${actionId}/restart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ args }),
  });
  return response.json();
};

export const shutdownForge = async (): Promise<ActionResponse> => {
  const response = await fetch(`${API_URL}/api/shutdown`, {
    method: 'POST',
  });
  return response.json();
};

export const runAction = async <T = unknown>(actionId: string, args: string[] = []): Promise<T> => {
  const response = await fetch(`${API_URL}/api/actions/${actionId}/run`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ args }),
  });
  const { data } = await response.json();
  return data;
};