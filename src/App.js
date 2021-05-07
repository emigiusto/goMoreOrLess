import React, { useEffect, useState } from 'react';
//Components
import CreateTripForm from './components/CreateTripForm/CreateTripForm';
import SearchTrip from './components/SearchTrip/SearchTrip';

//Routing
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Data managment
import firebase from './firebase'

function App() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  
  const fetchTrips = async () => {
    firebase 
      .firestore()
      .collection('trips')
      .onSnapshot(serverUpdate => {
          const updatedTrips = serverUpdate.docs.map(_doc =>{
            const data = _doc.data();
            data['id'] = _doc.id;
            return data
          });
          setTrips(updatedTrips)
      }); 
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SearchTrip trips={trips}></SearchTrip>
        </Route>
        <Route exact path="/createtrip" >
          <CreateTripForm></CreateTripForm>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
