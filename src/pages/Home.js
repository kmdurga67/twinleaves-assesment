import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  TextField,
  MenuItem,
  Select,
  CircularProgress,
  Box,
  Button,
  Grid,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";
import { fetchProducts } from "../api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(() => {
    return parseInt(localStorage.getItem("currentPage"), 10) || 1;
  });
  const [category, setCategory] = useState(() => {
    return localStorage.getItem("category") || "";
  });
  const [sort, setSort] = useState(() => {
    return localStorage.getItem("sort") || "asc";
  });
  const [search, setSearch] = useState(() => {
    return localStorage.getItem("search") || "";
  });
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
  }, [page,category, sort, search]);

  useEffect(() => {
    localStorage.setItem("currentPage", page);
    localStorage.setItem("category", category);
    localStorage.setItem("sort", sort);
    localStorage.setItem("search", search);
  }, [page, category, sort, search]);

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
    { field: "id", headerName: "ID", width: 300 },
    { field: "name", headerName: "Product Name", width: 450 },
    { field: "main_category", headerName: "Category", width: 250 },
    {
      field: "image",
      headerName: "Image",
      width: 220,
      renderCell: (params) => (
        <img
          src={params.row.images.front || "https://via.placeholder.com/100"}
          alt={params.row.name}
          style={{ width: 80, height: 80, objectFit: "cover", borderRadius: "8px" }}
        />
      ),
    },
    {
      field: "mrp",
      headerName: "Price",
      width: 200,
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
          variant="contained"
          color="primary"
          onClick={() =>
            navigate(`/product/${params.row.id || params.row.sku_code}`, {
              state: { product: params.row },
            })
          }
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
        Product Catalog
      </Typography>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            onChange={handleSearch}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={handleCategoryChange}
              label="Category"
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Sort By Price</InputLabel>
            <Select
              value={sort}
              onChange={handleSortChange}
              label="Sort By Price"
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          rows={filteredProducts.map((product) => ({
            id: product.id || product.sku_code,
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
          autoHeight
          disableColumnMenu
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "primary.main",
              color: "blue",
              fontSize: 24,
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid rgba(224, 224, 224, 1)",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        />
      )}
    </Box>
  );
};

export default Home;
