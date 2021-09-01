import { useContext } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { AuthContext } from './_blocks/auth_context/AuthContext';
import { Loader } from '../_blocks'
import { Auth, Profile, TaskList } from '../pages';
import './style.scss';

const App = () => {
  const { token, tokenRequested } = useContext(AuthContext)
  return (
    <div className="App">
      {!tokenRequested
        ? <Loader />
        : token
          ? (
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={TaskList} />
                <Route exact path="/profile" component={Profile} />
                <Route path="*" component={() => <Redirect to="/" />} />
              </Switch>
            </BrowserRouter>
          )
          : <Auth tokenRequested={tokenRequested} />
      }
    </div>
  );
}

export default App;
