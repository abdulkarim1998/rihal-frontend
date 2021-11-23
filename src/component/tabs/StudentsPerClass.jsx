import {
  CircularProgress,
  Fab,
  IconButton,
  Modal,
  Paper,
  TextField,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import AddIcon from "@material-ui/icons/Add";
import { useEffect, useState } from "react";
import { classesEndpoints } from "../../api/apiEndpoints";
import Class from "./Class";

function StudentsPerClass({ classes, setClasses }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    className: selectedClass ? selectedClass.className : "",
  });

  useEffect(() => {
    setValues({
      className: selectedClass ? selectedClass.className : "",
    });
  }, [selectedClass]);

  useEffect(async () => {
    if (!classes) {
      try {
        const { data } = await classesEndpoints().fetchAll();
        setClasses(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const submit = async () => {
    if (!values.className) return;
    setLoading(true);
    if (selectedClass) {
      try {
        var { data } = await classesEndpoints(selectedClass._id).update(values);
      } catch (error) {
        console.log(error);
      }
      const newArray = classes.filter((item) => selectedClass._id != item._id);
      setClasses([...newArray, data]);
    } else {
      try {
        var { data } = await classesEndpoints().post(values);
      } catch (error) {
        console.log(error);
      }
      setClasses([...classes, data]);
    }
    setLoading(false);
    setIsModalOpen(false);
    setSelectedClass(null);
  };

  if (loading) return <CircularProgress color="secondary" />;

  return (
    classes && (
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
            width: "30%",
            margin: "auto",
            marginTop: "200px",
          }}
          open={isModalOpen}
          onClose={() => {
            console.log(selectedClass);
            setIsModalOpen(false);
            setSelectedClass(null);
            setValues({ className: "" });
          }}
        >
          <Paper style={{ height: 200 }}>
            <TextField
              label="Class Name"
              value={values.className}
              onChange={(e) =>
                setValues({ ...values, className: e.target.value })
              }
            />
            <IconButton onClick={submit}>
              <SendIcon />
            </IconButton>
          </Paper>
        </Modal>

        {classes.map((clas) => (
          <Class
            clas={clas}
            allClasses={classes}
            setClasses={setClasses}
            setSelectedClass={setSelectedClass}
            setIsModalOpen={setIsModalOpen}
          />
        ))}
      </div>
    )
  );
}

export default StudentsPerClass;
