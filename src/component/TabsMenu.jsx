import { AppBar, Box, Tab, Typography } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import { useState } from "react";
import StudentPerCountry from "./tabs/StudentPerCountry";
import StudentsPerClass from "./tabs/StudentsPerClass";
import AverageAge from "./tabs/AverageAge";
import StudentsList from "./tabs/StudentsList";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function TabsMenu() {
  const [value, setValue] = useState(0);

  const [Classes, setClasses] = useState(null);
  const [Students, setStudents] = useState(null);
  const [Countries, setCountries] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Classes" />
          <Tab label="Countries" />
          <Tab label="Students" />
          <Tab label="Average students age" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <StudentsPerClass classes={Classes} setClasses={setClasses} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <StudentPerCountry countries={Countries} setCountries={setCountries} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <StudentsList
          students={Students}
          setStudents={setStudents}
          classes={Classes}
          setClasses={setClasses}
          countries={Countries}
          setCountries={setCountries}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <AverageAge students={Students} setStudents={setStudents} />
      </TabPanel>
    </div>
  );
}

export default TabsMenu;
