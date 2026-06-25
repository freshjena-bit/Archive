import SearchBar from "@/components/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import FileCard from "@/components/FileCard";

const categories = [
  "WhatsApp",
  "Discord",
  "Telegram",
  "API",
  "Tools",
];

const trending =
  [
    {
      title:
      "Top Downloads"
    },
    {
      title:
      "Popular This Week"
    }
  ];

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto p-4">

      <h1 className="text-4xl font-bold">
        File Repository
      </h1>

      <p className="text-gray-500 mt-2 mb-6">
        Browse public source code
      </p>

      <SearchBar />

      <div className="grid md:grid-cols-5 gap-3 mt-6">
        {categories.map((item) => (
          <CategoryCard
            key={item}
            name={item}
          />
        ))}
      </div>

	<div className="mt-10">

	  <h2 className="text-2xl font-bold mb-4">
	    Trending
	  </h2>
	
	  <div className="grid md:grid-cols-2 gap-4">
	
	    {trending.map((item)=>(
	      <div
	        key={item.title}
	        className="border rounded-xl p-5 bg-white"
	      >
	        {item.title}
	      </div>
	    ))}
	
	  </div>
	
	</div>

      <div className="space-y-4 mt-8">

        <FileCard
		  id="bot whatsapp md"
          title="Bot WhatsApp MD"
          size="2.3 MB"
          category="WhatsApp"
        />

        <FileCard
		  id="telegram ai bot"
          title="Telegram AI Bot"
          size="1.1 MB"
          category="Telegram"
        />

      </div>

    </main>
  );
}
