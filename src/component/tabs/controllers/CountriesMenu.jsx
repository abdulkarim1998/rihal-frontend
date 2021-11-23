import { MenuItem, TextField } from "@material-ui/core";

function CountriesMenu({ countries, values, setValues }) {
  const handleOnChange = (e) => {
    setValues({ ...values, country: e.target.value });
  };
  return (
    <TextField
      select
      fullWidth
      value={values.country}
      onChange={handleOnChange}
    >
      {countries.map((item, index) => (
        <MenuItem key={index} value={item._id}>
          {item.countryName}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default CountriesMenu;
