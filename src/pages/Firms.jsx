import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import useStockCalls from "../service/useStockCalls";
import { useSelector } from "react-redux";
import FirmCard from "../components/FirmCard";
import FirmModal from "../components/FirmModal";

const Firms = () => {
  const { getStocks } = useStockCalls();
  const { firms } = useSelector((state) => state.stock);

  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInfo({ name: "", phone: "", address: "", image: "" });
  };
  // console.log("info", info);

  useEffect(() => {
    getStocks("firms");
    // getStocks("sales");
  }, []);
  // console.log("firms", firms);

  return (
    <div>
      <Typography variant="h5" color="error" mb={3} marginLeft={3}>
        Firms
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        New Firm
      </Button>
      <FirmModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />
      <Grid container gap={2} mt={3} sx={{ justifyContent: "center" }}>
        {firms?.map((firm) => (
          <Grid item key={firm._id}>
            <FirmCard firm={firm} handleOpen={handleOpen} setInfo={setInfo} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Firms;
