import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import {toast,ToastContainer} from 'react-toastify';
import axios from "axios";
import {useNavigate} from 'react-router-dom';


export default function AdminDashboard() {

  const navigate=useNavigate(null);
  const [counts, setCounts] = useState({ users: 0, orders: 0, products: 0 });
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({src:"", name: "", price: "",category:"" });
  const [searchProduct, setSearchProduct] = useState("");
  const [productCount,setProductCount]=useState(null);
  const [userCount,setUserCount]=useState(null);
  const [orderctCount,setOrderCount]=useState(null);
  const serverPort=import.meta.env.VITE_SERVER_PORT;

  // Fetch sample data
  useEffect(() => {

    const UserData=JSON.parse(localStorage.getItem('userData'));
    if(!UserData || UserData?.isAdmin==undefined)
        navigate('/');

    const fetchData=async()=>{
        try{
            const res=await axios.get(serverPort+"api/product/display-product-data");
            setProducts(res.data.data);
            setProductCount(res.data.data.length);
        }catch(err){
            toast.error("Unable to load products!");
        }
    }
    fetchData();

    const fetchUserData=async()=>{
        try {
            const res=await axios.get(serverPort+"api/user/list-users");
            setUsers(res.data);
            setUserCount(res.data.length);
        } catch (error) {
            toast.error("Unable to load users!");
        }

    }

    fetchUserData();

    const fetchOrderData=async()=>{
      try {
        const res=await axios.get(serverPort+"api/order/display-order-data");
        setOrders(res.data.data);
        setOrderCount(res.data.data.length);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOrderData();

    
    
    
  }, []);

  const InsertProduct=async(data)=>{
    try {
        const res=axios.post("http://localhost:8080/api/product//insert-product-data",data);
        toast.success("Product inserted successfully!");
    } catch (error) {
        toast.error("Unable to insert product!");
    }
  }

  // Add a new product
  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      const newProductEntry = {
        _id: `p${products.length + 1}`,
        name: newProduct.name,
        price: parseFloat(newProduct.price),
      };
      InsertProduct(newProduct);
      setProducts((prev) => [...prev, newProductEntry]);
      setCounts((prev) => ({ ...prev, products: prev.products + 1 }));
      setNewProduct({ name: "", price: "" });
    }
  };

  // Delete a product
  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product._id !== id));
    setCounts((prev) => ({ ...prev, products: prev.products - 1 }));
  };

  // Filtered products based on search input
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchProduct.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>

      {/* Stats Section */}
      <div className="stats-container">
        <div className="stat-card">
          <h2>Total Users</h2>
          <p>{userCount}</p>
        </div>
        <div className="stat-card">
          <h2>Total Orders</h2>
          <p>{orderctCount}</p>
        </div>
        <div className="stat-card">
          <h2>Total Products</h2>
          <p>{productCount}</p>
        </div>
      </div>

      {/* Add Product Section */}
      <div className="section">
        <h2>Add New Product</h2>
        <div className="form-container">
          <input
            type="text"
            placeholder="Product Src"
            value={newProduct.src}
            onChange={(e) => setNewProduct({ ...newProduct, src: e.target.value })}
          />
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Product Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Product Catagory"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          />
          <button onClick={handleAddProduct}>Add Product</button>
        </div>
      </div>

      {/* Product Management Section */}
      <div className="section">
        <h2>Manage Products</h2>
        <input
          type="text"
          placeholder="Search Products"
          className="search-bar"
          value={searchProduct}
          onChange={(e) => setSearchProduct(e.target.value)}
        />
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="4" className="no-data">
                    No Products Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Management Section */}
      <div className="section">
        <h2>Manage Users</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Management Section */}
      <div className="section">
        <h2>Manage Orders</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.username}</td>
                  <td>₹{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
