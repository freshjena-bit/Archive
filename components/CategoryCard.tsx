import Link from "next/link";

export default function CategoryCard({
  name,
}: {
  name: string;
}) {
  return (
    <Link
      href={`/${name.toLowerCase()}`}
      className="border rounded-xl p-5 bg-white hover:bg-gray-50"
    >
      📁 {name}
    </Link>
  );
}
