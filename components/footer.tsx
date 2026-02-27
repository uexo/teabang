"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-tea-900 text-tea-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-tea-400" />
              <span className="text-xl font-bold text-white">Teabang</span>
            </div>
            <p className="text-sm text-tea-300">{t("aboutText")}</p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{t("links")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{t("contact")}</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@teabang.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+86 400-888-8888</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Hangzhou, China</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{t("social")}</h3>
            <div className="flex gap-4">
              <a href="#" className="text-tea-300 hover:text-white transition-colors">WeChat</a>
              <a href="#" className="text-tea-300 hover:text-white transition-colors">Weibo</a>
              <a href="#" className="text-tea-300 hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-tea-800" />

        <div className="text-center text-sm text-tea-400">
          <p>© 2024 Teabang. {t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
