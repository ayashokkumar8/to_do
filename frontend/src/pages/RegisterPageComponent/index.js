// Import core
import { useState } from 'react'
// Improt third prats
import { Form, Row, Col, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from 'services';
import CardComponent from 'components/CardComponent';



const RegisterPageComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = (data) => {
    AuthService.register(data)
      .then(res => {
        setLoading(true)
        if (res === 'ok') {
          setLoading(false);
          navigate('/login')
        }
      })
      .catch((err) => {
        setError('User not found or not authorized.')
        console.log(err);
        setLoading(false);
      });
  }
  return (
    <div>
      <CardComponent header={'Welcome!'} subheader={'Sign up to start using Simple do today.'} >
        <div>
          <Form
            layout="vertical"
            requiredMark={"optional"}
            className="create-account-form mt-5"
            onFinish={handleSubmit}
          >
            <Row gutter={[10, 10]}>
              <Col span={24}>
                <Form.Item
                  name="fullname"
                  rules={[{ required: true, message: 'Please enter your Full name' }]}
                >
                  <Input placeholder="Full Name" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: 'E-mail Not valid!',
                    },
                    {
                      required: true,
                      message: 'Please enter your E-mail!',
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
              <Col span={24} className="my-1">
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please enter your Password' },
                  {
                    pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'),
                    message: 'Password must contain at least one lowercase letter, uppercase letter, number, and special character'
                  }]}
                >
                  <Input.Password
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
              </Col>
            </Row>
            <p className='register-link'><Link to={'/login'} className="menulink">
              Do have an account? Sign in.
            </Link></p>
            <div className='button-container' style={{ textAlign: 'center' }}>
              <div style={{ color: '#F44336' }}> {error} </div>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-btn mt-1"
                disabled={loading}
              >
                Sign Up
              </Button>
            </div>
          </Form>
        </div>
      </CardComponent>
    </div>
  );
}

export default RegisterPageComponent;