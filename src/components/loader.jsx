import Box from "@mui/material/Box";
import HashLoader from "react-spinners/HashLoader";

const Loader = ({color, loading}) => {         
  return (
   <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <HashLoader color={color} loading={loading} size={50}/>
      </Box> 
  );
}
export default Loader;