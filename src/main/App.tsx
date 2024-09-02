import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import { LoanComponent } from '../loananalysiscomponent/loananaylsis';
import './App.css';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import config from '../amplifyconfiguration.json';
import { createTodo, updateTodo, deleteTodo } from '../graphql/mutations';
import { listTodos } from '../graphql/queries';
Amplify.configure(config);

const client = generateClient();
function App() {

  async function tst(){
    const result = await client.graphql({
      query: createTodo,
      variables: {
        input: {
          name: 'My first todo!'
        }
      }
    });
  }
  tst();

  async function tt(){
    const result = await client.graphql({ query: listTodos });
console.log(result);
  }
  tt();

  return (
    <BrowserRouter>          
    <Navbar/>
    <Routes>
        <Route path="/home" />
        <Route path="/assets" />
        <Route path="/loans" element={<LoanComponent/>}  />
    </Routes>
    </BrowserRouter>
  );
}


export default App;
