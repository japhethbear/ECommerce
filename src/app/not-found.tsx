import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <p>Could not find requested page.</p>
      <p>
        Go back <Link href="/">to home page.</Link>
      </p>
    </div>
  );
}
