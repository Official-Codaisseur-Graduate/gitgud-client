import React, { Component } from "react";
import "react-accessible-accordion/dist/fancy-example.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton
} from "react-accessible-accordion";
import "./Accordion.css";

export default class RepoAccordion extends Component {
  render() {
    return (
      <Accordion allowMultipleExpanded="false" allowZeroExpanded="true">
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>{this.props.button}</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p className="accordion__content">
              {this.props.panel}
              <p>{this.props.link}</p>
            </p>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    );
  }
}
