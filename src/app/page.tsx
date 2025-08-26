import ProductCard from "@/components/ProductCard";
import ThemeToggle from "@/components/theme-toggle";
import type { Product } from "@/types/product";

export default async function Home() {
  // Base URL env se aayega
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // ✅ Always absolute URL banayenge
  const res = await fetch(`${baseUrl}/api/products`, {
    cache: "no-store",
  });

  const products: Product[] = await res.json();

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="flex items-center justify-between gap-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Product Card Test
          </h1>
          <ThemeToggle />
        </header>

        {/* Product Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {products.map((product: Product, i: number) => (
            <div
              key={product.id}
              className={
                i === 0
                  ? "animate-slide-in-left"
                  : "animate-slide-in-right animate-delay-200"
              }
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
