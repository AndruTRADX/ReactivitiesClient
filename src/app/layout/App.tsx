import { useState } from "react";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const { activities, isPending } = useActivities();

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find((x) => x.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  return (
    <Box sx={{ bgcolor: "#f9fafb", minHeight: "100vh" }}>
      <CssBaseline>
        <NavBar openForm={handleOpenForm} />

        <Container maxWidth="xl" sx={{ mt: 3 }}>
          {!activities || isPending ? (
            <Typography>Loading...</Typography>
          ) : (
            <ActivityDashboard
              activities={activities}
              selectedActivity={selectedActivity}
              editMode={editMode}
              selectActivity={handleSelectActivity}
              cancelSelectActivity={handleCancelSelectActivity}
              openForm={handleOpenForm}
              closeForm={handleFormClose}
            />
          )}
        </Container>
      </CssBaseline>
    </Box>
  );
}

export default App;
