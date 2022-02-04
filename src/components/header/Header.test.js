import React from "react";
import { shallow, configure } from "enzyme";
import Header from "./Header";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Header", () => {
  it("should render correctly", () => {
    const HeaderComponent = (
      <Header
        username="test@vodafone.com"
        eventHandlers={() => {}}
      />
    );

    const component = shallow(HeaderComponent);

    expect(component.find("span").html()).toContain("test@vodafone.com");
  });
});
