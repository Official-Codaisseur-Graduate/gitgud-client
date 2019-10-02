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

  highlited = () => {
    const arr = this.props.button.split(' ')
    const score = Number(arr[arr.length-1])
    if (score === 0) {
      return 'highlited'
    }
    return ''
  }

  render() {
    return (
      <Accordion allowMultipleExpanded="false" allowZeroExpanded="true">
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton className={`accordion__button ${this.highlited()}`}>{this.props.button}</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div className="accordion__content">
              {this.props.panel}
              <p>{this.props.link}</p>
            </div>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    );
  }
}
