import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Catalog = ({ books, onAdd }) => (
  <section className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {books.map((book) => (
      <Card key={book.id} className="hover:shadow-lg transition cursor-pointer">
        <CardHeader className="p-0">
          <img src={book.image} alt={book.title} className="w-full h-40 object-cover rounded-t" />
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-base">{book.title}</CardTitle>
          <p className="text-xs text-slate-500">{book.author}</p>
          <p className="text-sm text-slate-600 mt-2 line-clamp-3">{book.description}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="font-semibold">₱{book.discountedPrice}</span>
            <Button size="sm" onClick={() => onAdd(book)}>Add</Button>
          </div>
        </CardContent>
      </Card>
    ))}
  </section>
);
