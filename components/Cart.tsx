import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { formatPHP, discounted } from "../utils";

export const Cart = ({ cart, total, updateQty, removeItem, clearCart }) => (
  <Card className="md:col-span-2">
    <CardHeader>
      <CardTitle>Your Cart</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {cart.length === 0 ? (
        <p className="text-sm text-slate-600">No items yet.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.book.id} className="flex items-center justify-between border-b pb-2">
              <div>
                <div className="font-medium">{item.book.title}</div>
                <div className="text-xs text-slate-500">{item.book.author}</div>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={item.qty}
                  min={1}
                  className="w-16 text-center"
                  onChange={(e) => updateQty(item.book.id, Number(e.target.value))}
                />
                <span>{formatPHP(discounted(item.book) * item.qty)}</span>
                <Button variant="ghost" size="icon" onClick={() => removeItem(item.book.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <div className="flex justify-between font-semibold pt-3">
            <span>Total</span>
            <span>{formatPHP(total)}</span>
          </div>
          <Button variant="outline" onClick={clearCart} className="w-full mt-2">
            Clear Cart
          </Button>
        </>
      )}
    </CardContent>
  </Card>
);
