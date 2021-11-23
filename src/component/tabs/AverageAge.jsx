import { Button, Paper, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { studentsEndpoints } from "../../api/apiEndpoints";
import moment from "moment";
function AverageAge({ students, setStudents }) {
  useEffect(async () => {
    if (!students) {
      const { data } = await studentsEndpoints().fetchAll();
      console.log(data);
      setStudents(data);
    }
  }, []);

  const averageAgeCalc = () => {
    const ages = students.map((student) =>
      moment().diff(student.dateOfBirth, "years", false)
    );
    const reducer = (previousValue, currentValue) =>
      previousValue + currentValue;
    return ages.reduce(reducer) / ages.length;
  };

  return (
    students && (
      <Paper>
        <Typography variant="h3">
          Average students' age {averageAgeCalc()}{" "}
        </Typography>
      </Paper>
    )
  );
}

export default AverageAge;
