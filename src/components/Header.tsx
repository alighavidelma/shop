import { Link } from "react-router-dom";

export default () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">My Shop</Link>
      </h1>
      <nav className="flex gap-4">
        <Link to="/">خانه</Link>
        <Link to="/products">محصولات</Link>
        <Link to="/cart">سبد خرید</Link>
        <Link to="/login">ورود</Link>
        <Link to="/register">ثبت نام</Link>
      </nav>
    </header>
  );
};
