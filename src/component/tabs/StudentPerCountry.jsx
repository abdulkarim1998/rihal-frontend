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
import { countriesEndpoints } from "../../api/apiEndpoints";
import Country from "./Country";

function StudentPerCountry({ countries, setCountries }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    countryName: selectedCountry ? selectedCountry.countryName : "",
  });

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

  useEffect(() => {
    setValues({
      countryName: selectedCountry ? selectedCountry.countryName : "",
    });
  }, [selectedCountry]);

  const submit = async () => {
    if (!values.countryName) return;
    setLoading(true);
    if (selectedCountry) {
      try {
        var { data } = await countriesEndpoints(selectedCountry._id).update(
          values
        );
      } catch (error) {
        console.log(error);
      }
      const newArray = countries.filter(
        (country) => selectedCountry._id != country._id
      );
      setCountries([...newArray, data]);
    } else {
      try {
        var { data } = await countriesEndpoints().post(values);
      } catch (error) {
        console.log(error);
      }

      setCountries([...countries, data]);
    }
    setLoading(false);
    setIsModalOpen(false);
    setSelectedCountry(null);
  };

  if (loading) return <CircularProgress color="secondary" />;

  return (
    countries && (
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
            setIsModalOpen(false);
            setSelectedCountry(null);
            setValues({ countryName: "" });
          }}
        >
          <Paper style={{ height: 200 }}>
            <TextField
              label="Country Name"
              value={values.countryName}
              onChange={(e) =>
                setValues({ ...values, countryName: e.target.value })
              }
            />
            <IconButton onClick={submit}>
              <SendIcon />
            </IconButton>
          </Paper>
        </Modal>

        {countries.map((country) => (
          <Country
            country={country}
            countries={countries}
            setCountries={setCountries}
            setSelectedCountry={setSelectedCountry}
            setIsModalOpen={setIsModalOpen}
          />
        ))}
      </div>
    )
  );
}

export default StudentPerCountry;
