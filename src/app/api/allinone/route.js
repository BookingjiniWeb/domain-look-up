import { NextResponse } from 'next/server';
import connect from '@/dbConfig/dbconfig';
import lookupModels from '@/models/lookupModels';
import sslChecker from 'ssl-checker';

// ✅ Timeout wrapper for SSL checker (default: 5 seconds)
const withTimeout = (promise, ms = 2000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms)),
  ]);
};

export async function GET() {
  try {
    await connect();

    const domains = await lookupModels.find();

    const updatedData = await Promise.all(
      domains.map(async (item) => {
        try {
          const ssl = await withTimeout(
            sslChecker(item.url, { method: 'GET', port: 443 }),
            2000 // ⏱️ Adjust timeout as needed
          );

          return {
            ...item._doc,
            sslExpiry: ssl.validTo,
            daysRemaining: ssl.daysRemaining,
          };
        } catch (err) {
          // ⛔ Timeout or failed SSL check
          return {
            ...item._doc,
            sslExpiry: 'Error',
            daysRemaining: 'N/A',
          };
        }
      })
    );

    return NextResponse.json({ data: updatedData });
  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
