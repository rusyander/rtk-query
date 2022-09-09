import react, { useState, useEffect } from "react";
import {
  useGetGoodsQuery,
  useAddProductMutation,
  useDeleteProductsMutation,
} from "./store";

function App() {
  // start server ----- json-server --watch db.json
  const [count, setCount] = useState("");
  const [newProduct, setNewProduct] = useState("");
  const [id, setId] = useState("");
  const { data = [], isLoading }: any = useGetGoodsQuery(count);
  const [addProduct, { isLoading: prodLoading, isError }] =
    useAddProductMutation();
  const [
    deleteProduct,
    { isLoading: delLoading, isError: delError, isSuccess: deleteSusses },
  ] = useDeleteProductsMutation();

  if (isLoading) return <div>loading...</div>;

  const addProducts = async (e: any) => {
    e.preventDefault();
    if (newProduct) {
      await addProduct({ name: newProduct }).unwrap();
      setNewProduct("");
    }
  };

  const deleteProducts = async (id: any) => {
    setId(id);
    await deleteProduct(id).unwrap();
  };
  return (
    <div className="App">
      <div>
        <select
          name=""
          id=""
          value={count}
          onChange={(e: any) => setCount(e.target.value)}
        >
          <option value="">all</option>
          <option value="1">1</option>
          <option value="3">3</option>
          <option value="5">5</option>
        </select>
      </div>
      {data.map((item: any) => (
        <div key={item.id} style={{ display: "flex" }}>
          <h2>{item.name}</h2>
          <h2>|---|</h2>
          <button onClick={() => deleteProducts(item.id)}>
            Delete Products
          </button>
          {deleteSusses && id == item.id && <h2>delete success</h2>}
        </div>
      ))}

      <input
        type="text"
        value={newProduct}
        onChange={(e: any) => setNewProduct(e.target.value)}
      />
      <button onClick={addProducts}>AddPost</button>
    </div>
  );
}

export default App;
