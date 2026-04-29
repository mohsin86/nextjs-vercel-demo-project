import { NextResponse } from 'next/server';
import { createTodo, getTodos } from '@/lib/services/todos.service';

export async function GET() {
  const todos = await getTodos();
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const body = await req.json();

  const todo = await createTodo(body);

  return NextResponse.json(todo);
}