"use client";

import Image from "next/image";
import clsx from "clsx";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.tag?.toLowerCase().includes("out");

  // Badge color logic
  const badgeClass = clsx(
    "rounded-full px-3 py-1 text-xs font-semibold shadow/10",
    {
      "bg-rose-600 text-white": product.tag?.toLowerCase().includes("sale"),
      "bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900": product.tag
        ?.toLowerCase()
        .includes("new"),
      "bg-slate-700 text-white": isOutOfStock,
    }
  );

  // Button style logic
  const buttonClass = clsx(
    "mt-5 w-full smooth rounded-2xl px-4 py-3 font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-offset-2",
    {
      "bg-gray-400 text-white cursor-not-allowed focus:ring-slate-400": isOutOfStock,
      "bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 focus:ring-slate-400 dark:focus:ring-slate-700": !isOutOfStock,
    }
  );

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(Number(product.price));

  return (
    <div className="cursor-pointer group smooth relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur shadow-sm hover:-translate-y-0.5 hover:shadow-lg focus-within:shadow-lg">
      {product.tag && (
        <div className="absolute left-3 top-3 z-10 flex gap-2">
          <span className={badgeClass}>{product.tag}</span>
        </div>
      )}

      <figure>
        <Image
          src={product.image}
          alt={product.title || "Product Image"}
          width={400}
          height={280}
          className="w-full h-[256px] object-cover"
          priority
        />

        <figcaption className="p-5 md:p-4">
          {/* Title */}
          <h2 className="text-xl font-bold text-center text-gray-900 dark:text-gray-100">
            {product.title}
          </h2>

          {/* Rating + Reviews */}
          <div className="mt-3 flex items-center justify-center gap-3">
            <div
              className="flex items-center text-yellow-500 dark:text-yellow-300"
              aria-label={`Rating ${product.rating} out of 5 stars`}
            >
              {[...Array(5)].map((_, i) => {
                const fullStar = i < Math.floor(product.rating);
                const halfStar =
                  i === Math.floor(product.rating) && product.rating % 1 !== 0;
                const gradientId = `halfStar-${product.title.replace(
                  /\s+/g,
                  ""
                )}-${i}`;

                return (
                  <svg
                    key={i}
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {fullStar ? (
                      <path
                        d="M12 .587l3.668 7.431L24 9.748l-6 5.853L19.335 24 12 19.897 4.665 24 6 15.601 0 9.748l8.332-1.73z"
                        fill="currentColor"
                      />
                    ) : halfStar ? (
                      <>
                        <defs>
                          <linearGradient
                            id={gradientId}
                            x1="0"
                            x2="1"
                            y1="0"
                            y2="0"
                          >
                            <stop offset="50%" stopColor="currentColor" />
                            <stop offset="50%" stopColor="lightgray" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M12 .587l3.668 7.431L24 9.748l-6 5.853L19.335 24 12 19.897 4.665 24 6 15.601 0 9.748l8.332-1.73z"
                          fill={`url(#${gradientId})`}
                        />
                      </>
                    ) : (
                      <path
                        d="M12 .587l3.668 7.431L24 9.748l-6 5.853L19.335 24 12 19.897 4.665 24 6 15.601 0 9.748l8.332-1.73z"
                        fill="lightgray"
                      />
                    )}
                  </svg>
                );
              })}
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              {product.rating} ({product.reviewsCount.toLocaleString()})
            </p>
          </div>

          {/* Description */}
          <p className="mt-3 text-center text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="text-2xl font-bold tracking-tight">
              {formattedPrice}
            </span>
            <span className="text-sm line-through text-slate-400">₹8,499</span>
          </div>

          {/* CTA Button */}
          <button type="button" disabled={isOutOfStock} className={buttonClass}>
            {isOutOfStock ? "Out of Stock" : "View More"}
          </button>
        </figcaption>
      </figure>
    </div>
  );
}
