import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { sendBulkGoalMails } from "@/lib/mailer";

// Example: 20 users
const users = [
    { name: "Shitansu Kumar Gochhayat", email: "shitansu.gochhayat@bookingjini.co" },
    // { name: "Perbindar Lakra", email: "parbinder.lakra@bookingjini.co" },
];

export async function GET() {
    try {
        const mails = users.map((user) => {
            const token = uuidv4();
            const link = `${process.env.NEXT_PUBLIC_BASE_URL}/accept/${token}?name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}`;
            return { email: user.email, link, name: user.name };
        });

        await sendBulkGoalMails(mails);

        return NextResponse.json({ message: "Mails sent successfully", count: mails.length });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
