import { Box } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        width: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignSelf: "center",
        margin: "0 auto",
      }}
    >
      {children}
    </Box>
  );
};

export default Layout;
