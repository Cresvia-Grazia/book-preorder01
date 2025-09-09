export const formatPHP = (n: number) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(n);

export const discounted = (book) => book.discountedPrice || book.price;
