import { useGetProductQuery } from "./homeSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, getProduct] = useState([]);
  const { data, isSuccess, isLoading } = useGetProductQuery();

  //   const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      getProduct(data);
    }
  }, [data, isSuccess]);

  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      {isSuccess &&
        products.map((product) => {
          return (
            <div className="product" key={product.id}>
              <p>
                <Link to={`/product/${product.id}`}>{product.productName}</Link>
              </p>
            </div>
          );
        })}
    </div>
  );
}

//   const handleDelete = async (event, id, userEmail) => {
//     event.preventDefault();
//     try {
//       if (email !== userEmail) {
//         const response = await deleteUser({ id });
//         getUser((users) => users.filter((user) => user.id !== id));
//       } else {
//         return alert("cannot delete logged in user");
//       }
//     } catch (error) {
//       console.log("Delete error");
//     }
//   };

//   return (
//     <p key={product.id}>
//       {product.productName}{" "}
//       <button
//         onClick={(event) => handleDelete(event, user.id, user.email)}
//         className="btn btn-danger"
//       >
//         Delete
//       </button>
//       <button
//         onClick={() => navigate(`/update/${user.id}`)}
//         className="btn btn-danger"
//       >
//         Update
//       </button>
//     </p>
//   );

// {products.map((product) => {
