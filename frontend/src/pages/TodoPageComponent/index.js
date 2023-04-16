// Import core
import { useState, useEffect } from 'react'
// Improt third prats
import {  Row, Col, Input, Typography, Checkbox } from 'antd';
import { TodoService } from 'services';
import { useUserStore } from 'store/user/userhooks';
import { useAddNewTask, useUpdateTask, useDeleteTask, useTodoStore } from 'store/todo/todoHooks';
import CardComponent from 'components/CardComponent';
import deleteIcon from 'assets/images/delete.svg';
import './styles.scss';

const { Paragraph } = Typography;

const TodoPageComponent = () => {
  const userInfo = useUserStore();
  const todoInfo = useTodoStore();
  const addNewTask = useAddNewTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const [todoList, setTodoList] = useState(todoInfo);
  const [selectedOption, setSelectedOption] = useState('All');
  const showOptions = ['All', 'Completed', 'Incompleted'];

  useEffect(() => {
    setTodoList(todoInfo);
    handleSeletctShowOption(selectedOption);
  }, [todoInfo]);

  const handleSeletctShowOption = (option) => {
    setSelectedOption(option)
    if (option === 'All') {
      setTodoList(todoInfo)
    } else if (option === 'Completed') {
      const filtered_todoInfo = todoInfo.filter(task => task.status === true);
      setTodoList(filtered_todoInfo);

    } else if (option === 'Incompleted') {
      const filtered_todoInfo = todoInfo.filter(task => !task.status);
      setTodoList(filtered_todoInfo);
    }

  };

  const onChange = (task, e) => {
    handleUpdateTask(task, e);

  };

  const handleAddTask = (e) => {
    const data = {
      title: e,
      status: false,
      UserId: userInfo.id,
    };
    TodoService.addTask(data)
      .then(res => {
        if (res) {
          addNewTask(res);
        };
      })
      .catch(e => {
        console.log(e);
      })
  }

  const handleUpdateTask = (task, status) => {
    const data = {
      ...task,
      status: status,
    };
    TodoService.updateTask(task.id, data)
      .then(res => {
        if (res.message === 'success') {
          updateTask(data);

        };
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleDeleteTask = (id) => {
    TodoService.deleteTask(id)
      .then(res => {
        if (res.data === 'ok') {

          deleteTask({ id: id })
        };
      })
      .catch(e => {
        console.log(e);
      });
  };


  return (
    <div>
      <CardComponent header={'Todo List'} subheader={''} >
        <Input placeholder="Add a new todo" className=' mt-5' allowClear onPressEnter={(e) => handleAddTask(e.target.value)} />
        <div className='task-container mt-2'>
          {todoList && todoList.map(task => (
            <div className='' key={task.id}>
              <Row gutter={[10, 10]} className='mt-1'>
                <Col span={3}>
                  <Checkbox className='task-checkbox' defaultChecked={task.status} onChange={(e) => onChange(task, e.target.checked)} />
                </Col>
                <Col span={18}>
                  <Paragraph className='task-text'>{task.title}</Paragraph>
                </Col>
                <Col span={3}>
                  <img alt='' className='task-delete' src={deleteIcon} onClick={() => handleDeleteTask(task.id)} />
                </Col>
              </Row>
            </div>

          ))}
        </div>
        <div className='toggle-container d-flex'>
          <p className='option-heading'>Show:</p>
          {showOptions && showOptions.map(option => (
            <p className={`show-option ${selectedOption === option ? 'show-option-active' : ''}`} key={option} onClick={() => handleSeletctShowOption(option)}>{option}</p>
          ))}
        </div>
      </CardComponent>
    </div>
  )
}

export default TodoPageComponent;