// Import core
import { useState } from 'react'
// Improt third prats
import { Form, Row, Col, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { AuthService, TodoService } from 'services';
import { useAddUser } from 'store/user/userhooks';
import { useAddInitialTask } from 'store/todo/todoHooks';
import CardComponent from 'components/CardComponent';
import './styles.scss';


const LoginPageComponent = () => {
  const navigate = useNavigate();
  const addUser = useAddUser();
  const addIntialTasks = useAddInitialTask();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = (data) => {
    AuthService.login(data)
      .then(res => {
        setLoading(true)
        if (res) {
          addUser(res);
          TodoService.getAllTodoList({ id: res.id })
            .then(data => {
              addIntialTasks(data)
            })
          setLoading(false);
          navigate('/')
        }
      })
      .catch((err) => {
        setError('User not found or password not correct.')
        console.log(err);
        setLoading(false);
      });
  }
  return (
    <div>
      <CardComponent header={'Welcome back!'} subheader={'Log in to continue.'} >
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
                  rules={[{ required: true, message: 'Please enter your Password' }]}
                >
                  <Input.Password
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
              </Col>
            </Row>
            <p className='register-link'><Link to={'/register'} className="menulink">
              Don’t have an account? Sign up.
            </Link></p>
            <div className='button-container' style={{ textAlign: 'center' }}>
              <div style={{ color: '#F44336' }}> {error} </div>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-btn mt-1"
                disabled={loading}
              >
                Log In
              </Button>
            </div>
          </Form>
        </div>
      </CardComponent>
    </div>
  )
}

export default LoginPageComponent;