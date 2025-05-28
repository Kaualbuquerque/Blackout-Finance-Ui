// src/services/api.ts

// URL base da API configurada via variável de ambiente
export const API_URL = import.meta.env.VITE_API_URL as string;

// Tipagens para payloads e resposta
export interface RegisterPayload {
  name: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  email: string;
}

interface LoginResponseRaw {
  message: string;
  token: string;
  email: string;
}

export interface TransactionInput {
  value: number;
  category: string;
  description: string;
  data: string;
}

export interface Transaction {
  id?: number; // opcional, pois nem todas as respostas incluem
  tipo: "Entrada" | "Saída";
  valor: string;
  descricao: string;
  data: string;
  categoria: string;
}

export interface IncomeResponse {
  newIncome: Array<{
    id?: number;
    value: number;
    category: string;
    description: string;
    data: string;
  }>;
}

interface ExpenseResponse {
  newExpense: Array<{
    id?: number;
    value: number;
    category: string;
    description: string;
    data: string;
  }>;
}

export interface FinanceTotalsResponse {
  totalIncome: number;
  totalExpenses: number;
  saldoAtual: number;
}


export interface AuthResponse {
  token: string;
  user: User;
}

// Função genérica de requisição
async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${path}`;

  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erro na API');
  }

  return data;
}

// Cadastro
export function registerUser(payload: RegisterPayload): Promise<void> {
  return request<void>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// Login
export async function loginUser(
  payload: LoginPayload
): Promise<AuthResponse> {
  // Faz a requisição e lê o formato real: { message, token, email }
  const { token, email } = await request<LoginResponseRaw>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  // Retorna no formato que o front espera: { token, user }
  return {
    token,
    user: { email: email }, // Atribui o email retornado
  };
}

// Requisição autenticada
export function authRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");
  return request<T>(path, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
}

// Perfil do usuário autenticado
export function fetchProfile(): Promise<User> {
  return authRequest<User>("/api/user/profile");
}

// Buscar entradas
export async function fetchEntradas(): Promise<Transaction[]> {
  try {
    const data = await authRequest<IncomeResponse>("/api/income/");
    return data.newIncome.map((item) => ({
      id: item.id,
      tipo: "Entrada",
      valor: item.value.toString(),
      descricao: item.description,
      data: item.data,
      categoria: item.category,
    }));
  } catch {
    return [];
  }
}

// Buscar saídas
export async function fetchSaidas(): Promise<Transaction[]> {
  try {
    const data = await authRequest<ExpenseResponse>("/api/expense/");
    return data.newExpense.map((item) => ({
      id: item.id,
      tipo: "Saída",
      valor: item.value.toString(),
      descricao: item.description,
      data: item.data,
      categoria: item.category,
    }));
  } catch {
    return [];
  }
}

// Criar entrada
export async function createIncome(input: TransactionInput): Promise<Transaction> {
  const { newIncome } = await authRequest<{ newIncome: any }>("/api/income/create", {
    method: "POST",
    body: JSON.stringify(input),
    headers: { "Content-Type": "application/json" },
  });

  if (!newIncome) {
    throw new Error("Transação criada, mas a resposta do servidor está vazia ou inválida.");
  }

  return {
    tipo: "Entrada",
    valor: newIncome.value.toString(),
    descricao: newIncome.description,
    data: newIncome.data,
    categoria: newIncome.category,
  };
}



// Criar saída
export async function createExpense(input: TransactionInput): Promise<Transaction> {
  const { newExpense } = await authRequest<{ newExpense: any }>("/api/expense/create", {
    method: "POST",
    body: JSON.stringify(input),
    headers: { "Content-Type": "application/json" },
  });

  if (!newExpense) {
    throw new Error("Transação criada, mas a resposta do servidor está vazia ou inválida.");
  }

  return {
    tipo: "Saída",
    valor: newExpense.value.toString(),
    descricao: newExpense.description,
    data: newExpense.data,
    categoria: newExpense.category,
  };
}


// Remover entrada
export async function deleteIncome(id: number): Promise<void> {
  await authRequest<void>(`/api/income/${id}`, {
    method: "DELETE",
  });
}

// Remover saída
export async function deleteExpense(id: number): Promise<void> {
  await authRequest<void>(`/api/expense/${id}`, {
    method: "DELETE",
  });
}

export async function fetchFinanceTotals(): Promise<FinanceTotalsResponse> {
  return await authRequest<FinanceTotalsResponse>("/api/finance");
}
