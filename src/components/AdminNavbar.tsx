import Link from "next/link";
import logo from "@/assets/logo.png";
import Image from "next/image";
import UserMenuButton from "./Navbar/UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/options";

export default async function AdminNavbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-base-100">
      <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <Image
              src={logo}
              height={55}
              width={55}
              alt="Bear Essentials Logo"
            />
            The Bear Essentials Market
          </Link>
        </div>
        <div className="flex-none gap-2">
          <ul className="menu menu-vertical px-1 lg:menu-horizontal">
            <li>
              <Link href="/admin">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/products">Products</Link>
            </li>
            <li>
              <Link href="/admin/customers">Customers</Link>
            </li>
            <li>
              <Link href="/admin/orders">Sales</Link>
            </li>
            <li>
              <Link href="/add-product">Add Product</Link>
            </li>
          </ul>
          <UserMenuButton session={session} />
        </div>
      </div>
    </div>
  );
}
