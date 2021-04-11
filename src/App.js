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

const customers = [{
  'id':1,
  'image': 'http://placeimg.com/64/64/1', 
  'name': '홍길동',
  'birthday':'281479',
  'gender':'남자',
  'job':'직장인'
},
{
  'id':2,
  'image': 'http://placeimg.com/64/64/2', 
  'name': '홍길동',
  'birthday':'281472349',
  'gender':'남자',
  'job':'프로그래머'

},
{
  'id':3,
  'image': 'http://placeimg.com/64/64/3', 
  'name': '홍길동',
  'birthday':'281423479',
  'gender':'여자',
  'job':'학생'

}
]

class App extends Component {
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
              customers.map(c=> {
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
                })
          }
          </TableBody>
        </Table>
        
      </Paper>
      );
    
  }
}

export default withStyles(styles)(App);
