import logo from './logo.svg';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Customer from './components/Customer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles';
import { render } from '@testing-library/react';
import { Component } from 'react';
//import { response } from 'express';



const styles = theme =>({
  root: {
    width: '100%',
    marginTop: theme.spacing (1),
    overflowX:"auto"
  }, 
  table: {
    minWidth: 1080
  },
  progress:{
    margin: theme.spacing.unit * 2
  }
})

/* react 라이브러리 순서

  1) constructor()

  2) componentWillMount()

  3) render()

  4) componentDidMount()

 */
/*

상태가 변할때 재구성 하기 위해 
우리는 상태만 잘 관리하면 된다.
  props or state => shouldComponentUpdate()

*/



// 왭 서비스가 동작 후 사용자의 요청에 따라 필요할 때 서버의 접근해 대이터를 가져올 수 있다.
class App extends Component {

  // 사용자의 요청에 따라 데이터가 변경될 때
  state = {
    customers:"",
    completed: 0 // < 프로그래스 바는 0 ~ 100 까지 정수로 그림을 나타내기 때문
  }

  componentDidMount(){
    this.timer = setInterval(this.progress, 20);
    this.callApi()
    .then(res=> this.setState({customers: res}))
    .catch(err => console.log(err))
  }

  callApi = async() => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body
  }

  progress = () => {
    const {completed} = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1});
  }


  // props 변경될 수 없는 데이터 일때
  render(){
    const { classes } = this.props;
      return (
        <Paper className={classes.root}>
        <Table className={classes.root}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.state.customers ? this.state.customers.map(c=> {
                return (
                  <Customer
                  key={c.id}
                  id={c.id}
                  image={c.image}
                  name={c.name}
                  birthday={c.birthday}
                  gender={c.gender}
                  job={c.job}
                  />  
                  );
                }) : // 로딩중일때
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                  </TableCell>
                </TableRow>
          } 
          </TableBody>
        </Table>
        
      </Paper>
      );
    
  }
}

export default withStyles(styles)(App);
