import { Routes, Route } from 'react-router-dom';

import AuxList from './base/components/aux/AuxList';
import Home from './base/components/Home';
import Session from './base/components/Session';
import Report from './base/components/report/Report';

function AppRoutes() {


  return (
    <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="/role" element={ <AuxList table="role" /> } />
      <Route path="/tenant" element={ <AuxList table="tenant" /> } />
      <Route path="/setting" element={ <AuxList table="setting" /> } />
      <Route path="/user" element={ <AuxList table="user" /> } />
      <Route path="/country" element={ <AuxList table="country" /> } />
      <Route path="/currency" element={ <AuxList table="currency" /> } />
      <Route path="/report/chart_accounts" element={ <Report name="chart_accounts" /> } />
      <Route path="/report/journal" element={ <Report name="journal" /> } />
      <Route path="/report/general_ledger" element={ <Report name="general_ledger" /> } />
      <Route path="/report/trial_balance" element={ <Report name="trial_balance" /> } />
      <Route path='/session' element={ <Session /> } />
    </Routes>
    )
};

export default AppRoutes;
