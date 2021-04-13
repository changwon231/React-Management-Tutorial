import logo from './logo.svg';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Customer from './components/Customer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { render } from '@testing-library/react';
import { Component } from 'react';

const styles = theme =>({
  root: {
    width: '100%',
    marginTop: theme.spacing (1),
    overflowX:"auto"
  }, 
  table: {
    minWidth: 1080
  }
})

// 왭 서비스가 동작 후 사용자의 요청에 따라 필요할 때 서버의 접근해 대이터를 가져올 수 있다.
class App extends Component {

  // 사용자의 요청에 따라 데이터가 변경될 때
  state = {
    customers:""
  }

  componentDidMount(){
    this.callApi()
    .then(res=> this.setState({customers: res}))
    .catch(err => console.log(err))
  }

  callApi = async() => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body
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
                }) : ""
          } 
          </TableBody>
        </Table>
        
      </Paper>
      );
    
  }
}

export default withStyles(styles)(App);
