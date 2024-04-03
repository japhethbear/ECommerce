import { prisma } from "@/lib/db/prisma";
import ProductCard from "@/components/ProductCard";
import { Metadata } from "next";

interface SearchPageProps {
  searchParams: { query: string };
}

export function generateMetaData({
  searchParams: { query },
}: SearchPageProps): Metadata {
  return {
    title: `Search: "${query}" - The Bear Essentials Market`,
    description: `Search: "${query}" - The Bear Essentials Market`,
  };
}

export default async function searchPage({
  searchParams: { query },
}: SearchPageProps) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "desc" },
  });

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center text-center">
        <h1 className="text-7xl font-bold">No Results Found.</h1>
        <p className="text-2xl">
          We couldn't find any products that matched your search.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 text-7xl font-bold">Search Results</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
