import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PaidIcon from "@mui/icons-material/Paid";
import ArchiveIcon from "@mui/icons-material/Archive";
import { deepPurple, pink, deepOrange } from "@mui/material/colors";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const KPI = () => {
  const { sales, purchases } = useSelector((state) => state.stock);
  const totalSales = sales?.reduce((acc, item) => acc + item.amount, 0);
  const totalPurchases = purchases?.reduce((acc, item) => acc + item.amount, 0);

  const kpiData = [
    {
      id: 1,
      title: "sales",
      amount: `$${totalSales}`,
      icon: <PaidIcon sx={{ fontSize: 35 }} />,
      bgColor: deepPurple[100],
      color: deepPurple[700],
    },
    {
      id: 2,
      title: "profit",
      amount: `$${totalSales - totalPurchases}`,
      icon: <AddShoppingCartIcon sx={{ fontSize: 30 }} />,
      bgColor: pink[100],
      color: pink[700],
    },
    {
      id: 3,
      title: "purchases",
      amount: `$${totalPurchases}`,
      icon: <ArchiveIcon sx={{ fontSize: 30 }} />,
      bgColor: deepOrange[100],
      color: deepOrange[500],
    },
  ];

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      gap="10px"
      direction="row"
    >
      {kpiData.map((item) => (
        <Paper
          sx={{
            display: "flex",
            gap: 3,
            p: 2,
            width: "250px",
            alignItems: "center",
          }}
          elevation={3}
          key={item.id}
        >
          <Avatar
            sx={{
              bgcolor: item.bgColor,
              color: item.color,
              width: 60,
              height: 60,
              fontSize: 30,
            }}
          >
            {item.icon}
          </Avatar>
          <Box>
            <Typography variant="button">{item.title}</Typography>
            <Typography variant="h5">{item.amount}</Typography>
          </Box>
        </Paper>
      ))}
    </Stack>
  );
};

export default KPI;
