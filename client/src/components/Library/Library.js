import React from "react";
import Suite from "../Suite/TestSuite";
import { Tab, Tabs, TabList, TabPanel } from "react-web-tabs";
import { Link, Route } from "react-router-dom";

import "react-web-tabs/dist/react-web-tabs.css";

export default function Library() {
  return (
    <div>
      <p>Library</p>
      {/* <Link to="/project/1">Library1</Link>
      <Link to="/project/2">Library2</Link>
      <Link to="/project/3">Library3</Link>

      <Route
        path={`${this.props.match.url}/1`}
        render={props => {
          console.log("Project1");
          return <Library {...props} />;
        }}
      />
      <Route
        path={`${this.props.match.url}/2`}
        render={props => {
          console.log("Project2");
          return <Library {...props} />;
        }}
      />
      <Route
        path={`${this.props.match.url}/3`}
        render={props => {
          console.log("Project3");
          return <Library {...props} />;
        }}
      /> */}

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
    </div>
  );
}
