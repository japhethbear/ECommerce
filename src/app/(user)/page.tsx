import Image from "next/image";
import { prisma } from "@/lib/db/prisma";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import PaginationBar from "@/components/PaginationBar";

interface HomeProps {
  searchParams: { page: string };
}

export default async function Home({
  searchParams: { page = "1" },
}: HomeProps) {
  const currentPage = parseInt(page);

  // Update this number if it goes to production //
  const pageSize = 3;

  const heroItemCount = 1;

  const totalItemCount = await prisma.product.count();

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });
  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-3 text-7xl font-bold">The Bear Essentials Market</h1>
      {currentPage === 1 && (
        <div className="hero rounded-xl bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <Image
              src={products[0].imageUrl}
              alt={products[0].name}
              width={400}
              height={800}
              className="w-full max-w-sm rounded-lg shadow-2xl"
              priority
            />
            <div>
              <h1 className="text-5xl font-bold">{products[0].name}</h1>
              <p className="py-6">{products[0].description}</p>
              <Link
                href={"/products/" + products[0].id}
                className="btn btn-primary"
              >
                Check it Out!
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(currentPage === 1 ? products.slice(1) : products).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}