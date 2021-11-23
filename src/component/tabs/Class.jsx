import { Grid, IconButton, Paper, Typography } from "@material-ui/core";
import SchoolIcon from "@material-ui/icons/School";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import { classesEndpoints } from "../../api/apiEndpoints";
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

function Class({
  clas,
  allClasses,
  setClasses,
  setSelectedClass,
  setIsModalOpen,
}) {
  const classes = useStyles();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const deleteClass = async () => {
    console.log(clas._id);
    try {
      await classesEndpoints(clas._id).delete();
    } catch (error) {
      console.log(error);
    }

    setClasses(allClasses.filter((item) => item._id != clas._id));
  };

  const confirmDelete = () => {
    if (clas.students) {
      if (clas.students.length != 0) {
        alert("this class cannot be deleted because it contains students");
        return;
      }
    }
    setDeleteConfirm(true);
  };

  return (
    <Paper className={classes.paper} elevation={15}>
      <span className={classes.span}>
        <SchoolIcon style={{ fontSize: "50px" }} />
        <span>
          <IconButton
            onClick={() => {
              setSelectedClass(clas);
              setIsModalOpen(true);
              console.log(clas);
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
          <Typography variant="h5">Class name: {clas.className}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>
            Student count: {clas.students ? clas.students.length : "0"}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Class;
