import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";

// The Outlet component Specifies where the children are placed
function App() {
  const location = useLocation();

  return (
    <Box sx={{ bgcolor: "#f9fafb", minHeight: "100vh" }}>
      <CssBaseline>
        {location.pathname === "/" ? (
          <HomePage />
        ) : (
          <>
            <NavBar />
            <Container maxWidth="xl" sx={{ mt: 3 }}>
              <Outlet />
            </Container>
          </>
        )}
      </CssBaseline>
    </Box>
  );
}

export default App;
