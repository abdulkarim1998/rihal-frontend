import { MenuItem, TextField } from "@material-ui/core";

function ClassesMenu({ classes, values, setValues }) {
  const handleOnChange = (e) => {
    setValues({ ...values, class: e.target.value });
  };
  return (
    <TextField select fullWidth value={values.class} onChange={handleOnChange}>
      {classes.map((item, index) => (
        <MenuItem key={index} value={item._id}>
          {item.className}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default ClassesMenu;
