import React from "react";
import Suite from "../Suite/TestSuite";
import { Tab, Tabs, TabList, TabPanel } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css';
import TestCase from '../Suite/TestCase'


export default function Library() {
  return (
    <div>
      <Tabs
        defaultTab="one"
        onChange={(tabId) => { console.log(tabId) }}
        vertical={true}
      >
        <TabList>
          <Tab tabFor="one">Library 1</Tab>
          <Tab tabFor="two">Library 2</Tab>
          <Tab tabFor="three">Library 3</Tab>
        </TabList>
        <TabPanel tabId="one">
          <Suite/>
        </TabPanel>
        <TabPanel tabId="two">
          <Suite/>
        </TabPanel>
        <TabPanel tabId="three">
          <Suite/>
        </TabPanel>
      </Tabs>

      {/*<h5>Library</h5>*/}
      {/*<Suite />*/}
    </div>
  );
}
