import { Box, Link, styled, Paper } from "@mui/material";

const RefList = ({ links }) => {
  const LinkItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: theme.spacing(2),
  }));

  return (
    <Box>
      <h3>Reference List</h3>

      {links.map(({ refUrl }, index) => {
        return (
          <LinkItem key={index}>
            <Link href={refUrl}>{refUrl}</Link>
          </LinkItem>
        );
      })}
    </Box>
  );
};

export default RefList;
