import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageProducts.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SkeletonLoader from "./SkeletonLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const [editProduct, setEditProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Fetch products from backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Pagination calculations
  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === "" || product.status === filterStatus)
    );
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handlers for editing stock and status
  const openEditModal = (product) => {
    setEditProduct({ ...product });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditProduct(null);
  };

  const handleStockChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setEditProduct({ ...editProduct, stock_quantity: value });
    }
  };

  const handleStatusChange = (e) => {
    setEditProduct({ ...editProduct, status: e.target.value });
  };

  const saveChanges = async () => {
    if (!editProduct) return;
    setUpdating(true);
    try {
      if (editProduct.stock_quantity !== undefined) {
        await axios.put("/api/products/" + editProduct.id + "/stock", {
          stock_quantity: Number(editProduct.stock_quantity),
        });
      }
      if (editProduct.status) {
        await axios.put("/api/products/" + editProduct.id + "/status", {
          status: editProduct.status,
        });
      }
      toast.success("Product updated successfully");
      fetchProducts();
      closeEditModal();
    } catch (error) {
      toast.error("Failed to update product");
    } finally {
      setUpdating(false);
    }
  };

  // Status badge color
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Active":
        return "status-badge active";
      case "Inactive":
        return "status-badge inactive";
      case "Out of Stock":
        return "status-badge out-of-stock";
      default:
        return "status-badge";
    }
  };

  return (
    <div className="manage-products">
      <h2>Product Inventory Management</h2>

      <div className="filter-section">
        <input
          type="text"
          placeholder="Search by Product Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">Filter by Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      {loading ? (
        <SkeletonLoader />
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Seller Name</th>
              <th>Price</th>
              <th>Stock Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.seller_name || "N/A"}</td>
                <td>${Number(product.price).toFixed(2)}</td>
                <td>
                  {product.stock_quantity}
                  {product.stock_quantity < 5 && (
                    <span className="low-stock-badge">Low Stock</span>
                  )}
                </td>
                <td>
                  <span className={getStatusBadgeClass(product.status)}>{product.status}</span>
                </td>
                <td>
                  <button onClick={() => openEditModal(product)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="prev-next"
        >
          <FaArrowLeft />
        </button>
        {[...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()].map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number + 1)}
            className={currentPage === number + 1 ? "active" : ""}
          >
            {number + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
          className="prev-next"
        >
          <FaArrowRight />
        </button>
      </div>

      {showEditModal && (
        <div className="edit-modal">
          <div className="modal-content">
            <h3>Edit Product</h3>
            <label>
              Stock Quantity:
              <input
                type="text"
                value={editProduct.stock_quantity}
                onChange={handleStockChange}
                disabled={updating}
              />
            </label>
            <label>
              Status:
              <select value={editProduct.status} onChange={handleStatusChange} disabled={updating}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </label>
            <button onClick={saveChanges} disabled={updating}>
              {updating ? "Saving..." : "Save"}
            </button>
            <button onClick={closeEditModal} disabled={updating}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ManageProducts;
