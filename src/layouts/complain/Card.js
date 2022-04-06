
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function DefaultInfoCard({ color, icon, comment, price, duration, complainType }) {
  return (
    <Card>
      <MDBox p={2} mx={3} display="flex" justifyContent="center">
        <MDBox
          display="grid"
          justifyContent="center"
          alignItems="center"
          bgColor={color}
          color="white"
          width="4rem"
          height="4rem"
          shadow="md"
          borderRadius="lg"
          variant="gradient"
        >
          <Icon fontSize="default">{icon}</Icon>
        </MDBox>
      </MDBox>
      <MDBox pb={2} px={2} textAlign="center" lineHeight={1.25}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Complain Type {complainType}
        </MDTypography>
        {comment && (
          <MDTypography variant="h6" color="text" fontWeight="regular">
            Comment: {comment}
          </MDTypography>
        )}
        {/* {price && !duration ? null : <Divider />} */}
        {duration && (
          <MDTypography variant="h6" color="text" fontWeight="regular" >
            Duration: {duration}
          </MDTypography>
        )}
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of DefaultInfoCard
DefaultInfoCard.defaultProps = {
  color: "info",
  duration: "",
  price: "",
};

// Typechecking props for the DefaultInfoCard
// DefaultInfoCard.propTypes = {
//   color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
//   icon: PropTypes.node.isRequired,
//   comment: PropTypes.string.isRequired,
//   // price: PropTypes.number,
//   duration: PropTypes.string,
// };

export default DefaultInfoCard;
