import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function FirmCard({ firm }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {firm.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {firm.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {firm.phone}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={firm.image}
      />

      <CardActions>
        <Button size="small" variant="contained">
          Edit
        </Button>
        <Button size="small" variant="contained">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
