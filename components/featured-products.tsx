"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

const featuredProducts = [
  {
    id: "1",
    name: { zh: "西湖龙井", en: "West Lake Longjing" },
    slug: "west-lake-longjing",
    price: 288,
    originalPrice: 368,
    image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400&q=80",
    category: "green-tea",
    badge: "Bestseller",
  },
  {
    id: "2",
    name: { zh: "武夷大红袍", en: "Da Hong Pao" },
    slug: "da-hong-pao",
    price: 588,
    originalPrice: 688,
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&q=80",
    category: "oolong-tea",
    badge: "Premium",
  },
  {
    id: "3",
    name: { zh: "云南普洱", en: "Yunnan Pu-erh" },
    slug: "yunnan-puerh",
    price: 188,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7c1f?w=400&q=80",
    category: "puer-tea",
    badge: null,
  },
  {
    id: "4",
    name: { zh: "白毫银针", en: "Silver Needle" },
    slug: "silver-needle",
    price: 428,
    originalPrice: 498,
    image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400&q=80",
    category: "white-tea",
    badge: "New",
  },
];

export function FeaturedProducts() {
  const t = useTranslations();

  return (
    <section className="container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">{t("products.title")}</h2>
        <Link href="/products" className="text-tea-600 hover:text-tea-700">
          {t("products.viewAll")} →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <Card key={product.id} className="group overflow-hidden">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.image}
                alt={product.name.en}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {product.badge && (
                <Badge className="absolute top-3 left-3 bg-tea-600">
                  {product.badge}
                </Badge>
              )}
              {product.originalPrice && (
                <Badge variant="destructive" className="absolute top-3 right-3">
                  Sale
                </Badge>
              )}
            </div>
            
            <CardContent className="p-4">
              <Link href={`/products/${product.slug}`}>
                <h3 className="font-semibold text-lg mb-2 hover:text-tea-600 transition-colors">
                  {product.name.en}
                </h3>
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-tea-700">
                  ¥{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ¥{product.originalPrice}
                  </span>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="p-4 pt-0">
              <Button className="w-full bg-tea-600 hover:bg-tea-700">
                <ShoppingCart className="mr-2 h-4 w-4" />
                {t("products.addToCart")}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
