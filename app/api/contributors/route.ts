import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://contributors-spotlight.vercel.app/api/contributors', {
      headers: {
        'Accept': 'application/json',
      },
      next: {
        revalidate: 3600 // Cache for 1 hour
      }
    });

    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error fetching contributors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contributors' },
      { status: 500 }
    );
  }
} 