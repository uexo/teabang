"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    key: "green",
    image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400&q=80",
    slug: "green-tea",
  },
  {
    key: "black",
    image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400&q=80",
    slug: "black-tea",
  },
  {
    key: "oolong",
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&q=80",
    slug: "oolong-tea",
  },
  {
    key: "white",
    image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400&q=80",
    slug: "white-tea",
  },
  {
    key: "puer",
    image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7c1f?w=400&q=80",
    slug: "puer-tea",
  },
  {
    key: "floral",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80",
    slug: "floral-tea",
  },
];

export function Categories() {
  const t = useTranslations("categories");

  return (
    <section id="categories" className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">{t("title")}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category) => (
          <Link
            key={category.key}
            href={`/products?category=${category.slug}`}
            className="group relative overflow-hidden rounded-lg aspect-square"
          >
            <Image
              src={category.image}
              alt={t(category.key)}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">{t(category.key)}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
