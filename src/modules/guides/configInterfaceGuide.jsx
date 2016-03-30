/*
 (C) Copyright 2015 Hewlett Packard Enterprise Development LP

    Licensed under the Apache License, Version 2.0 (the "License"); you may
    not use this file except in compliance with the License. You may obtain
    a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
    License for the specific language governing permissions and limitations
    under the License.
*/


import React from 'react';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import CfgIcon from 'grommet/components/icons/base/Configuration';


const MENU_TEXT = 'How to configure basic interface properties...';

const COMPONENT = (
  <Box pad={{horizontal: 'small'}}>
    <b>Configure basic interface properties</b>
    <ul>
      <li>Navigate to the page: <Anchor primary href="#/interface">Interfaces</Anchor></li>
      <li>To select an interface, click on a table row or select an interface box in the graphic.</li>
      <li>In the table header, click on the <CfgIcon/> which will now be enabled.</li>
      <li>In the edit slide-in panel, configure the inteface as desired.</li>
      <li>Click <b>OK</b> to deploy the changes or <b>X</b> to cancel.</li>
    </ul>
  </Box>
);

export default {
  MENU_TEXT,
  COMPONENT,
};
