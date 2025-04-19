import { NextResponse } from 'next/server';
import connect from '@/dbConfig/dbconfig';
import lookupModels from '@/models/lookupModels';
import sslChecker from 'ssl-checker';

export async function GET() {
  try {
    await connect();

    const domains = await lookupModels.find();

    const updatedData = await Promise.all(
      domains.map(async (item) => {
        try {
          const ssl = await sslChecker(item.url, { method: 'GET', port: 443 });
          return {
            ...item._doc, // unpack Mongoose object
            sslExpiry: ssl.validTo,
            daysRemaining: ssl.daysRemaining,
          };
        } catch (err) {
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
