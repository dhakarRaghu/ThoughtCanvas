import { db } from '@/lib/db';
import { $notes } from '@/lib/db/schema';
import { fetchImageUrl } from '@/lib/unsplash';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req : Request) {
     const { userId } = await auth();
    if (!userId) {
        return new NextResponse('Not authenticated', { status: 401 });
    }
    const body = await req.json();
    const { name } = body;

    const url = await fetchImageUrl("name");
    console.log("url " , url)
    if(!url) {
        return new NextResponse('Failed to fetch image', { status: 500 });
    }
    // create a new note book
    const note_ids = await db.insert($notes).values({
        name,
        userId,
        imageUrl: url,
    })
    .returning({
        insertedId: $notes.id,    // return the id of the inserted note
    })
    // console.log("note_id", note_ids);
    return NextResponse.json({ 
        note_id : note_ids[0].insertedId
     });
}