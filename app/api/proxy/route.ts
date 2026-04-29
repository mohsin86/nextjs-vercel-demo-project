// File: app/api/proxy/route.ts

import { NextResponse } from 'next/server';

// File: app/api/proxy/route.ts


export async function GET() {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/users',
      {
        cache: 'no-store', // optional during development
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'External API request failed' },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data from external API' },
      { status: 500 }
    );
  }
}