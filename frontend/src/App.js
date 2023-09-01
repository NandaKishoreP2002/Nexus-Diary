import { useState , useEffect } from 'react';
import Navbar from './components/common/Navbar';
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import Home from './components/Home';
import Newentry from './components/Newentry';
import Viewentry from './components/Viewentry';
import Viewmenu from './components/Viewmenu';
import NavbarLogin from './components/common/NavbarLogin';
import Login from './components/Login';
import Register from './components/Register';
import Edit from './components/Edit';



function Activelogin(...props) {
  console.log(props[0]);
  console.log("activeLogin");
  return (
    <Router>
        <Navbar logout={props[0].logout}/>
        <Switch>
          {console.log("inside switch")}
          <Route path="/" exact><Home data={props[0].data}></Home></Route>
          <Route path="/create"><Newentry data={props[0].data} login={props[0].login}></Newentry></Route>
          <Route path="/view" exact><Viewmenu data={props[0].data}></Viewmenu></Route>
          <Route path="/view/:id"><Viewentry data={props[0].data} login={props[0].login}></Viewentry></Route>
          <Route path="/edit" exact><Edit data={props[0].data} login={props[0].login}></Edit></Route>
          <Redirect to="/"></Redirect>
        </Switch>
      </Router>
  )
}

function NotActivelogin(...props) {
  console.log(props[0].login);
  console.log("NotactiveLogin");
  return (
    <Router>
        <NavbarLogin/>
        <Switch>
          <Route path="/login" exact><Login login={props[0].login}/></Route>
          <Route path="/register" exact><Register login={props[0].login}></Register></Route>
          <Redirect to="/login"></Redirect>
        </Switch>
      </Router>
  )
}

function App() {
  const [login,setlogin] = useState(false);
  const [data,setdata]=useState({})

  const logind = (data) => {
    console.log("inside logind---");
    console.log(data);
    localStorage.setItem('login',"true")
    localStorage.setItem('data',JSON.stringify(data));
    console.log(login);
    // setdata(() => {
    //   console.log(data);
    //   return data; 
    // });
    setdata(prev => {
      console.log(prev);
      return data;
    });
    console.log("logind not complete");
    setlogin(prev => {
      console.log(prev);
      return true;
    });
    console.log("logind complete");
  }

  const logoutd = () => {
    console.log("inside logoutd");
    localStorage.setItem('login',"false")
    localStorage.setItem('data',JSON.stringify({}))
    setlogin(prev => {
      return false;
    })
  }
  useEffect(() => {
    console.log("inside effect");
    if(localStorage.getItem('login')!=null)
    {
      if(localStorage.getItem('login')==="true")
      {
        setdata(prev => {
          return JSON.parse(localStorage.getItem('data'));
        });
        setlogin(prev => {
          return true;
        });
      }
    }
  },[])

  console.log(login);
  console.log(data);
  if(login)
  {
    console.log("inside login");
    return (
      <div className="app">
          {console.log("inside login div")}
          {console.log(data)}
          <Activelogin data={data} logout={logoutd} login={logind}/>
      </div>
    );
  }
  else {
    console.log("inside not active login");
    return (
      <div className="app">
          <NotActivelogin login={logind} />
      </div>
    );
  }
  
}

export default App;
