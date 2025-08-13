import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return <p className="text-center mt-10">لظفا وارد شوید</p>;
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">پروفایل کاربر</h1>
      <p>
        <strong>نام : </strong>
        {user.name}
      </p>
      <p>
        <strong>ایمیل : </strong>
        {user.email}
      </p>

      <button
        className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        خروج
      </button>
    </div>
  );
};
