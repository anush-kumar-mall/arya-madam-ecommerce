import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // ✅ Use existing prisma instance

// GET - Fetch single remedy
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const remedy = await prisma.remedy.findUnique({
      where: { id: params.id },
    });

    if (!remedy) {
      return NextResponse.json(
        { error: 'Remedy not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(remedy);
  } catch (error) {
    console.error('Error fetching remedy:', error);
    return NextResponse.json(
      { error: 'Failed to fetch remedy' },
      { status: 500 }
    );
  }
}

// PUT - Update remedy
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const remedy = await prisma.remedy.update({
      where: { id: params.id },
      data: {
        title: body.title,
        description: body.description,
        ailment: body.ailment,
        ingredients: body.ingredients,
        instructions: body.instructions,
        dosage: body.dosage,
        precautions: body.precautions,
        duration: body.duration,
        category: body.category,
        price: body.price,
        oldPrice: body.oldPrice,
        stock: body.stock,
        images: body.images,
        video: body.video,
      },
    });

    return NextResponse.json(remedy);
  } catch (error) {
    console.error('Error updating remedy:', error);
    return NextResponse.json(
      { error: 'Failed to update remedy' },
      { status: 500 }
    );
  }
}

// DELETE - Delete remedy
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.remedy.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting remedy:', error);
    return NextResponse.json(
      { error: 'Failed to delete remedy' },
      { status: 500 }
    );
  }
}