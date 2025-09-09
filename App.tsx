import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ShoppingCart, Filter, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Catalog } from "./components/Catalog";
import { Cart } from "./components/Cart";
import { CheckoutForm } from "./components/CheckoutForm";
import { formatPHP, discounted } from "./utils";

// Types
interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  discountedPrice: number;
  image: string;
  description: string;
}

interface CartItem {
  book: Book;
  qty: number;
}

export default function App() {
  const [catalog, setCatalog] = useState<Book[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filter, setFilter] = useState<"title" | "author" | "genre">("title");
  const [filterValue, setFilterValue] = useState("");

  // Fetch books from Google Apps Script
  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbwOg4Vt1so9FS9BcizBKfRmZgQG1ydz4fjo3VgtYigq68SGg4uOyJfinagZKpuLDdaohw/exec?action=getBooks")
      .then((res) => res.json())
      .then((data) => setCatalog(data))
      .catch((err) => console.error("Error loading catalog:", err));
  }, []);

  const addToCart = (book: Book) => {
    setCart((prev) => {
      const i = prev.findIndex((x) => x.book.id === book.id);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + 1 };
        return copy;
      }
      return [...prev, { book, qty: 1 }];
    });
  };

  const updateQty = (bookId: string, qty: number) => {
    setCart((prev) =>
      prev.map((x) => (x.book.id === bookId ? { ...x, qty: Math.max(1, qty) } : x))
    );
  };

  const removeItem = (bookId: string) => setCart((prev) => prev.filter((x) => x.book.id !== bookId));
  const clearCart = () => setCart([]);

  const total = useMemo(
    () => cart.reduce((sum, it) => sum + discounted(it.book) * it.qty, 0),
    [cart]
  );

  // Filtering logic
  const filteredCatalog = useMemo(() => {
    if (filter === "title" || !filterValue) return catalog;
    return catalog.filter((b) =>
      b[filter].toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [catalog, filter, filterValue]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b shadow-sm z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-slate-600" />
            <span className="font-semibold">Feast Books — Preorder</span>
          </div>
          <Button variant="outline" className="gap-2">
            <ShoppingCart className="h-4 w-4" /> {cart.reduce((n, x) => n + x.qty, 0)}
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold tracking-tight"
        >
          Pre-Order Your Next Read
        </motion.h1>
        <p className="text-slate-600 mt-2">
          Pick your books, confirm, then provide contact details only when ready.
        </p>
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-6">
          <Label className="flex items-center gap-1">
            <input
              type="radio"
              name="filter"
              value="title"
              checked={filter === "title"}
              onChange={() => setFilter("title")}
            />{" "}
            Title
          </Label>
          <Label className="flex items-center gap-1">
            <input
              type="radio"
              name="filter"
              value="author"
              checked={filter === "author"}
              onChange={() => setFilter("author")}
            />{" "}
            Author
          </Label>
          <Label className="flex items-center gap-1">
            <input
              type="radio"
              name="filter"
              value="genre"
              checked={filter === "genre"}
              onChange={() => setFilter("genre")}
            />{" "}
            Genre
          </Label>

          <select
            disabled={filter === "title"}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="border rounded p-1 text-sm"
          >
            <option value="">All</option>
            {[...new Set(catalog.map((b) => b[filter]))].map((val) => (
              <option key={val}>{val}</option>
            ))}
          </select>
        </div>
      </section>

      {/* Catalog */}
      <Catalog books={filteredCatalog} onAdd={addToCart} />

      {/* Cart + Checkout */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
        <Cart cart={cart} total={total} updateQty={updateQty} removeItem={removeItem} clearCart={clearCart} />
        {cart.length > 0 && <CheckoutForm cart={cart} total={total} />}
      </section>
    </div>
  );
}
