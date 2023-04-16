import { useEffect } from 'react';
import { Layout, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import MainRoutes from 'routes';
import { AuthService } from 'services';
import { useUserStore, useClearUser } from 'store/user/userhooks';
import { useClearTasks } from 'store/todo/todoHooks';
import './styles.scss';

const { Content, Header } = Layout;

const LayoutComponent = () => {
    const navigate = useNavigate();
    const userInfo = useUserStore();
    const clearUser = useClearUser();
    const clearTasks = useClearTasks();

    useEffect(() => {
      }, [userInfo]);

    const handleLogout = () => {
        AuthService.logout();
        clearUser();
        clearTasks();
        navigate('/login')
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header className='layout-header'>
                <div className='header-container'>
                    {userInfo.length !== 0 &&
                        <Button className='logout-button' onClick={() => handleLogout()}>Log Out</Button>
                    }
                </div>
            </Header>
            <Content className='layout-content'>
                <MainRoutes />
            </Content>
        </Layout>
    )
}

export default LayoutComponent;