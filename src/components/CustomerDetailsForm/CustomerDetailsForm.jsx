import "./customerDetailsForm.css";
import {
  UserOutlined,
  MailOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { Typography, Button, Form, Input } from "antd";

const CustomerDetailsForm = () => {
  return (
    <div className="details-form">
      <Form
        name="normal_login"
        className="details-form"
        initialValues={{
          remember: true,
        }}
      >
        <div className="customer-details-card-content">
          <div className="label">First Name</div>
          <Form.Item
            name="firstname"
            rules={[
              {
                required: true,
                message: "Please input your First Name!",
              },
            ]}
          >
            <Input
              type="username"
              id="name"
              placeholder="Enter Your First Name"
              required
              addonAfter={<UserOutlined />}
            />
          </Form.Item>
        </div>
        <div className="customer-details-card-content">
          <div className="label">Last Name</div>
          <Form.Item
            name="lastname"
            rules={[
              {
                required: true,
                message: "Please input your Last Name!",
              },
            ]}
          >
            <Input
              type="username"
              id="lastname"
              placeholder="Enter Your Last Name"
              required
              addonAfter={<UserOutlined />}
            />
          </Form.Item>
        </div>
        <div className="customer-details-card-content">
          <div className="label">Email</div>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              type="email"
              id="email"
              placeholder="abc@xyz.com"
              required
              addonAfter={<MailOutlined />}
            />
          </Form.Item>
        </div>

        <div className="customer-details-card-content">
          <div className="label">Phone Number</div>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your Contact Number!",
              },
            ]}
          >
            <Input
              type="text"
              id="contact-number"
              placeholder="+123456789"
              required
              addonAfter={<ContactsOutlined />}
            />
          </Form.Item>
        </div>
        <Form.Item>
          <Button
            className="eligibility-button"
            htmlType="submit"
            type="primary"
            size="large"
            shape="standard"
            state="normal"
            title="eligibility"
            id="eligibility-btn"
            block
          >
            <Typography>Check My Eligibility</Typography>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CustomerDetailsForm;
