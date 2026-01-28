// app/api/products/[id]/route.ts - COMPLETE FILE

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ================== GET - Fetch Single Product ==================
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    console.log("📥 GET /api/products/[id] called");
    console.log("Product ID:", id);

    // Fetch single product from database
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) {
      console.log("❌ Product not found");
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Only return if ACTIVE (for shop pages)
    // Admin pages should get product regardless of status
    const isAdminRequest = req.headers.get('referer')?.includes('/admin') || 
                           req.headers.get('referer')?.includes('/manage');

    if (!isAdminRequest && product.status !== "ACTIVE") {
      console.log("❌ Product not active");
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    console.log("✅ Product found:", product.id);

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
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    console.log("📥 PUT /api/products/[id] called");
    console.log("Product ID:", id);
    console.log("Update data:", body);

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      console.log("❌ Product not found");
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Ensure stock is a number
    const stock = typeof body.stock === 'number' ? body.stock : existingProduct.stock;

    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title: body.title || existingProduct.title,
        details: body.details !== undefined ? body.details : existingProduct.details,
        description: body.description || existingProduct.description,
        price: body.price !== undefined ? body.price : existingProduct.price,
        oldPrice: body.oldPrice !== undefined ? body.oldPrice : existingProduct.oldPrice,
        exclusive: body.exclusive !== undefined ? body.exclusive : existingProduct.exclusive,
        stock: stock,
        images: body.images !== undefined ? body.images : existingProduct.images,
        video: body.video !== undefined ? body.video : existingProduct.video,
        colour: body.colour !== undefined ? body.colour : existingProduct.colour,
        insideBox: body.insideBox !== undefined ? body.insideBox : existingProduct.insideBox,
        rating: body.rating !== undefined ? body.rating : existingProduct.rating,
        reviews: body.reviews !== undefined ? body.reviews : existingProduct.reviews,
        badge: body.badge !== undefined ? body.badge : existingProduct.badge,
        category: body.category || existingProduct.category,
        stone: body.stone !== undefined ? body.stone : existingProduct.stone,
        status: body.status || existingProduct.status,
      },
    });

    console.log("✅ Product updated:", updatedProduct.id);

    return NextResponse.json(
      { 
        success: true, 
        product: updatedProduct,
        id: updatedProduct.id,
        productId: updatedProduct.id 
      },
      { status: 200 }
    );
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
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    console.log("📥 DELETE /api/products/[id] called");
    console.log("Product ID:", id);

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      console.log("❌ Product not found");
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Delete product
    await prisma.product.delete({
      where: { id },
    });

    console.log("✅ Product deleted:", id);

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