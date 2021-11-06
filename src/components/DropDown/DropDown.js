import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Button, CardBody, Card } from "reactstrap";
import Collapse from "reactstrap/lib/Collapse";

import "./DropDown.scss";

class DropDown extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    toggle(e) {
        console.log(e.type)
        e.type === "mouseenter" || e.type === "click" ?
        this.setState({ collapse: true }) :
        this.setState({ collapse: false})
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
                    {this.props.buttonTitle} <FontAwesomeIcon icon={faCaretDown} />
                </Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card color="dark" inverse>
                        <CardBody>{this.props.content}</CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }
}

export default DropDown;
