import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // ✅ Use existing prisma instance

// GET - Fetch all remedies with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const maxPrice = searchParams.get('maxPrice');

    const where: any = {
      status: 'ACTIVE',
    };

    if (category && category !== 'All') {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { ailment: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (maxPrice) {
      where.price = { lte: parseInt(maxPrice) };
    }

    const remedies = await prisma.remedy.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(remedies);
  } catch (error) {
    console.error('Error fetching remedies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch remedies' },
      { status: 500 }
    );
  }
}

// POST - Create new remedy
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const remedy = await prisma.remedy.create({
      data: {
        title: body.title,
        description: body.description,
        ailment: body.ailment,
        ingredients: body.ingredients || [],
        instructions: body.instructions || [],
        dosage: body.dosage,
        precautions: body.precautions || [],
        duration: body.duration,
        category: body.category,
        price: body.price,
        oldPrice: body.oldPrice,
        stock: body.stock,
        images: body.images || [],
        video: body.video,
        rating: 0,
        reviews: 0,
        status: 'ACTIVE',
      },
    });

    return NextResponse.json(remedy, { status: 201 });
  } catch (error) {
    console.error('Error creating remedy:', error);
    return NextResponse.json(
      { error: 'Failed to create remedy' },
      { status: 500 }
    );
  }
}