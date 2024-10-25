import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import useStockCalls from "../service/useStockCalls";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { btnStyle } from "../styles/globalStyles";

export default function ProductTable({ handleOpen, setInfo }) {
  const { purchases } = useSelector((state) => state.stock);
  const { deleteStock } = useStockCalls();

  const getRowId = (row) => row?._id;
  const columns = [
    {
      field: "updatedAt",
      headerName: "Date",
      flex: 1.4,
      minWidth: "150px",
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        // console.log(row);
        return new Date(row?.updatedAt).toLocaleDateString("tr");
      },
    },
    {
      field: "firmId",
      headerName: "Firm Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (props) => {
        // console.log("props", props);
        return props?.name; //verileri formatlamak istersek
      },
    },
    {
      field: "brandId",
      headerName: "Brand Name",
      flex: 1.2,
      headerAlign: "center",
      align: "center",
      valueGetter: (props) => props?.name,
    },
    {
      field: "productId",
      headerName: "Product Name",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      valueGetter: (props) => props?.name,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      headerAlign: "center",
      renderCell: ({
        row: { brandId, productId, quantity, price, firmId, _id },
      }) => {
        return [
          <GridActionsCellItem
            key={"edit"}
            icon={<EditIcon />}
            label="Edit"
            onClick={() => {
              handleOpen();
              setInfo({ _id, brandId, productId, quantity, price, firmId });
            }}
            sx={btnStyle}
          />,
          <GridActionsCellItem
            key={"delete"}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deleteStock("purchases", _id)}
            sx={btnStyle}
          />,
        ];
      },
    },
  ];

  // console.log(products)
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        autoHeight
        rows={purchases || []}
        columns={columns}
        pageSizeOptions={[5, 10, 20, 50, 100]} //pagination kaç sayfa olcak
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={getRowId}
        slots={{ toolbar: GridToolbar }} //filter, print vs özellikler için
      />
    </Box>
  );
}
