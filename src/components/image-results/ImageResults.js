import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Dialog,
  //DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Grow,
} from "@material-ui/core";
import { ZoomIn } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    height: "100%",
  },
  gridTile: {
    "&:hover img": {
      transform: "translateY(-50%) scale(1.2)",
      transition: "all ease-in 200ms",
    },

    flexGrow: 1,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.9)",
  },
}));

const ImageResults = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const classes = useStyles();
  let imageListContent;

  const handleOpen = (image) => {
    setOpen(true);
    setCurrentImage(image);
  };
  const handleClose = () => setOpen(false);

  if (images) {
    imageListContent = (
      <GridList
        cellHeight={250}
        cols={3}
        className={classes.gridList}
        spacing={1}
      >
        {images.map((img) => (
          <Grow in="true">
            <GridListTile
              key={img.id}
              onClick={(e) => handleOpen(img.largeImageURL)}
              style={{ cursor: "pointer" }}
              className={classes.gridTile}
            >
              <img src={img.largeImageURL} alt={img.tags} />
              <GridListTileBar
                title={img.tags}
                subtitle={
                  <span>
                    by <strong>{img.user}</strong>
                  </span>
                }
                actionIcon={
                  <IconButton
                    aria-label={`info about ${img.tags}`}
                    className={classes.icon}
                    onClick={(e) => handleOpen(img.largeImageURL)}
                  >
                    <ZoomIn />
                  </IconButton>
                }
              />
            </GridListTile>
          </Grow>
        ))}
      </GridList>
    );
  } else {
    imageListContent = null;
  }

  return (
    <div className={classes.root}>
      {imageListContent}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        fullWidth
        maxWidth="md"
      >
        {/* <DialogTitle id="alert-dialog-title">Dialog Title</DialogTitle> */}
        <DialogContent>
          <img
            src={currentImage}
            alt="current"
            style={{ width: "100%", height: "auto" }}
          />
        </DialogContent>
        <DialogActions style={{ marginRight: "15px" }}>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ImageResults.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageResults;
