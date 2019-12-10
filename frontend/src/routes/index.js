import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Students from '~/pages/Students';
import Student from '~/pages/Student';
import Plans from '~/pages/Plans';
import Memberships from '~/pages/Memberships';
import HelpOrders from '~/pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" component={Students} isPrivate />
      <Route path="/student" component={Student} isPrivate />

      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/memberships" component={Memberships} isPrivate />
      <Route path="/help-orders" component={HelpOrders} isPrivate />
    </Switch>
  );
}
