import Link from "next/link";

export default function FileCard({
  id,
  title,
  size,
  category,
}: {
  id: string;
  title: string;
  size: string;
  category: string;
}) {
  return (
    <Link href={`/file/${id}`}>
      <div className="bg-white border rounded-xl p-5 hover:bg-gray-50">

        <h3 className="font-bold text-lg">
          {title}
        </h3>

        <div className="flex justify-between mt-3">

          <span>
            {size}
          </span>

          <span className="bg-gray-100 px-3 py-1 rounded-full">
            {category}
          </span>
         
	  <span className="text-blue-500">
	     Preview →
	 </span>

        </div>

      </div>
    </Link>
  );
}
