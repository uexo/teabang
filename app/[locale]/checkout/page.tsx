"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/store/cart";

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const { items, getTotalPrice } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState("wechat");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // TODO: Implement checkout
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Order placed with ${paymentMethod}! This is a demo.`);
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Button className="bg-tea-600 hover:bg-tea-700">Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("shipping")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input required />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" required />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input type="tel" required />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input required />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input required />
                </div>
                <div className="space-y-2">
                  <Label>State</Label>
                  <Input required />
                </div>
                <div className="space-y-2">
                  <Label>ZIP</Label>
                  <Input required />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("payment")}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 border p-4 rounded-lg">
                  <RadioGroupItem value="wechat" id="wechat" />
                  <Label htmlFor="wechat">{t("wechat")}</Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-lg">
                  <RadioGroupItem value="alipay" id="alipay" />
                  <Label htmlFor="alipay">{t("alipay")}</Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-lg">
                  <RadioGroupItem value="stripe" id="stripe" />
                  <Label htmlFor="stripe">{t("stripe")}</Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-lg">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">{t("paypal")}</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t("orderSummary")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>¥{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <Separator />

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>¥{getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>Calculated</span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>¥{getTotalPrice().toFixed(2)}</span>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-tea-600 hover:bg-tea-700" 
                size="lg"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : t("placeOrder")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
