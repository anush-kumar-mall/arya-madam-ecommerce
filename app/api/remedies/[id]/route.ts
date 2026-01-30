import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET single remedy by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const remedy = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!remedy) {
      return NextResponse.json({ error: "Remedy not found" }, { status: 404 });
    }

    return NextResponse.json(remedy);
  } catch (error) {
    console.error("Error fetching remedy:", error);
    return NextResponse.json(
      { error: "Failed to fetch remedy" },
      { status: 500 }
    );
  }
}

// PUT - Update remedy
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    console.log("🔐 Update Session:", session);

    if (!session) {
      return NextResponse.json({ error: "Please login to continue" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Only admins can update remedies" }, { status: 403 });
    }

    const body = await req.json();
    const {
      title,
      description,
      ailment,
      ingredients,
      instructions,
      dosage,
      precautions,
      duration,
      category,
      images,
      video,
      price,
      oldPrice,
      stock,
    } = body;

    console.log("✅ Updating remedy:", params.id);

    const remedy = await prisma.product.update({
      where: { id: params.id },
      data: {
        title,
        description,
        details: JSON.stringify({
          ailment,
          ingredients,
          instructions,
          dosage,
          precautions,
          duration,
        }),
        price: price || 0,
        oldPrice: oldPrice || null,
        stock: stock || 0,
        images: images || [],
        video: video || null,
        category: category.toLowerCase(),
      },
    });

    console.log("✅ Remedy updated successfully");

    return NextResponse.json(remedy);
  } catch (error: any) {
    console.error("❌ Error updating remedy:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update remedy" },
      { status: 500 }
    );
  }
}

// DELETE remedy
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Please login to continue" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Only admins can delete remedies" }, { status: 403 });
    }

    console.log("🗑️ Deleting remedy:", params.id);

    await prisma.product.delete({
      where: { id: params.id },
    });

    console.log("✅ Remedy deleted successfully");

    return NextResponse.json({ message: "Remedy deleted successfully" });
  } catch (error: any) {
    console.error("❌ Error deleting remedy:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete remedy" },
      { status: 500 }
    );
  }
}