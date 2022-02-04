import React from "react";
import { shallow, configure } from "enzyme";
import Sidebar from "./Sidebar.tsx";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const permissionsList =  [
  'VIEW_APPS',
  'VIEW_DEVICES',
  'VIEW_CUSTOMERS'
];

const eventHandlers = {
  routeTo: function () {
 //   console.log(this.type);
  }
};

describe("Sidebar", () => {
  it("should render correctly", () => {
    const SidebarComponent = (
      <Sidebar permissionsList={permissionsList} eventHandlers={eventHandlers} />
    );

    const component = shallow(SidebarComponent);
   // console.log(component.debug());
    expect(component.find("MenuItem").at(0).html()).toContain("Product Apps");
  });

  it("should show only 3 elements of the menu", () => {
    const SidebarComponent = (
      <Sidebar permissionsList={permissionsList} eventHandlers={eventHandlers} />
    );

    const component = shallow(SidebarComponent);
    // console.log(component.debug());
    expect(component.find("MenuItem").length).toBe(3);
  });
});
