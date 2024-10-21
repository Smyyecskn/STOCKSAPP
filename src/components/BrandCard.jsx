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

export default function BrandCard({ brand, handleOpen, setInfo }) {
  const { deleteStock } = useStockCalls();
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
          {brand.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {brand.address}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="image"
        height="140"
        image={brand.image}
        sx={{ objectFit: "contain" }} //!resmi sığdırmak icin
      />
      <Typography variant="body2" color="text.secondary">
        {brand.phone}
      </Typography>

      <CardActions>
        <EditIcon
          sx={btnStyle}
          onClick={() => {
            handleOpen();
            setInfo(brand);
          }}
        />
        <DeleteForeverIcon
          sx={btnStyle}
          onClick={() => deleteStock("firms", brand._id)}
        />
      </CardActions>
    </Card>
  );
}
