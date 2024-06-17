// import * as React from "react";
// import Switch from "@mui/material/Switch";

// export default function RedSwitch() {
//   const [checked, setChecked] = React.useState(false);

//   const handleChange = (event) => {
//     setChecked(event.target.checked);
//   };

//   return (
//     <Switch
//       checked={checked}
//       onChange={handleChange}
//       sx={{
//         "& .MuiSwitch-switchBase.Mui-checked": {
//           color: "#E87042",
//           "&:hover": {
//             backgroundColor: "rgba(255, 0, 0, 0.08)",
//           },
//         },
//         "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
//           backgroundColor: "#E87042",
//         },
//       }}
//       inputProps={{ "aria-label": "controlled" }}
//     />
//   );
// }

import * as React from "react";
import Switch from "@mui/material/Switch";
import axios from "axios";

export default function DoneSwitch({ id, status, onStatusChange }) {
  const [checked, setChecked] = React.useState(status === "Done");

  const handleChange = (event) => {
    const newStatus = event.target.checked ? "Done" : "Pending"; // assuming "Pending" is the other status
    setChecked(event.target.checked);

    // Make API call to update status
    axios
      .put(`http://localhost:3001/maintenance/New_Mnt_Req/status/${id}`, {
        Mnt_Status: newStatus,
      })
      .then((response) => {
        console.log("Status updated");
        onStatusChange(id, newStatus); // notify parent component
      })
      .catch((error) => {
        console.error("There was an error updating the status!", error);
      });
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      sx={{
        "& .MuiSwitch-switchBase.Mui-checked": {
          color: "#E87042",
          "&:hover": {
            backgroundColor: "rgba(255, 0, 0, 0.08)",
          },
        },
        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
          backgroundColor: "#E87042",
        },
      }}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}
