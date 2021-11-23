import {
  Fab,
  Grid,
  IconButton,
  Modal,
  Paper,
  TextField,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import AddIcon from "@material-ui/icons/Add";
import { useEffect, useState } from "react";
import {
  classesEndpoints,
  countriesEndpoints,
  studentsEndpoints,
} from "../../api/apiEndpoints";
import Student from "./Student";
import moment from "moment";
import CountriesMenu from "./controllers/CountriesMenu";
import ClassesMenu from "./controllers/ClassesMenu";

function StudentsList({
  students,
  setStudents,
  classes,
  setClasses,
  countries,
  setCountries,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    studentName: "",
    dateOfBirth: moment(new Date("1990-01-01")).format("YYYY-MM-DD"),
    class: "",
    country: "",
  });
  moment.locale("en");

  useEffect(async () => {
    if (!countries) {
      try {
        const { data } = await countriesEndpoints().fetchAll();
        setCountries(data);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(async () => {
    if (!classes) {
      try {
        const { data } = await classesEndpoints().fetchAll();
        setClasses(data);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(async () => {
    if (!students) {
      const { data } = await studentsEndpoints().fetchAll();
      console.log(data);
      setStudents(data);
    }
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      setValues({
        studentName: selectedStudent.studentName,
        dateOfBirth: moment(selectedStudent.dateOfBirth).format("YYYY-MM-DD"),
        class: selectedStudent.class,
        country: selectedStudent.country,
      });
    }
  }, [selectedStudent]);

  const submit = async () => {
    if (!values.studentName) return;
    setLoading(true);
    if (selectedStudent) {
      try {
        var { data } = await studentsEndpoints(selectedStudent._id).update(
          values
        );
      } catch (error) {
        console.log(error);
      }
      const newArray = students.filter(
        (student) => selectedStudent._id != student._id
      );
      setStudents([...newArray, data]);
    } else {
      try {
        var { data } = await studentsEndpoints().post(values);
      } catch (error) {
        console.log(error);
      }
      setStudents([...students, data]);
    }
    setLoading(false);
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    students && (
      <div>
        <Fab
          color="primary"
          style={{ float: "right" }}
          onClick={() => setIsModalOpen(true)}
        >
          <AddIcon />
        </Fab>
        <Modal
          style={{
            width: "40%",
            margin: "auto",
            marginTop: "200px",
          }}
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedStudent(null);
          }}
        >
          <Paper style={{ height: 200, padding: 10 }}>
            <Grid container>
              <Grid item xs={6}>
                <TextField
                  label="Student Name"
                  title="studentName"
                  value={values.studentName}
                  onChange={(e) =>
                    setValues({ ...values, studentName: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="date"
                  label="Birthday"
                  type="date"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      dateOfBirth: moment(e.target.value).format("YYYY-MM-DD"),
                    })
                  }
                  defaultValue={
                    selectedStudent
                      ? values.dateOfBirth.toString()
                      : "1990-01-01"
                  }
                />
              </Grid>

              <Grid itme xs={12}>
                <ClassesMenu
                  classes={classes}
                  values={values}
                  setValues={setValues}
                />
              </Grid>

              <Grid itme xs={12}>
                <CountriesMenu
                  countries={countries}
                  values={values}
                  setValues={setValues}
                />
              </Grid>
            </Grid>
            <IconButton onClick={submit}>
              <SendIcon />
            </IconButton>
          </Paper>
        </Modal>

        {students.map((student) => (
          <Student
            student={student}
            students={students}
            setStudents={setStudents}
            setSelectedStudent={setSelectedStudent}
            setIsModalOpen={setIsModalOpen}
          />
        ))}
      </div>
    )
  );
}

export default StudentsList;
