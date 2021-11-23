import {
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import PublicIcon from "@material-ui/icons/Public";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { countriesEndpoints } from "../../api/apiEndpoints";
import { useState } from "react";
const useStyles = makeStyles({
  paper: {
    width: "60%",
    height: 80,
    margin: 8,
    transition: "all 0.5s",
    "&:hover": {
      backgroundColor: "#d0d0e1",
    },
  },
  span: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

function Country({
  country,
  countries,
  setCountries,
  setSelectedCountry,
  setIsModalOpen,
}) {
  const classes = useStyles();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const deleteClass = async () => {
    try {
      var { data } = await countriesEndpoints(country._id).delete();
    } catch (error) {
      console.log(error);
    }
    setCountries(countries.filter((item) => item._id != country._id));
  };

  const confirmDelete = () => {
    if (country.students.length != 0) {
      alert("this country cannot be deleted because it contains students");
      return;
    }
    setDeleteConfirm(true);
  };

  return (
    <Paper className={classes.paper} elevation={15}>
      <span className={classes.span}>
        <PublicIcon style={{ fontSize: "50px" }} />
        <span>
          <IconButton
            onClick={() => {
              setSelectedCountry(country);
              setIsModalOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>
          {!deleteConfirm ? (
            <IconButton onClick={confirmDelete}>
              <DeleteIcon />
            </IconButton>
          ) : (
            <span>
              <IconButton onClick={deleteClass}>
                <CheckIcon style={{ color: "gree" }} />
              </IconButton>
              <IconButton onClick={() => setDeleteConfirm(false)}>
                <CloseIcon style={{ color: "red" }} />
              </IconButton>
            </span>
          )}
        </span>
      </span>
      <Grid container>
        <Grid item xs={8}>
          <Typography variant="h5">
            Country name: {country.countryName}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Student count: {country.students.length}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Country;
