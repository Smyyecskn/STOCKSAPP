import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useStockCalls from "../service/useStockCalls";
// import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

export default function ProductTable() {
  const { purchases } = useSelector((state) => state.stock);
  const { deleteStock, putStock } = useStockCalls();

  const getRowId = (row) => row?._id;
  const columns = [
    {
      field: "_id",
      headerName: "#",
      flex: 1.4,
      minWidth: "150px",
      headerAlign: "center",
      align: "center",
      sortable: false,
    },
    {
      field: "brandId",
      headerName: "Brand",
      flex: 1.2,
      headerAlign: "center",
      align: "center",
      valueGetter: (props) => props?.name,
    },
    {
      field: "productId",
      headerName: "Product",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (props) => {
        // console.log(props);
        return props?.name; //verileri formatlamak istersek
      },
    },

    {
      field: "price",
      headerName: "Price",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "quantity",
      headerName: "Stock",
      type: "number",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      headerAlign: "center",
      getActions: (props) => [
        <GridActionsCellItem
          icon={<DeleteForeverIcon />}
          onClick={() => deleteStock("purchases", props.id)}
          label="Delete"
        />,
        // <GridActionsCellItem
        //   icon={<ModeEditOutlineIcon />}
        //   onClick={() => putStock("purchases", props)}
        //   label="Edit"
        // />,
      ],
    },
  ];

  // console.log(purchases)
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
