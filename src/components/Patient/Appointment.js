import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DateRangeIcon from "@mui/icons-material/DateRange";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.close}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.close}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {props?.appointment?.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ padding: "5rem" }}>
          <Typography variant="h5">Appointment Details</Typography>
          <hr />
          <Box
            sx={{
              minHeight: "93.2vh",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              gap: "30px",
              marginTop: "20px",
            }}
          >
            <Box className="appointment-info-item">
              <MailOutlineIcon fontSize="large" />
              <div className="appointment-details-title">
                <small className="text-muted">paitent email</small>
              </div>
              {props?.appointment?.email}
            </Box>
            <Box className="appointment-info-item">
              <FormatColorTextIcon fontSize="large" />
              <div className="appointment-details-title">
                <small className="text-muted">paitent full name</small>
              </div>
              {props?.appointment?.fullName}
            </Box>
            <Box className="appointment-info-item">
              <AccessTimeIcon fontSize="large" />
              <div className="appointment-details-title">
                <small className="text-muted">appointment time</small>
              </div>
              {props?.appointment?.time}
            </Box>
            <Box className="appointment-info-item">
              <DateRangeIcon fontSize="large" />
              <div className="appointment-details-title">
                <small className="text-muted">appointment date</small>
              </div>
              {props?.appointment?.date.split("T")[0]}
            </Box>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
