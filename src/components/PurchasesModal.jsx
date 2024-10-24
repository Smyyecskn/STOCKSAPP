import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { modalStyle } from "../styles/globalStyles";
import useStockCalls from "../service/useStockCalls";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";

export default function PurchasesModal({ open, handleClose, info, setInfo }) {
  const { postStock } = useStockCalls();

  const { products, brands, firms, purchases } = useSelector(
    (state) => state.stock
  );

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postStock("products", info);
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            component="form"
            onSubmit={handleSubmit}
          >
            <FormControl fullWidth>
              <InputLabel id="brandId">Brand</InputLabel>
              <Select
                labelId="brandId"
                id="brandId"
                name="brandId"
                value={info?.brandId}
                label="Brand"
                onChange={handleChange}
              >
                {brands?.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="firmId">Firm Name</InputLabel>
              <Select
                labelId="firmId"
                id="firmId"
                name="firmId"
                value={info?.firmId || ""}
                label="Firm Name"
                onChange={handleChange}
              >
                {firms?.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="productId">Product Name</InputLabel>
              <Select
                labelId="productId"
                id="productId"
                name="productId"
                value={info?.productId || ""}
                label="Product Name"
                onChange={handleChange}
              >
                {products?.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Quantity"
              name="quantity"
              id="quantity"
              type="text"
              variant="outlined"
              value={purchases?.quantity}
              onChange={handleChange}
              required
            />
            <TextField
              label="Price"
              name="price"
              id="price"
              type="text"
              variant="outlined"
              value={purchases?.price}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" size="large">
              Add Purchases
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
