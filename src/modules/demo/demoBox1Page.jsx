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

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';

class DemoBoxPage extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    demo: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Box className="flex1">
        <Box direction="row" className="flexWrap">
          <Box className="flex1 pageBox min200x200">
            <b>Box</b>Row1 Col1 (min 200x200)
          </Box>
          <Box className="flex1 pageBox min200x200">
            <b>Box</b>Row1 Col2 (min 200x200)
          </Box>
          <Box className="flex1 pageBox min200x200">
            <b>Box</b>Row1 Col3 (min 200x200)
          </Box>
        </Box>
        <Box className="flex1 pageBox min200x400">
          <b>Box</b>Row2 (min 200x400)
          <br/>
          This page consists of a top-level Box (column) with 2 rows.
          The first (top) row contains 3 Boxes. The second (bottom) row contains
          a single expanding Box.
          <br/>
          Shrinking the page width results in the top row Boxes wrapping
          into a column and the bottom box shrinking until it overflows.
          <br/>
          Each Box should have similar background color and styling. There
          should be even gaps between the Boxes and between the Boxes and the
          page edges at all times.
        </Box>
      </Box>
    );
  }

}

const select = (state) => ({ demo: state.demo });

export default connect(select)(DemoBoxPage);
