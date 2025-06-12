import {
  AppBar,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm, Controller } from "react-hook-form";
import { FaPhoneAlt, FaUserAlt } from "react-icons/fa";
import Appbar from "../components/Appbar";
import backgroundImage from "../assets/11.png";

const highlightColor = "#E0C097";
const fadeInVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
    },
  }),
};

const BookAppointment = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const [patientType, setPatientType] = useState("new");
  const [service, setService] = useState("");
  const [preferredDate, setPreferredDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const timeSlots = [
    "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM"
  ];

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedPhone = localStorage.getItem("phone");
    const storedPatientType = localStorage.getItem("patientType");
    const storedService = localStorage.getItem("service");
    const storedPreferredDate = localStorage.getItem("preferredDate");
    const storedSelectedTime = localStorage.getItem("selectedTime");

    if (storedName || storedPhone || storedPatientType || storedService || storedPreferredDate || storedSelectedTime) {
      setIsUpdate(true);
    }

    if (storedName) setValue("name", storedName);
    if (storedPhone) setValue("phone", storedPhone);
    if (storedPatientType) setPatientType(storedPatientType);
    if (storedService) setService(storedService);
    if (storedPreferredDate) setPreferredDate(new Date(storedPreferredDate));
    if (storedSelectedTime) setSelectedTime(storedSelectedTime);
  }, [setValue]);

  const saveAppointment = (data, isUpdating = false) => {
    if (!selectedTime || !service || !preferredDate) {
      toast.error("Please fill in all fields before confirming.");
      return;
    }

    localStorage.setItem("name", data.name);
    localStorage.setItem("phone", data.phone);
    localStorage.setItem("patientType", patientType);
    localStorage.setItem("service", service);
    localStorage.setItem("preferredDate", preferredDate.toISOString());
    localStorage.setItem("selectedTime", selectedTime);

    toast.success(isUpdating ? "Appointment updated!" : "Appointment confirmed!");
    setTimeout(() => navigate("/ThankYou"), 2000);
  };

  const handleUpdate = () => {
    const data = getValues();
    saveAppointment(data, true);
  };

  return (
    <>
      <Appbar />
      <Box
        sx={{
          position: "relative",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "80px",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ zIndex: 2, width: "100%" }}
        >
          <Container maxWidth="md" sx={{ backgroundColor: "transparent", boxShadow: "none", color: highlightColor }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            >
              <Typography variant="h4" fontWeight="bold" align="center" gutterBottom sx={{ color: "white" }}>
                Book Your Appointment
              </Typography>
            </motion.div>

            <Stack spacing={4} mt={3}>
              <motion.div variants={fadeInVariant} initial="hidden" animate="visible" custom={0}>
                <ToggleButtonGroup
                  value={patientType}
                  exclusive
                  onChange={(e, val) => val && setPatientType(val)}
                  fullWidth
                  color="primary"
                >
                  <ToggleButton value="new">New Patient</ToggleButton>
                  <ToggleButton value="existing">Existing Patient</ToggleButton>
                </ToggleButtonGroup>
              </motion.div>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <motion.div variants={fadeInVariant} initial="hidden" animate="visible" custom={0.5}>
                    <Tooltip title="Enter your full legal name">
                      <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Name is required",
                          pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: "Only letters are allowed",
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Full Name"
                            fullWidth
                            required
                            error={!!errors.name}
                            helperText={errors.name ? errors.name.message : "Enter your full name"}
                            InputLabelProps={{ style: { color: "white" } }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <FaUserAlt color={highlightColor} style={{ marginRight: 8 }} />
                                </InputAdornment>
                              ),
                              style: { color: highlightColor },
                            }}
                          />
                        )}
                      />
                    </Tooltip>
                  </motion.div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <motion.div variants={fadeInVariant} initial="hidden" animate="visible" custom={0.6}>
                    <Tooltip title="Enter a 10-digit mobile number">
                      <Controller
                        name="phone"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Phone number is required",
                          pattern: {
                            value: /^\d{10}$/,
                            message: "Phone number must be exactly 10 digits",
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Phone Number"
                            fullWidth
                            required
                            error={!!errors.phone}
                            helperText={errors.phone ? errors.phone.message : "Exactly 10 digits"}
                            inputProps={{ maxLength: 10 }}
                            InputLabelProps={{ style: { color: "white" } }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <FaPhoneAlt color={highlightColor} style={{ marginRight: 8 }} />
                                </InputAdornment>
                              ),
                              style: { color: highlightColor },
                            }}
                          />
                        )}
                      />
                    </Tooltip>
                  </motion.div>
                </Grid>
              </Grid>

              <motion.div variants={fadeInVariant} initial="hidden" animate="visible" custom={1}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: "white" }}>Select a Service</InputLabel>
                  <Select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    sx={{
                      color: "white",
                      ".MuiOutlinedInput-notchedOutline": { borderColor: highlightColor },
                      "& .MuiSvgIcon-root": { color: highlightColor },
                    }}
                  >
                    <MenuItem value="cleaning_checkups">Teeth Cleanings & Check Ups</MenuItem>
                    <MenuItem value="dental_work">Dental Work</MenuItem>
                    <MenuItem value="whitening">Teeth Whitening</MenuItem>
                    <MenuItem value="straightening">Teeth Straightening</MenuItem>
                    <MenuItem value="veneers">Veneers</MenuItem>
                    <MenuItem value="implants">Implants</MenuItem>
                    <MenuItem value="emergencies">Emergencies</MenuItem>
                  </Select>
                </FormControl>
              </motion.div>

              <motion.div variants={fadeInVariant} initial="hidden" animate="visible" custom={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Preferred Date"
                    value={preferredDate}
                    onChange={(newValue) => setPreferredDate(newValue)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        InputLabelProps: { style: { color: "white" } },
                        InputProps: { style: { color: highlightColor } },
                      },
                    }}
                  />
                </LocalizationProvider>
              </motion.div>

              <motion.div variants={fadeInVariant} initial="hidden" animate="visible" custom={3}>
                <Paper elevation={0} sx={{ p: 3, backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 3 }}>
                  <Tooltip title="Select a time that suits you best">
                    <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ color: "white" }}>
                      Choose a Time Slot
                    </Typography>
                  </Tooltip>
                  <Grid container spacing={2}>
                    {timeSlots.map((slot) => (
                      <Grid item xs={4} sm={3} key={slot}>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            fullWidth
                            variant={selectedTime === slot ? "contained" : "outlined"}
                            onClick={() => setSelectedTime(slot)}
                            sx={{
                              borderRadius: 3,
                              textTransform: "none",
                              fontWeight: "bold",
                              backgroundColor: selectedTime === slot ? "#5E5143" : "transparent",
                              color: highlightColor,
                              borderColor: highlightColor,
                              "&:hover": {
                                backgroundColor: "#7B6A55",
                              },
                            }}
                          >
                            {slot}
                          </Button>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit(onSubmit => saveAppointment(onSubmit))}
                  sx={{
                    paddingY: 1.5,
                    fontWeight: "bold",
                    fontSize: "1rem",
                    background: "linear-gradient(to right, #3E362E, #5E5143)",
                    color: highlightColor,
                    "&:hover": {
                      background: highlightColor,
                      color: "#000",
                      boxShadow: `0 0 20px ${highlightColor}`,
                    },
                  }}
                >
                  Confirm Appointment
                </Button>
              </motion.div>

              {isUpdate && (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleUpdate}
                    sx={{
                      mt: 2,
                      paddingY: 1.5,
                      fontWeight: "bold",
                      fontSize: "1rem",
                      borderColor: highlightColor,
                      color: highlightColor,
                      "&:hover": {
                        background: highlightColor,
                        color: "#000",
                      },
                    }}
                  >
                    Update Appointment
                  </Button>
                </motion.div>
              )}
            </Stack>
          </Container>
        </motion.div>
      </Box>
      <ToastContainer position="top-center" />
    </>
  );
};

export default BookAppointment;