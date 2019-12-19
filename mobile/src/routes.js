import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignIn from './pages/SignIn';
import Checkins from './pages/Checkins';
import HelpOrder from './pages/HelpOrder';
import HelpOrderAnswered from './pages/HelpOrderAnswered';
import HelpOrders from './pages/HelpOrders';

export default createAppContainer(
  createSwitchNavigator({
    SignIn,
    Checkins,
    HelpOrder,
    HelpOrderAnswered,
    HelpOrders,
  })
);
