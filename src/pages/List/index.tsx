import { useContext } from "react";
import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";

import DashboardIcon from "@material-ui/icons/Dashboard";
import ListAltIcon from "@material-ui/icons/ListAlt";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import ContactsIcon from "@material-ui/icons/Contacts";

import { AuthContext } from "../../contextsAuth/AuthContext";

import { Link } from "react-router-dom";

import { useFetch } from "../../hooks/useFetch";

type Psafe = {
  id: number;
  name: string;
  description: number;
  date: string;
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  formList: {
    margin: "6rem 4rem 4rem 4rem",
  },
  paddingForm: {
    padding: "1rem 1rem",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function Lista() {
  const auth = useContext(AuthContext);

  const { data } = useFetch<Psafe[]>(
    "http://candidate-api.srt.psafe.com/v1/query_collectors"
  );

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Ol?? {auth.user?.name}, Welcome List!
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Dashboard"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <List>
          {["Lista"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <Link to="/list">
                  <ListAltIcon />
                </Link>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <List>
          {["Contacts", "Border Color"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <ContactsIcon /> : <BorderColorIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main>
        <form className={classes.formList}>
          <div className={classes.paddingForm}>
            <TextField
              label="ID"
              id="id"
              value={auth.user?.id}
              placeholder="ID"
              variant="outlined"
            >
              {data && data.map((item) => <div key={item.id}>{item.name}</div>)}
            </TextField>
            <TextField
              label="Nome"
              id="outlined-size-normal"
              placeholder="Nome"
              variant="outlined"
            >
              {data && data.map((item) => <div key={item.name}></div>)}
            </TextField>
            <TextField
              label="Number"
              id="outlined-size-normal"
              placeholder="Number"
              variant="outlined"
            >
              {data && data.map((item) => <div key={item.id}></div>)}
            </TextField>
            <TextField
              id="datetime-local"
              label="Date"
              type="datetime-local"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            >
              {data && data.map((item) => <div key={item.date}></div>)}
            </TextField>
          </div>
        </form>
        <form className={classes.formList}>
          <div className={classes.paddingForm}>
            <TextField
              label="ID"
              id="id"
              value={auth.user?.id}
              placeholder="ID"
              variant="outlined"
            >
              {data && data.map((item) => <div key={item.id}>{item.name}</div>)}
            </TextField>
            <TextField
              label="Nome"
              id="outlined-size-normal"
              placeholder="Nome"
              variant="outlined"
            >
              {data && data.map((item) => <div key={item.name}></div>)}
            </TextField>
            <TextField
              label="Number"
              id="outlined-size-normal"
              placeholder="Number"
              variant="outlined"
            >
              {data && data.map((item) => <div key={item.id}></div>)}
            </TextField>
            <TextField
              id="datetime-local"
              label="Date"
              type="datetime-local"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            >
              {data && data.map((item) => <div key={item.date}></div>)}
            </TextField>
          </div>
        </form>
      </main>
    </div>
  );
}
