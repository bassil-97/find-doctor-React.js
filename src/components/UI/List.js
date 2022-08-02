import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import Appointment from "../Patient/Appointment";
import DeleteModal from "./DeleteModal";
import { useHttpClient } from "../../hooks/http-hook";

export default function CheckboxListSecondary({
  appointments,
  fetchAppointments,
}) {
  const [open, setOpen] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [appointment, setAppointment] = React.useState();
  const [appointmentId, setAppointmentId] = React.useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const handleClickOpen = (value) => {
    setAppointment(value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDelete = (id) => {
    setAppointmentId(id);
    setOpenDeleteModal(true);
  };

  const handleCloseDelete = () => {
    setOpenDeleteModal(false);
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/doctors/delete-appointment/${appointmentId}`
      );
    } catch (err) {}
    handleCloseDelete();
    fetchAppointments();
  };

  return (
    <React.Fragment>
      <Appointment open={open} close={handleClose} appointment={appointment} />
      <DeleteModal
        open={openDeleteModal}
        close={handleCloseDelete}
        delete={deleteAppointment}
        id={appointmentId}
      />
      <List
        dense
        sx={{
          width: "100%",
          maxWidth: 360,
          maxHeight: 360,
          bgcolor: "var(--sidebar-color)",
          marginTop: "15px",
          borderRadius: "10px",
        }}
        className="appointments-list"
      >
        {appointments.length > 0 ? (
          appointments.map((value) => {
            const labelId = `patients-list-secondary-label-${value.time}`;
            return (
              <ListItem
                key={value._id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => handleClickOpenDelete(value._id)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  sx={{ padding: "1rem" }}
                  onClick={() => handleClickOpen(value)}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: deepOrange[500],
                        color: "white !important",
                      }}
                    >
                      {value.fullName["0"].toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    id={labelId}
                    primary={value.fullName}
                    secondary={value.title}
                    sx={{
                      ".MuiListItemText-secondary": {
                        color: "var(--text-color)",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <p className="mb-0">you have no appointments</p>
          </div>
        )}
      </List>
    </React.Fragment>
  );
}
