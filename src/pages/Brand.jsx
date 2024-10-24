import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import useStockCalls from "../service/useStockCalls";
import { useSelector } from "react-redux";
import BrandCard from "../components/BrandCard";
import BrandModal from "../components/BrandModal";

const Brand = () => {
  const { getStocks } = useStockCalls();
  const { brands } = useSelector((state) => state.stock);

  const [info, setInfo] = useState({
    name: "",
    image: "",
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setInfo({ name: "", image: "" });
  };
  // console.log("info", info);

  useEffect(() => {
    getStocks("brands");
  }, []);
  // console.log("brand", brands);

  return (
    <div>
      <Typography variant="h5" color="error" mb={3} marginLeft={3}>
        Brands
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        New Brands
      </Button>
      <BrandModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />
      <Grid container gap={2} mt={3} sx={{ justifyContent: "center" }}>
        {brands?.map((brand) => (
          <Grid item key={brand._id}>
            <BrandCard
              brand={brand}
              handleOpen={handleOpen}
              setInfo={setInfo}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Brand;
