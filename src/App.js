import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function App() {
  const useStyles = makeStyles({
    table: {
      minWidth: 650
    },
  });
 
  const classes = useStyles();

  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch('https://api.thevirustracker.com/free-api?countryTimeline=ID')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setRows(data.timelineitems[0]);
      })
  }, []); // ini sekali dijalanin saat aplikasi diload

  return (
    <TableContainer component={Paper}>
      <Table className={ classes.table } aria-label="Corona Table">
        <TableHead>
          <TableRow>
            <TableCell>Tanggal</TableCell>
            <TableCell>Total Cases</TableCell>
            <TableCell>Total Recoveries</TableCell>
            <TableCell>Total Deaths</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            Object.keys(rows).map(key => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{rows[key].total_cases}</TableCell>
                <TableCell>{rows[key].total_recoveries}</TableCell>
                <TableCell>{rows[key].total_deaths}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default App;