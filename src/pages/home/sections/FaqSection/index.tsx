import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { CaretDown, CaretUp } from "phosphor-react";
import styled from "styled-components";

const ExpandIcon = ({ expanded }: { expanded?: boolean }) => {
  return expanded ? (
    <CaretUp className="w-5 h-5" weight="bold" />
  ) : (
    <CaretDown className="w-5 h-5" weight="bold" />
  );
};

const StyledAccordion = styled(Accordion)`
  & .MuiAccordionSummary-root {
    min-height: 72px;
    padding: 0 16px;
  }

  & .MuiAccordionDetails-root {
    padding: 20px 16px;
  }
`;

export const FaqSection = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center h-full px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-6">Faq</h1>
      <div className="w-3/4">
        {/* MUI Accordions */}
        <StyledAccordion>
          <AccordionSummary expandIcon={<ExpandIcon />}>
            <span className="font-semibold">How much is the delivery cost?</span>
          </AccordionSummary>
          <AccordionDetails>
            <span>
              Delivery costs $3. However, delivery is free on orders over $25.
            </span>
          </AccordionDetails>
        </StyledAccordion>
        <StyledAccordion>
          <AccordionSummary expandIcon={<ExpandIcon />}>
            <span className="font-semibold">What are the delivery methods?</span>
          </AccordionSummary>
          <AccordionDetails>
            <span>
              We offer normal delivery service in Lebanon only.
            </span>
          </AccordionDetails>
        </StyledAccordion>
        <StyledAccordion>
          <AccordionSummary expandIcon={<ExpandIcon />}>
            <span className="font-semibold">How to find out the availability of goods in the store?</span>
          </AccordionSummary>
          <AccordionDetails>
            <span>
              Out of stock products are clearly marked with an "Out of Stock" label, so you can easily see which items are currently available.
            </span>
          </AccordionDetails>
        </StyledAccordion>
        <StyledAccordion>
          <AccordionSummary expandIcon={<ExpandIcon />}>
            <span className="font-semibold">How to place an order in an online store?</span>
          </AccordionSummary>
          <AccordionDetails>
            <span>
              To place an order, simply choose your desired product, click "Buy Now", proceed to the checkout page, fill in your delivery details, and click "Complete Order" to finalize your purchase.
            </span>
          </AccordionDetails>
        </StyledAccordion>
      </div>
    </div>
  );
};