// this is example of the route for the products api
// it will be available at /api/products

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const products = await fetch(process.env.API_URL + '/data.json').then(res =>
    res.json()
  );

  return NextResponse.json(products);
}
