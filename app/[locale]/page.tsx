import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/hero";
import { Categories } from "@/components/categories";
import { FeaturedProducts } from "@/components/featured-products";

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations("metadata");

  return (
    <div className="flex flex-col gap-16 pb-16">
      <Hero />
      <Categories />
      <FeaturedProducts />
      
      <section id="about" className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-muted-foreground leading-relaxed">
            Teabang was founded with a passion for sharing the rich traditions of tea culture with the world. 
            We source our teas directly from family-owned farms across China, ensuring the highest quality 
            and supporting local communities. Each cup tells a story of centuries-old craftsmanship and 
            the unique terroir of its origin.
          </p>
        </div>
      </section>
    </div>
  );
}
