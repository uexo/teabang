import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Filter } from "lucide-react";

const allProducts = [
  {
    id: "1",
    name: { zh: "西湖龙井", en: "West Lake Longjing" },
    slug: "west-lake-longjing",
    price: 288,
    originalPrice: 368,
    image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400&q=80",
    category: "green-tea",
    description: "Fresh and fragrant green tea from Hangzhou",
    inStock: true,
  },
  {
    id: "2",
    name: { zh: "武夷大红袍", en: "Da Hong Pao" },
    slug: "da-hong-pao",
    price: 588,
    originalPrice: 688,
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&q=80",
    category: "oolong-tea",
    description: "Famous rock tea from Wuyi Mountains",
    inStock: true,
  },
  {
    id: "3",
    name: { zh: "云南普洱", en: "Yunnan Pu-erh" },
    slug: "yunnan-puerh",
    price: 188,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7c1f?w=400&q=80",
    category: "puer-tea",
    description: "Aged fermented tea from Yunnan province",
    inStock: true,
  },
  {
    id: "4",
    name: { zh: "白毫银针", en: "Silver Needle" },
    slug: "silver-needle",
    price: 428,
    originalPrice: 498,
    image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400&q=80",
    category: "white-tea",
    description: "Delicate white tea with silver buds",
    inStock: true,
  },
  {
    id: "5",
    name: { zh: "安溪铁观音", en: "Tie Guan Yin" },
    slug: "tie-guan-yin",
    price: 238,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80",
    category: "oolong-tea",
    description: "Orchid aroma oolong from Anxi",
    inStock: true,
  },
  {
    id: "6",
    name: { zh: "祁门红茶", en: "Keemun Black Tea" },
    slug: "keemun-black",
    price: 168,
    originalPrice: 198,
    image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400&q=80",
    category: "black-tea",
    description: "Famous black tea with wine and fruit notes",
    inStock: true,
  },
  {
    id: "7",
    name: { zh: "茉莉花茶", en: "Jasmine Tea" },
    slug: "jasmine-tea",
    price: 128,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80",
    category: "floral-tea",
    description: "Green tea scented with jasmine flowers",
    inStock: true,
  },
  {
    id: "8",
    name: { zh: "碧螺春", en: "Biluochun" },
    slug: "biluochun",
    price: 358,
    originalPrice: 428,
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&q=80",
    category: "green-tea",
    description: "Spiral-shaped tea from Dongting Mountain",
    inStock: false,
  },
];

export default async function ProductsPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: { category?: string };
}) {
  const t = await getTranslations();
  const category = searchParams.category;

  const filteredProducts = category
    ? allProducts.filter((p) => p.category === category)
    : allProducts;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{t("products.title")}</h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} products
          </p>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="group overflow-hidden">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.image}
                alt={product.name[locale as keyof typeof product.name] || product.name.en}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {!product.inStock && (
                <Badge variant="secondary" className="absolute top-3 left-3">
                  {t("products.outOfStock")}
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
                <h3 className="font-semibold text-lg mb-1 hover:text-tea-600 transition-colors">
                  {product.name[locale as keyof typeof product.name] || product.name.en}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground mb-2">
                {product.description}
              </p>
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
              <Button 
                className="w-full bg-tea-600 hover:bg-tea-700" 
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {product.inStock ? t("products.addToCart") : t("products.outOfStock")}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
