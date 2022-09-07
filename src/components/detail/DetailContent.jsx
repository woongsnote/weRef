import { Box, Grid, styled, Paper } from "@mui/material";
import Image from "mui-image";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import RefList from "./RefList";

const DetailContent = ({ title, imageUrl, description, likes, links }) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const LikeItem = styled(Item)`
    margin-top: 1rem;
    align-items: center;
    justify-content: center;
    font-size: x-large;
    display: flex;
    color: pink;
  `;

  return (
    <Box sx={{ border: "1px solid #eee" }} m={2} p={3} borderRadius={2}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item>
            <Image src={imageUrl} alt="description" />
          </Item>
          <LikeItem>
            <FavoriteRoundedIcon />
            {likes}
          </LikeItem>
        </Grid>
        <Grid item xs={8}>
          <Item>
            <h2>{title}</h2>
          </Item>
          <RefList links={links} />
        </Grid>
      </Grid>
      <Item>{description}</Item>
    </Box>
  );
};

export default DetailContent;
