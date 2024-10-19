import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import useAuthCalls from "../service/useAuthCalls.js";

const Login = () => {
  const { login } = useAuthCalls();
  const loginSchema = object({
    email: string()
      .email("Lütfen geçerli bir email giriniz.")
      .required("Bu alan zorunludur."),
    password: string()
      .required("Password zorunludur.")
      .min(6, "Şifre en az 6 karakter içermelidir.")
      .max(16, "Şifre en fazla 16 karakter içermelidir.")
      .matches(/\d+/, "Şifre en az bir rakam içermelidir.")
      .matches(/[a-z]/, "Şifre en az bir harf içermelidir.")
      .matches(/[A-Z]/, "Şifre en az bir buyuk harf içermelidir.")
      .matches(
        /[!/[@$!%*?&]+/,
        "Şifre bir özel karakter (!/[@$!%*?&) içermelidir"
      ),
  });
  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }} // handleChangeın initial değerlerini buraya yazdık.
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              actions.resetForm(); // formu sıfırla
              actions.setSubmitting(false); //isSubmitting formun gonderılme asamasında falseladık.
              //TODO LOGIN POST form submit edildiğinde yapılacaklar
              //veriler global statete aktarılabilir.
              //navigasyon yapılabilir.
              //toastify ile bilgilendirme yapılabilir.
              login(values); //useAuthCalls'daki logın fonk çagırdık ve onSubmit içindeki valuesden logın bızden bır parmtre ıster bu yuzden verdık.
            }}
          >
            {(
              { handleChange, values, touched, errors, handleBlur } //onSubmitin içindeki valuesdan alabiliriz.
            ) => (
              // touched = dokunuldu mu?
              // Ustte olustrdgmz her bir state ıcın error objesı oluşur.
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    variant="outlined"
                    value={values.email}
                    onBlur={handleBlur} //onFocus aktifliği ayrıldıgını da onBlur eventı tetıklenır.Formıkın de hazır fonksıyonu olan handleBlur fonksıyonunu ıcıne yazdık.
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)} //muıden gelen error değişkeni true olursa helperTexti basar.
                    helperText={errors.email} //alttakı minik yazıyı döndürür.errors.emailin true olup olmamasına göre cıkarır.
                  />
                  <TextField
                    label="password"
                    name="password"
                    id="password"
                    type="password"
                    variant="outlined"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={errors.password}
                  />

                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/register">Do you have not an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={10} sm={7} md={6}>
          <Container>
            <img src={image} alt="img" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
