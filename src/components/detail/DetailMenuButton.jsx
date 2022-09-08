import { Button } from "@mui/material";

const DetailMenuButton = ({ children, ...props }) => {
  return (
    <Button sx={{ margin: "1rem", border: "1px solid #eee" }} {...props}>
      {children}
    </Button>
  );
};

export default DetailMenuButton;
