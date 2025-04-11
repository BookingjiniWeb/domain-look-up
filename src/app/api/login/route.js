import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// 👥 Example user database (in-memory, just for demo)
const users = [
    { email: 'shitansu.gochhayat@bookingjini.co', password: 'shitansu@123bjini#', name: 'Shitansu' },
    { email: 'sagar.mohanty@bookingjini.co', password: 'sagar@123bjini#', name: 'Sagar' },
    { email: 'perbindar.lakra@bookingjini.co', password: 'perbindar@123bjini#', name: 'Perbindar' },
    // Add more users here
];

export async function POST(req) {
    const body = await req.json();
    const { email, password } = body;

    // 🔐 Authenticate against the user list
    const user = users.find(
        (u) => u.email === email && u.password === password
    );

    if (user) {
        // ✅ Store name in cookie
        cookies().set('userName', user.name, {
            httpOnly: false,
            maxAge: 24 * 60 * 60, // 15 minutes
        });

        return NextResponse.json({
            success: true,
            user: { name: user.name, email: user.email },
        });
    }

    // ❌ Invalid credentials
    return NextResponse.json({ success: false }, { status: 401 });
}
