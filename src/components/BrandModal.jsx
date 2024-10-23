import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import useStockCalls from "../service/useStockCalls";
import { modalStyle } from "../styles/globalStyles";

export default function BrandModal({ open, handleClose, info, setInfo }) {
  const { putStock, getStocks, postStock } = useStockCalls();

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //!POST İŞLEMİ
    if (info?._id) {
      putStock("brands", info);
    } else {
      postStock("brands", info);
    }
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
            sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}
            component="form"
            onSubmit={handleSubmit}
          >
            <TextField
              label="Brand Name"
              name="name"
              id="name"
              type="text"
              variant="outlined"
              value={info?.name}
              onChange={handleChange}
              required
            />

            <TextField
              label="Image"
              name="image"
              id="image"
              type="text"
              variant="outlined"
              value={info?.image}
              onChange={handleChange}
              required
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ justifyContent: "center" }}
            >
              {info._id ? "Update Brand" : "Submit Brand"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
