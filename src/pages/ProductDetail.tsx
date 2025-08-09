import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export default () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`http://localhost:4000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  if (!product) return <div className="p-4">در حال بارگذاری ...</div>;
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <img
        src={product.image}
        alt={product.title}
        className="w-64 h-64 object-cover mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-600 mb-2">{product.category}</p>
      <p className="text-lg font-semibold mb-4">{product.price} تومان</p>
      <p className="mb-4">{product.description}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        افزودن به سبد خرید
      </button>
    </div>
  );
};
