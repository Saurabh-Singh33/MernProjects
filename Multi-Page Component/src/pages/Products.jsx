import ProductCart from "../components/ProductCart";

function Products() {

  const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mobile", price: 20000 },
    { id: 3, name: "Headphones", price: 3000 }
  ];

  return (
    <div>

      <h2>Products</h2>

      {products.map(product => (
        <ProductCart key={product.id} product={product} />
      ))}

    </div>
  );
}

export default Products;