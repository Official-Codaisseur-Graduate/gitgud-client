
import React, { Component } from 'react'
import 'react-accessible-accordion/dist/fancy-example.css'
import './Accordion.css'

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton
} from 'react-accessible-accordion';

export default class RepoAccordion extends Component {

  render() {
    return (
      <Accordion allowZeroExpanded='true' >
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              {this.props.button}
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p className="accordion__content">
              {this.props.panel}
                  </p>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    );
  }
}