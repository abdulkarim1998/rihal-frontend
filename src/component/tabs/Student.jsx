import {
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import FaceIcon from "@material-ui/icons/Face";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { studentsEndpoints } from "../../api/apiEndpoints";
import moment from "moment";

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

function Student({
  student,
  students,
  setStudents,
  setSelectedStudent,
  setIsModalOpen,
}) {
  const classes = useStyles();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const deleteClass = async () => {
    try {
      await studentsEndpoints(student._id).delete();
    } catch (error) {
      console.log(error);
    }
    setStudents(students.filter((item) => student._id != item._id));
  };

  const confirmDelete = () => {
    setDeleteConfirm(true);
  };

  return (
    <Paper className={classes.paper} elevation={15}>
      <span className={classes.span}>
        <FaceIcon style={{ fontSize: "50px" }} />
        <span>
          <IconButton
            onClick={() => {
              setSelectedStudent(student);
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
            Country name: {student.studentName}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>
            Student age: {moment().diff(student.dateOfBirth, "years", false)}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Student;
