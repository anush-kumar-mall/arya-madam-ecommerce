import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET all remedies or filter by category
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const where: any = {
      category: {
        in: [
          'wealth',
          'health',
          'relationship',
          'protection',
          'self-confidence',
          'education',
          'crown-chakra',
          'third-eye-chakra',
          'throat-chakra',
          'heart-chakra',
          'solar-plexus-chakra',
          'sacral-chakra',
          'root-chakra'
        ]
      }
    };

    // If specific category requested, filter by that
    if (category) {
      where.category = category.toLowerCase();
    }

    const remedies = await prisma.product.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(remedies);
  } catch (error) {
    console.error("Error fetching remedies:", error);
    return NextResponse.json(
      { error: "Failed to fetch remedies" },
      { status: 500 }
    );
  }
}

// POST - Create new remedy
export async function POST(req: NextRequest) {
  try {
    // Get session
    const session = await getServerSession(authOptions);

    console.log("🔐 Session:", session);

    // Check if user is logged in and is admin
    if (!session) {
      console.error("❌ No session found");
      return NextResponse.json({ error: "Please login to continue" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      console.error("❌ User is not admin:", session.user.role);
      return NextResponse.json({ error: "Only admins can create remedies" }, { status: 403 });
    }

    const body = await req.json();
    console.log("📦 Request body:", body);

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

    // Validate required fields
    if (!title || !description || !category || !price) {
      return NextResponse.json(
        { error: "Missing required fields: title, description, category, price" },
        { status: 400 }
      );
    }

    // Generate unique SKU
    const sku = `REM-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    console.log("✅ Creating remedy with SKU:", sku);

    const remedy = await prisma.product.create({
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
        sku,
        colour: [],
        insideBox: [],
        status: "ACTIVE",
        rating: 0,
        reviews: 0,
      },
    });

    console.log("✅ Remedy created successfully:", remedy.id);

    return NextResponse.json({ id: remedy.id, remedy }, { status: 201 });
  } catch (error: any) {
    console.error("❌ Error creating remedy:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create remedy" },
      { status: 500 }
    );
  }
}