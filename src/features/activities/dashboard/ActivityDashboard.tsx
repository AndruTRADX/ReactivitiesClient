import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";

export default function ActivityDashboard() {

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={7}>
        <ActivityList />
      </Grid2>
      <Grid2 size={5}>
        Activity filter go here
      </Grid2>
    </Grid2>
  );
}
