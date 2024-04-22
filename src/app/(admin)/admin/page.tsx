import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";

export default async function AdminDashboard() {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    take: 6,
  });

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
