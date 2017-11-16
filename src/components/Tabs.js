import React, { PureComponent } from 'react';
import Tabs from 'react-md/lib/Tabs/Tabs';
import Tab from 'react-md/lib/Tabs/Tab';
import TabsContainer from 'react-md/lib/Tabs/TabsContainer';
import Slider from 'react-md/lib/Sliders';

import CircularProgress from 'react-md/lib/Progress/CircularProgress';

export default class SimpleTabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { activeTabIndex: 0 };
    this._handleTabChange = this._handleTabChange.bind(this);
  }

  componentWillUnmount() {

  }

  _handleTabChange(activeTabIndex) {
    this.setState({ activeTabIndex });
  }

  render() {
    const { activeTabIndex } = this.state;

    return (
      <TabsContainer
        onTabChange={this._handleTabChange}
        activeTabIndex={activeTabIndex}
        panelClassName="md-grid" colored>
        <Tabs tabId="tab">
          <Tab label="Tab One">
            <h3 className="md-cell md-cell--12">Hello, World!</h3>
          </Tab>
          <Tab label="Tab Two">
            <h3 className="md-cell md-cell--12">Tab2</h3>
          </Tab>
        </Tabs>
      </TabsContainer>
    );
  }
}
