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
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("asc");
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(page);
        setProducts(data.products);
        setTotalPages(parseInt(data.totalPages, 10));

        const uniqueCategories = [
          ...new Set(data.products.map((product) => product.main_category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [page]);

  const handleSearch = (e) => setSearch(e.target.value);

  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handleSortChange = (e) => setSort(e.target.value);

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) => (category ? product.main_category === category : true))
    .sort((a, b) => {
      if (sort === "asc") return a.mrp.mrp - b.mrp.mrp;
      if (sort === "desc") return b.mrp.mrp - a.mrp.mrp;
      return 0;
    });

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.row.images.front || "https://via.placeholder.com/150"}
          alt={params.row.name}
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
      ),
    },
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Product Name", width: 400 },
    { field: "main_category", headerName: "Category", width: 250 },
    {
      field: "mrp",
      headerName: "Price",
      width: 150,
      valueFormatter: (params) => {
        const value = params?.mrp; 
        if (value !== undefined && value !== null) {
          return `₹${value}`;
        }else{
          return "N/A";
        }
      },
    },
    {
      field: "details",
      headerName: "Details",
      width: 150,
      renderCell: (params) => (
        <Button
          onClick={() =>
            navigate(`/product/${params.row.id || params.row.sku_code}`)
          }
        >
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
        sx={{ mb: 2, width: "100%" }}
      />
      <Select
        value={category}
        onChange={handleCategoryChange}
        displayEmpty
        sx={{ mb: 2, width: "100%" }}
      >
        <MenuItem value="">All Categories</MenuItem>
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </Select>
      <Select
        value={sort}
        onChange={handleSortChange}
        displayEmpty
        sx={{ mb: 2, width: "100%" }}
      >
        <MenuItem value="asc">Ascending</MenuItem>
        <MenuItem value="desc">Descending</MenuItem>
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
          pageSize={20}
          rowsPerPageOptions={[20]}
          pagination
          paginationMode="server"
          rowCount={totalPages}
          paginationModel={{ page: page - 1, pageSize: 20 }} 
          onPaginationModelChange={(model) => {
            setPage(model.page + 1); 
          }}
          sortingOrder={["asc", "desc"]}
          sortModel={[{ field: "mrp", sort }]}
          onSortModelChange={(model) => {
            if (model.length > 0) {
              setSort(model[0].sort);
            }
          }}
        />
      )}
    </Box>
  );
};

export default Home;
