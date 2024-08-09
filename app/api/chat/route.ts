import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

export async function POST(request: Request) {
  try {
    const { message, model } = await request.json();
    
    if (!message || !model) {
      return NextResponse.json({ error: 'Message and model are required' }, { status: 400 });
    }

    console.log('Received message:', message);
    console.log('Selected model:', model);

    const command = `python scripts/generate_response.py "${message}" "${model}"`;
    console.log('Executing command:', command);

    const { stdout, stderr } = await execAsync(command);
    
    if (stderr) {
      console.error('Python script error:', stderr);
      return NextResponse.json({ error: 'Python script execution failed', details: stderr }, { status: 500 });
    }

    const aiResponse = stdout.trim();
    console.log('AI response:', aiResponse);

    const { data, error } = await supabase
      .from('messages')
      .insert({ content: message, ai_response: aiResponse, model: model })

    if (error) {
      console.error('Error inserting into Supabase:', error);
      return NextResponse.json({ error: 'Failed to save message', details: error }, { status: 500 });
    }

    return NextResponse.json({ aiResponse });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'An error occurred while processing your request', details: error.message }, { status: 500 });
  }
}