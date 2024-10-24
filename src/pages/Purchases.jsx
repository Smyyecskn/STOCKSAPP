import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import useStockCalls from "../service/useStockCalls";
import { useSelector } from "react-redux";
import PurchasesModal from "../components/PurchasesModal";
import PurchasesTable from "../components/PurchasesTable";
import TableSkeleton, { ErrorMsg, NoDataMsg } from "../components/DataFetchMsg";

const Purchases = () => {
  const { getProPurBrandFirm } = useStockCalls();
  const { purchases, error, loading } = useSelector((state) => state.stock);

  const initialState = {
    brandId: "",
    firmId: "",
    productId: "",
    quantity: "",
    price: "",
  };
  const [info, setInfo] = useState(initialState);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    // setInfo({ name: "", price: "", quantity: "" });
  };

  useEffect(() => {
    getProPurBrandFirm();
  }, []);

  console.log("purchases", purchases);

  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Purchases
      </Typography>
      <Button variant="contained" onClick={handleOpen} sx={{ mb: 3 }}>
        New Purchases
      </Button>

      <PurchasesModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />

      {error && <ErrorMsg />}
      {loading && <TableSkeleton />}

      {!error && !loading && !purchases?.length && <NoDataMsg />}

      {!loading && !error && purchases?.length > 0 && <PurchasesTable />}
    </div>
  );
};

export default Purchases;
