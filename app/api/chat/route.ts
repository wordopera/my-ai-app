import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Use the service role key instead of the anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase environment variables')
}

// Initialize Supabase client with the service role key
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    console.log('Received message:', message);

    const command = `python scripts/generate_response.py "${message}"`;
    console.log('Executing command:', command);

    const { stdout, stderr } = await execAsync(command);
    
    if (stderr) {
      console.error('Python script error:', stderr);
      throw new Error(stderr);
    }

    const aiResponse = stdout.trim();
    console.log('AI response:', aiResponse);

    // Store the message and response in Supabase
    const { data, error } = await supabase
      .from('messages')
      .insert({ content: message, ai_response: aiResponse })

    if (error) {
      console.error('Error inserting into Supabase:', error);
      // Note: We're not throwing here to still return the AI response to the user
    }

    return NextResponse.json({ aiResponse });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'An error occurred while processing your request' }, { status: 500 });
  }
}