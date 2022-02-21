import React from "react";
import { useContext } from "react";
import clsx from "clsx";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import {
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField,
} from "@material-ui/core";

import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";

import { Link } from "react-router-dom";

import { AuthContext } from "../../contextsAuth/AuthContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: "25ch",
    },
    div: {
      display: "block",
    },
    textFieldName: {
      width: "58%",
      margin: "0.5rem 6.3rem",
    },
    divButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "-0.6rem",
    },
    link: {
      textDecoration: "none",
    },
    login: {
      height: "1.5rem",
    },
    button: {
      height: "1.5rem",
      margin: "1rem",
    },
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      marginTop: "10rem",
    },
    card: {
      maxWidth: 650,
      height: 550,
    },
    media: {
      height: 250,
    },
    typographyParagrafo: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    typographyTitle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    campo: {
      width: "100%",
      margin: "0.5rem 6rem",
    },
  })
);

interface State {
  password: string;
  showPassword: boolean;
}

export default function Home() {
  const classes = useStyles();

  const [values, setValues] = React.useState<State>({
    password: "",
    showPassword: false,
  });

  const auth = useContext(AuthContext);

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const [email, setEmail] = React.useState({
    email: "",
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleLogout = async () => {
    await auth.signout();
    window.location.reload();
  };

  const handleLogin = async () => {
    const response = await fetch("http://localhost:3333/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.email,
        password: values.password,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://www.infnet.edu.br/esti/wp-content/uploads/sites/44/2020/05/bigstock-Programming-Web-Banner-Best-P-349867117.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.typographyTitle}
            >
              Welcome!
            </Typography>
            <Typography component="p" className={classes.typographyParagrafo}>
              To keep connected with us please login with your personal info
            </Typography>
          </CardContent>
        </CardActionArea>
        <div className={classes.div}>
          <TextField
            className={classes.textFieldName}
            id="outlined-size-normal"
            variant="outlined"
            placeholder="Email"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) =>
              setEmail({ ...email, email: event.target.value })
            }
          />
          <CardActions>
            <FormControl
              className={clsx(classes.margin, classes.textField, classes.campo)}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
          </CardActions>{" "}
        </div>
        <div className={classes.divButton}>
          <Link to="/" className={classes.link}>
            {auth.user && <button onClick={handleLogout}>Sair</button>}
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogin}
              className={classes.login}
            >
              LOGIN
            </Button>
          </Link>
          <Link to="/signup" className={classes.link}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              SING UP
            </Button>
          </Link>
        </div>
      </Card>
    </Container>
  );
}
