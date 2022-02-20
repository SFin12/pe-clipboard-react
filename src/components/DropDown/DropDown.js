import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Button, CardBody, Card } from "reactstrap";
import Collapse from "reactstrap/lib/Collapse";

import "./DropDown.scss";

export class DropDownHover extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { showHelp: false };
    }

    toggle(e) {
        if (e.type === "mouseenter") {
            this.setState({ showHelp: true });
        } else if (e.type === "click") {
            this.setState({ showHelp: !this.state.showHelp });
        } else {
            this.setState({ showHelp: false });
        }

        e.type === "mouseenter" || e.type === "click"
            ? this.setState({ showHelp: true })
            : this.setState({ showHelp: false });
    }

    render() {
        return (
            <div>
                <Button
                    color="dark"
                    onMouseEnter={this.toggle}
                    onMouseLeave={this.toggle}
                    onClick={this.toggle}
                    style={{ marginBottom: "1rem" }}
                >
                    {this.props.buttonTitle}{" "}
                    <FontAwesomeIcon icon={faCaretDown} />
                </Button>
                <Collapse isOpen={this.state.showHelp}>
                    <Card color="dark" inverse>
                        <CardBody>{this.props.content}</CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }
}
export class DropDownClick extends DropDownHover {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { showHelp: false };
    }

    toggle(e) {
        this.setState({ showHelp: !this.state.showHelp });
        this.props.toggleDelete();
    }

    render() {
        return (
            <div>
                <Button
                    color="dark"
                    onClick={this.toggle}
                    style={{ marginBottom: "1rem" }}
                >
                    {this.props.buttonTitle}{" "}
                    <FontAwesomeIcon icon={faCaretDown} />
                </Button>
                <Collapse isOpen={this.state.showHelp}>
                    <Card color="dark" inverse>
                        <CardBody>{this.props.content}</CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }
}
