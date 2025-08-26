import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      id: 1,
      title: "Wireless Headphones",
      description: "High quality wireless sound.",
      image: "/images/product_img.avif",
      price: "₹6,4999",
      rating: 4.5,
      reviewsCount: 120,
    },
    {
      id: 2,
      title: "Smart Watch",
      description: "Track your fitness and notifications.",
      image: "/images/out_stock.avif",
      price: "₹4,299",
      rating: 4.0,
      reviewsCount: 85,
    },
  ]);
}
