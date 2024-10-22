import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { btnStyle } from "../styles/globalStyles";
import useStockCalls from "../service/useStockCalls";

export default function FirmCard({ firm, handleOpen, setInfo }) {
  const { deleteStock } = useStockCalls();

  const { name, address, phone, image, _id } = firm;
  // console.log("firm", firm);
  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around", //ust ve alta dayayacak.
        alignItems: "center",
        width: "300px",
        height: "400px",
        p: "2px",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {address}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="image"
        height="140"
        image={image}
        sx={{ objectFit: "contain" }} //!resmi sığdırmak icin
      />
      <Typography variant="body2" color="text.secondary">
        {phone}
      </Typography>

      <CardActions>
        <EditIcon
          sx={btnStyle}
          onClick={() => {
            handleOpen();
            setInfo(firm);
          }}
        />
        <DeleteForeverIcon
          sx={btnStyle}
          onClick={() => deleteStock("firms", _id)}
        />
      </CardActions>
    </Card>
  );
}
