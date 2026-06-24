import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/products");
        const data = await res.json();

        setProducts(data);
        setFiltered(data);

        // extract categories dynamically
        const cats = [
          ...new Set(data.map((p) => p.category?.name).filter(Boolean)),
        ];
        setCategories(cats);

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // FILTER BY CATEGORY
  const filterByCategory = (cat) => {
    if (!cat) {
      setFiltered(products);
      return;
    }

    const result = products.filter((p) => p.category?.name === cat);

    setFiltered(result);
  };

  if (loading) {
    return <h3 className="text-center py-5">Loading...</h3>;
  }

  return (
    <div className="container py-3">
      {/* FILTER BAR */}
      <div className="text-center mb-4">
        <button
          className="btn btn-dark btn-sm m-1"
          onClick={() => filterByCategory(null)}
        >
          ALL
        </button>

        {categories.map((cat, index) => (
          <button
            key={index}
            className="btn btn-outline-dark btn-sm m-1"
            onClick={() => filterByCategory(cat)}
          >
            {cat?.toUpperCase()}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div className="row">
        {filtered.length === 0 ? (
          <h4 className="text-center">No products found</h4>
        ) : (
          filtered.map((product) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-3" key={product.id}>
              <div className="card h-100 text-center shadow-sm">
                <img
                  src={
                    product.image
                      ? `http://127.0.0.1:8000/uploads/products/${product.image}`
                      : "https://via.placeholder.com/200"
                  }
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body p-2">
                  <h6>{product.name}</h6>

                  <p className="small text-muted">
                    {product.description?.substring(0, 60)}...
                  </p>

                  <strong>DT {product.price}</strong>

                  <div className="text-muted small">
                    {product.category?.name}
                  </div>
                </div>

                <div className="card-footer bg-white">
                  <Link
                    to={`/product/${product.id}`}
                    className="btn btn-dark btn-sm m-1"
                  >
                    View
                  </Link>

                  <button
                    className="btn btn-outline-dark btn-sm m-1"
                    onClick={() => toast.success("Added to cart")}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
