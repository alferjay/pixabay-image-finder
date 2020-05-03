import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Menu } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const uiStyles = makeStyles({
  root: {
    paddingRight: "10px",
  },
});

const NavBar = () => {
  const classes = uiStyles();

  return (
    <AppBar title="Pixabay Image Finder">
      <Toolbar>
        <div className={classes.root}>
          <Menu />
        </div>
        <Typography variant="h5">Pixabay Image Finder</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
