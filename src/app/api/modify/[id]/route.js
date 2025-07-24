import { NextResponse } from 'next/server';
import connect from '@/dbConfig/dbconfig';
import Lookup from '@/models/lookupModels'; // ✅ your Mongoose model

export async function PUT(request, context) {

    try {
        await connect();

        const { params } = context;
        const { id } = await params; // ✅ Await before accessing `id`
        // console.log('Editing user with ID:', id);

        const user = await Lookup.findById(id);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const data = await request.json();

        const updatedUser = await Lookup.findByIdAndUpdate(id, data, { new: true });
        // console.log('Updated User:', updatedUser);

        return NextResponse.json({ user: updatedUser }, { status: 200 });
    } catch (error) {
        // console.error('Update Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
