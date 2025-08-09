import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export default () => {
  const [products, setProduct] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  const filterProduct = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLocaleLowerCase()) &&
      (category ? p.category === category : true)
  );
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">محصولات ما</h1>

      {/* فیلتر و جستجو */}

      <div className="flex gap-4 mb-6">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar value={category} onChange={setCategory} />
      </div>

      {/* لیست محصولات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filterProduct.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow">
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-40 object-cover"
            />
            <h2 className="font-bold mt-2">{p.title}</h2>
            <p>{p.price.toLocaleString()} تومان</p>
            <Link
              to={`/products/${p.id}`}
              className="text-blue-600 hover:underline block mt-2"
            >
              مشاهده جزییات
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
