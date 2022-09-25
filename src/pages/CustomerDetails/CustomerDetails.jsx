import "./customerDetails.css";
import { CaretLeftOutlined } from "@ant-design/icons";
import logo from "../../images/logo.png";
import { Typography, Button } from "antd";
import CustomerDetailsForm from "../../components/CustomerDetailsForm/CustomerDetailsForm";
const CustomerDetails = () => {
  return (
    <div className="customer-details-outer">
      <div className="customer-details-card">
        <div className="customer-details-logo">
          <img alt="tnvisa_logo" src={logo} />
        </div>
        <Button
          className="back-button"
          type="secondary"
          shape="standard"
          sie="small"
          state="normal"
          title="back"
          id="back-btn"
        >
          <CaretLeftOutlined />
          <p>Back</p>
        </Button>
        <div className="customer-details-content">
          <Typography id="title">Help us get know you better</Typography>
          <Typography id="subtitle">
            Create your account for VISA application
          </Typography>
        </div>
        {/* CustomeDetailsForm components */}
        <CustomerDetailsForm />
      </div>
    </div>
  );
};

export default CustomerDetails;
