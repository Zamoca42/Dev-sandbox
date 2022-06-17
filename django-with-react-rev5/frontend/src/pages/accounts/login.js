import { useState } from "react";
import Axios from "axios";
import { Button, Checkbox, Form, Input } from 'antd';
import useLocalStorage from "utils/useLocalStorage";

export default function Login() {
    const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", "");
    const onFinish = (values) => {
        const { username, password } = values

        const data = { username, password};
        Axios.post("http://localhost:8000/accounts/token/", data);
        const {
            data: { token : jwtToken}
          } = response;
      }
      
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      }
      
      setJwtToken(jwtToken);
    
    return (
        <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
}

