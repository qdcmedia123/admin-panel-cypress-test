import React from "react";
import Login from "../Login";
import Root from '../../../Root';
import { shallow } from "enzyme";
React.useLayoutEffect = React.useEffect 

//https://testing-library.com/docs/example-react-router/

let wrapped;

beforeEach(() => {
    wrapped = shallow(
        <Root>
            <Login/>
        </Root>
    );
})


it("Login component renders without crashing", () => {
  expect(wrapped.render().text()).toContain('Sign In');
});
