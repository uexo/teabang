import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ShoppingCart, Share2, Heart } from "lucide-react";

const products = [
  {
    id: "1",
    name: { zh: "西湖龙井", en: "West Lake Longjing" },
    slug: "west-lake-longjing",
    price: 288,
    originalPrice: 368,
    images: [
      "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=800&q=80",
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=80",
    ],
    category: "green-tea",
    description: {
      zh: "西湖龙井是中国十大名茶之一，产于浙江省杭州市西湖龙井村周围群山。",
      en: "West Lake Longjing is one of China's top ten famous teas, produced in the mountains around West Lake Longjing Village in Hangzhou, Zhejiang Province."
    },
    details: {
      origin: { zh: "浙江杭州", en: "Hangzhou, Zhejiang" },
      harvestYear: 2024,
      weight: 100,
      caffeine: "Medium",
    },
    inStock: true,
    rating: 4.8,
    reviews: 128,
  },
  {
    id: "2",
    name: { zh: "武夷大红袍", en: "Da Hong Pao" },
    slug: "da-hong-pao",
    price: 588,
    originalPrice: 688,
    images: [
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&q=80",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80",
    ],
    category: "oolong-tea",
    description: {
      zh: "大红袍产于福建武夷山，是乌龙茶中的极品，有\"茶中之王\"的美誉。",
      en: "Da Hong Pao, produced in Wuyi Mountain, Fujian, is the finest oolong tea, known as the 'King of Tea'."
    },
    details: {
      origin: { zh: "福建武夷山", en: "Wuyi Mountain, Fujian" },
      harvestYear: 2023,
      weight: 50,
      caffeine: "Medium",
    },
    inStock: true,
    rating: 4.9,
    reviews: 256,
  },
];

export default async function ProductPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const t = await getTranslations();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const productName = product.name[locale as keyof typeof product.name] || product.name.en;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={product.images[0]}
              alt={productName}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 border-tea-600">
                <Image src={img} alt={`${productName} ${idx + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{product.category}</Badge>
              {product.originalPrice && <Badge variant="destructive">Sale</Badge>}
            </div>
            <h1 className="text-3xl font-bold">{productName}</h1>
            
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-semibold">{product.rating}</span>
                <span className="ml-1 text-muted-foreground">({product.reviews} {t("products.reviews")})</span>
              </div>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-bold text-tea-700">¥{product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">¥{product.originalPrice}</span>
            )}
          </div>

          <p className="text-muted-foreground">
            {product.description[locale as keyof typeof product.description] || product.description.en}
          </p>

          <div className="grid grid-cols-2 gap-4 py-4 border-y">
            <div>
              <span className="text-muted-foreground">{t("products.origin")}</span>
              <p className="font-medium">{product.details.origin[locale as keyof typeof product.details.origin] || product.details.origin.en}</p>
            </div>
            <div>
              <span className="text-muted-foreground">{t("products.harvest")}</span>
              <p className="font-medium">{product.details.harvestYear}</p>
            </div>
            <div>
              <span className="text-muted-foreground">{t("products.weight")}</span>
              <p className="font-medium">{product.details.weight}g</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              size="lg" 
              className="flex-1 bg-tea-600 hover:bg-tea-700"
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.inStock ? t("products.addToCart") : t("products.outOfStock")}
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <p className="text-muted-foreground">
            {product.description[locale as keyof typeof product.description] || product.description.en}
          </p>
        </TabsContent>
        <TabsContent value="details" className="mt-6">
          <dl className="grid grid-cols-2 gap-4">
            <dt className="text-muted-foreground">Origin</dt>
            <dd className="font-medium">{product.details.origin[locale as keyof typeof product.details.origin] || product.details.origin.en}</dd>
            <dt className="text-muted-foreground">Harvest Year</dt>
            <dd className="font-medium">{product.details.harvestYear}</dd>
            <dt className="text-muted-foreground">Weight</dt>
            <dd className="font-medium">{product.details.weight}g</dd>
            <dt className="text-muted-foreground">Caffeine Level</dt>
            <dd className="font-medium">{product.details.caffeine}</dd>
          </dl>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <p className="text-muted-foreground">Reviews coming soon...</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
