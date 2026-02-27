import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@teabang.com" },
    update: {},
    create: {
      email: "admin@teabang.com",
      name: "Admin",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log("Created admin user:", admin.email);

  // Create test user
  const userPassword = await bcrypt.hash("user123", 10);
  const user = await prisma.user.upsert({
    where: { email: "user@teabang.com" },
    update: {},
    create: {
      email: "user@teabang.com",
      name: "Test User",
      password: userPassword,
      role: "USER",
    },
  });
  console.log("Created test user:", user.email);

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "green-tea" },
      update: {},
      create: {
        name: JSON.stringify({ zh: "绿茶", en: "Green Tea" }),
        slug: "green-tea",
        description: JSON.stringify({
          zh: "清香淡雅的中国绿茶",
          en: "Fresh and delicate Chinese green teas",
        }),
        image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400&q=80",
      },
    }),
    prisma.category.upsert({
      where: { slug: "black-tea" },
      update: {},
      create: {
        name: JSON.stringify({ zh: "红茶", en: "Black Tea" }),
        slug: "black-tea",
        description: JSON.stringify({
          zh: "醇厚浓香的红茶",
          en: "Rich and aromatic black teas",
        }),
        image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400&q=80",
      },
    }),
    prisma.category.upsert({
      where: { slug: "oolong-tea" },
      update: {},
      create: {
        name: JSON.stringify({ zh: "乌龙茶", en: "Oolong Tea" }),
        slug: "oolong-tea",
        description: JSON.stringify({
          zh: "半发酵的乌龙茶",
          en: "Partially fermented oolong teas",
        }),
        image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&q=80",
      },
    }),
    prisma.category.upsert({
      where: { slug: "puer-tea" },
      update: {},
      create: {
        name: JSON.stringify({ zh: "普洱茶", en: "Pu-erh Tea" }),
        slug: "puer-tea",
        description: JSON.stringify({
          zh: "云南陈年普洱",
          en: "Aged Yunnan Pu-erh teas",
        }),
        image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7c1f?w=400&q=80",
      },
    }),
    prisma.category.upsert({
      where: { slug: "white-tea" },
      update: {},
      create: {
        name: JSON.stringify({ zh: "白茶", en: "White Tea" }),
        slug: "white-tea",
        description: JSON.stringify({
          zh: "清淡甘甜的白茶",
          en: "Light and sweet white teas",
        }),
        image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400&q=80",
      },
    }),
  ]);
  console.log("Created categories:", categories.length);

  // Create products
  const products = await Promise.all([
    prisma.product.upsert({
      where: { sku: "WLJ-001" },
      update: {},
      create: {
        name: JSON.stringify({ zh: "西湖龙井", en: "West Lake Longjing" }),
        slug: "west-lake-longjing",
        description: JSON.stringify({
          zh: "西湖龙井是中国十大名茶之一，产于浙江省杭州市西湖龙井村周围群山。",
          en: "West Lake Longjing is one of China's top ten famous teas, produced in the mountains around West Lake Longjing Village.",
        }),
        price: 288.0,
        comparePrice: 368.0,
        sku: "WLJ-001",
        stock: 50,
        images: [
          "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=800&q=80",
        ],
        weight: 100,
        origin: JSON.stringify({ zh: "浙江杭州", en: "Hangzhou, Zhejiang" }),
        harvestYear: 2024,
        caffeine: "medium",
        categoryId: categories[0].id,
        isFeatured: true,
      },
    }),
    prisma.product.upsert({
      where: { sku: "DHP-001" },
      update: {},
      create: {
        name: JSON.stringify({ zh: "武夷大红袍", en: "Da Hong Pao" }),
        slug: "da-hong-pao",
        description: JSON.stringify({
          zh: "大红袍产于福建武夷山，是乌龙茶中的极品。",
          en: "Da Hong Pao, produced in Wuyi Mountain, Fujian, is the finest oolong tea.",
        }),
        price: 588.0,
        comparePrice: 688.0,
        sku: "DHP-001",
        stock: 30,
        images: [
          "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&q=80",
        ],
        weight: 50,
        origin: JSON.stringify({ zh: "福建武夷山", en: "Wuyi Mountain, Fujian" }),
        harvestYear: 2023,
        caffeine: "medium",
        categoryId: categories[2].id,
        isFeatured: true,
      },
    }),
    prisma.product.upsert({
      where: { sku: "YNP-001" },
      update: {},
      create: {
        name: JSON.stringify({ zh: "云南普洱", en: "Yunnan Pu-erh" }),
        slug: "yunnan-puerh",
        description: JSON.stringify({
          zh: "云南陈年普洱茶，经过发酵工艺制成。",
          en: "Aged Yunnan Pu-erh tea, produced through fermentation process.",
        }),
        price: 188.0,
        sku: "YNP-001",
        stock: 100,
        images: [
          "https://images.unsplash.com/photo-1563911302283-d2bc129e7c1f?w=800&q=80",
        ],
        weight: 200,
        origin: JSON.stringify({ zh: "云南", en: "Yunnan" }),
        harvestYear: 2019,
        caffeine: "low",
        categoryId: categories[3].id,
        isFeatured: false,
      },
    }),
    prisma.product.upsert({
      where: { sku: "SN-001" },
      update: {},
      create: {
        name: JSON.stringify({ zh: "白毫银针", en: "Silver Needle" }),
        slug: "silver-needle",
        description: JSON.stringify({
          zh: "白毫银针是白茶中的极品，产于福建福鼎。",
          en: "Silver Needle is the finest white tea, produced in Fuding, Fujian.",
        }),
        price: 428.0,
        comparePrice: 498.0,
        sku: "SN-001",
        stock: 25,
        images: [
          "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=800&q=80",
        ],
        weight: 50,
        origin: JSON.stringify({ zh: "福建福鼎", en: "Fuding, Fujian" }),
        harvestYear: 2024,
        caffeine: "low",
        categoryId: categories[4].id,
        isFeatured: true,
      },
    }),
    prisma.product.upsert({
      where: { sku: "TGY-001" },
      update: {},
      create: {
        name: JSON.stringify({ zh: "安溪铁观音", en: "Tie Guan Yin" }),
        slug: "tie-guan-yin",
        description: JSON.stringify({
          zh: "铁观音是乌龙茶中的名品，产于福建安溪。",
          en: "Tie Guan Yin is a famous oolong tea from Anxi, Fujian.",
        }),
        price: 238.0,
        sku: "TGY-001",
        stock: 60,
        images: [
          "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80",
        ],
        weight: 150,
        origin: JSON.stringify({ zh: "福建安溪", en: "Anxi, Fujian" }),
        harvestYear: 2024,
        caffeine: "medium",
        categoryId: categories[2].id,
        isFeatured: false,
      },
    }),
  ]);
  console.log("Created products:", products.length);

  console.log("✅ Seed completed successfully!");
  console.log("\nTest Accounts:");
  console.log("  Admin: admin@teabang.com / admin123");
  console.log("  User:  user@teabang.com / user123");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
