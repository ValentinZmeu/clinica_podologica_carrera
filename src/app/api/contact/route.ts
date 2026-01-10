import { NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  createdAt: string;
}

const MESSAGES_FILE = path.join(process.cwd(), 'data', 'contact-messages.json');

async function getMessages(): Promise<ContactMessage[]> {
  try {
    const data = await fs.readFile(MESSAGES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveMessages(messages: ContactMessage[]): Promise<void> {
  const dir = path.dirname(MESSAGES_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const messages = await getMessages();

    const newMessage: ContactMessage = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: data.message,
      createdAt: new Date().toISOString(),
    };

    messages.push(newMessage);
    await saveMessages(messages);

    // Here you could also send an email notification
    // await sendEmailNotification(data);

    return NextResponse.json(
      { success: true, message: 'Mensaje enviado correctamente' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Datos inválidos', errors: error.errors },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
