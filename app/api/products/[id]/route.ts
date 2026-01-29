// app/api/products/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ================== GET - Fetch Single Product ==================
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    console.log("📥 GET /api/products/:id called");
    console.log("Product ID:", id);

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    console.log("✅ Product found:", product.title);
    return NextResponse.json(product, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error fetching product:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// ================== PUT - Update Product ==================
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    console.log("📥 PUT /api/products/:id called");
    console.log("Product ID:", id);
    console.log("Update data:", body);

    const product = await prisma.product.update({
      where: { id },
      data: {
        title: body.title,
        details: body.details || null,
        description: body.description,
        price: body.price,
        oldPrice: body.oldPrice || null,
        exclusive: body.exclusive || null,
        stock: body.stock,
        images: body.images || [],
        video: body.video || null,
        colour: body.colour || [],
        insideBox: body.insideBox || [],
        badge: body.badge || null,
        category: body.category,
        stone: body.stone || null,
        status: body.status || "ACTIVE",
      },
    });

    console.log("✅ Product updated:", product.id);
    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error updating product:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

// ================== DELETE - Delete Product ==================
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    console.log("📥 DELETE /api/products/:id called");
    console.log("Product ID:", id);

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Delete the product
    await prisma.product.delete({
      where: { id },
    });

    console.log("✅ Product deleted successfully");
    return NextResponse.json(
      { success: true, message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error deleting product:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete product" },
      { status: 500 }
    );
  }
}
