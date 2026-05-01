import { NextResponse } from 'next/server';
import { updateTodo, deleteTodo } from '@/lib/services/todo.service';

// UPDATE
export async function PUT( req: Request, { params }:  { params: Promise<{ id: string }> }) {
  try {
    const body = await req.json();
    const id = (await params).id;

    if (!id) {
      return NextResponse.json({ message: 'Missing ID' }, { status: 400 });
    }

    const todo = await updateTodo(id, body);

    return NextResponse.json(todo);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Update failed' }, { status: 500 });
  }
}

// DELETE
export async function DELETE( req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await deleteTodo((await params).id);
    
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ message: 'Delete failed' }, { status: 500 });
  }
}