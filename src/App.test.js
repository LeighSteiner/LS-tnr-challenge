import React from "react";
import ReactDOM from "react-dom";

import { mount, configure, shallow } from "enzyme";
import { render } from "@testing-library/react";

import CustomNav from "./CustomNav";
import TopCardList from "./TopCardList";
import LowerResultList from "./LowerResultList";
import Search from './Search'
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


/*
	Normally, I'd want to add more thorough tests, 
	but given the time constraints, I focused on 
	getting the essential minimum of coverage with a suite of 
	snapshot tests to keep track of changes
*/

describe("snapshot suite", () => {
  it("CustomNav looks right", () => {
    const { container } = render(<CustomNav />);
    expect(container).toMatchSnapshot();
  });
   it("TopCardList looks right", () => {
    const { container } = render(<TopCardList articles={[]}/>);
    expect(container).toMatchSnapshot();
  });
  it("LowerResultList looks right", () => {
    const { container } = render(<LowerResultList  articles={[]} />);
    expect(container).toMatchSnapshot();
  });
  it("Search looks right", () => {
    const { container } = render(<Search />);
    expect(container).toMatchSnapshot();
  });
});