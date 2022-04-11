import React from "react";
import { shallow } from "enzyme";
import Message from "./components/Message";

describe("Paragraph", () => {
  it("should render children inside a p tag", () => {
    const wrapper = shallow(
      <Message timestamp={"12345678"} message={"This is Uday"} user={"Uday"} />
    );
    const paragraph = wrapper.find("p");
    expect(paragraph).toHaveLength(1);
    expect(paragraph.text()).toEqual("This is Uday");
  });
});
