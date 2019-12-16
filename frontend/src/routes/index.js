import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Students from '~/pages/Students';
import Student from '~/pages/Student';

import Plans from '~/pages/Plans';
import Plan from '~/pages/Plan';

import Memberships from '~/pages/Memberships';
import Membership from '~/pages/Membership';

import HelpOrders from '~/pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" component={Students} isPrivate />
      <Route path="/student" component={Student} isPrivate />

      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/plan" component={Plan} isPrivate />

      <Route path="/memberships" component={Memberships} isPrivate />
      <Route path="/membership" component={Membership} isPrivate />

      <Route path="/help-orders" component={HelpOrders} isPrivate />
    </Switch>
  );
}
