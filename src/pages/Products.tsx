import { useEffect, useState } from "react";

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
  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">محصولات ما</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow">
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-40 object-cover"
            />
            <h2 className="font-bold mt-2">{p.title}</h2>
            <p>{p.price.toLocaleString()} تومان</p>
          </div>
        ))}
      </div>
    </div>
  );
};
