import React, { useState, lazy, Suspense } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import axios from "axios";

let ImageResults = lazy(() =>
  import("../../components/image-results/ImageResults")
);
//import ImageResults from "../../components/image-results/ImageResults";

const useStyles = makeStyles((theme) => ({
  formControl: {
    //margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    marginTop: "80px",
    padding: "0px 20px",
    "& > *": {
      marginBottom: "5px",
    },
  },
  InputLabel: {
    fontSize: "1rem",
  },
}));

const Search = () => {
  const classes = useStyles();

  const [searchText, setSearchTest] = useState("");
  const [amount, setAmount] = useState(10);
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [timeOut, setTimeOut] = useState(null);

  const apiUrl = "https://pixabay.com/api";
  const apiKey = "16320203-ba39af2d63ae468cd0630a702";

  const onTextChange = (e) => {
    const text = e.target.value;
    setSearchTest(text);

    clearTimeout(timeOut);

    if (text === "" || !text || text.length <= 0) {
      setImages([]);
    } else {
      setTimeOut(
        setTimeout(() => {
          fetchData(text);
        }, 1000)
      );
    }
  };

  const fetchData = (val) => {
    return axios
      .get(
        `${apiUrl}/?key=${apiKey}&q=${val}&image_type=photo&per_page=${amount}&safesearch=true`
      )
      .then((res) => {
        setImages(res.data.hits);
        console.log(res.data.hits);
      })
      .catch((err) => console.log(err));
  };

  const onAmountChange = (e) => {
    setAmount(e.target.value);
    fetchData(searchText);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchData(e.target.value);
    }
  };

  return (
    <div className={classes.root}>
      <TextField
        label="Type a keyword for search"
        required
        fullWidth
        name="searchText"
        value={searchText}
        onChange={(e) => onTextChange(e)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <FormControl className={classes.formControl}>
        <InputLabel id="amount-label">Amount</InputLabel>
        <Select
          labelId="amount-label"
          id="demo-simple-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={amount}
          onChange={(e) => onAmountChange(e)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <br />
      <br />
      {images.length > 0 && (
        <Suspense fallback={<div>Loading..</div>}>
          {" "}
          <ImageResults images={images} />
        </Suspense>
      )}
    </div>
  );
};

export default Search;
