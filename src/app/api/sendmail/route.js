import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { sendBulkGoalMails } from "@/lib/mailer";

// Example: 20 users
const users = [
    { name: "Shitansu Kumar Gochhayat", email: "shitansu.gochhayat@bookingjini.co" },
    { name: "Sibasish Mishra", email: "sibasish@bookingjini.com" },
    // { name: "Perbindar Lakra", email: "parbinder.lakra@bookingjini.co" },
    // { name: "Ishika Mukherjee", email: "ishika.mukherjee1@bookingjini.co" },
    // { name: "Satya Behera", email: "satya.behera@bookingjini.com" },
    // { name: "Md. Shanawaz Arif", email: "mdshanawaz.arif@bookingjini.co" },
    // { name: "Simran Banarjee", email: "simran.banarjee@bookingjini.co" },
    // { name: "Ritika Jha", email: "ritika.jha@bookingjini.com" },
    // { name: "Namrata Swain", email: "namrata@bookingjini.com" },
    // { name: "Manoj Pandia", email: "manoj.pandia@bookingjini.com" },
    // { name: "Gourab Nandy", email: "gourab.nandy@bookingjini.com" },
    // { name: "Shiv Mahato", email: "shiv.mahato@bookingjini.co" },
    // { name: "Disha Padhi", email: "disha.padhi@bookingjini.co" },
    // { name: "Priyanka Munni", email: "onboarding@bookingjini.com" },
    // { name: "Anku Naik", email: "anku.naik@bookingjini.co" },
    // { name: "Suyashan Mukha", email: "suryashanmukha755@gmail.com" },
    // { name: "Reversions Team", email: "reservations@bookingjini.com" },
    // { name: "Saroj Patel", email: "saroj.patel@5elements.co.in" },
    // { name: "Biki Das", email: "biki.das@bookingjini.com" },

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
