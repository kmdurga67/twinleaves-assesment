import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { fetchProducts } from "../api";
import {
  TextField,
  MenuItem,
  Select,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("asc");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(page);
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [page]);

  const handleSearch = (e) => setSearch(e.target.value);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Name", width: 300 },
    { field: "main_category", headerName: "Category", width: 200 },
    {
      field: "mrp",
      headerName: "Price",
      width: 150,
      valueFormatter: ({ value }) => `₹${value?.mrp || "N/A"}`,
    },
    {
      field: "details",
      headerName: "Details",
      width: 150,
      renderCell: (params) => (
        <Button to={`/product/${params.row.id}`}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <TextField
        label="Search"
        variant="outlined"
        onChange={handleSearch}
        sx={{ mb: 2 }}
      />
      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        displayEmpty
        sx={{ mb: 2 }}
      >
        <MenuItem value="">All Categories</MenuItem>
        <MenuItem value="HOUSE HOLD NEEDS">Household Needs</MenuItem>
        {/* Add more categories as needed */}
      </Select>
      <Select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        displayEmpty
        sx={{ mb: 2 }}
      >
        <MenuItem value="asc">Price Ascending</MenuItem>
        <MenuItem value="desc">Price Descending</MenuItem>
      </Select>
      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={filteredProducts.map((product) => ({
            id: product.id,
            ...product,
          }))}
          columns={columns}
          getRowId={(row) => row.id || row.sku_code} 
          pageSize={10}
          rowsPerPageOptions={[10]}
          pagination
          onPageChange={(newPage) => setPage(newPage + 1)}
          sortModel={[{ field: "mrp", sort }]}
        />
      )}
      <Box sx={{ mt: 2 }}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Home;
