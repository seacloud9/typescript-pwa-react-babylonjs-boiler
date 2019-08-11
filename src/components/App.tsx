import * as React from "react";
import { hot } from "react-hot-loader";
import Sputnik from "./demo/Sputnik";

const reactLogo = require("./../assets/img/react_logo.svg");

class App extends React.Component<{}, undefined> {
    public render() {
        return (
            <Sputnik />
        );
    }
}

declare let module: object;

export default hot(module)(App);
