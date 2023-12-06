import { CircularProgress } from "@mui/material";
import { CheckOutlined, Paid } from "@mui/icons-material";

import {
  StyledDivider,
  StyledHeader,
  StyledHeaderContent,
  StyledIconContainer,
  StyledLoanList,
  StyledParagraph,
  StyledSavingsHeader,
  StyledSavingsPill,
  StyledThanksMessage,
} from "./Confirmation.styles";
import { useConfirmationData } from "../../hooks";
import { LoanCard } from "./components";

export const Confirmation = () => {
  const { isLoading, loansAvailable } = useConfirmationData();

  return (
    <div>
      <StyledHeader>
        <StyledHeaderContent>
          <StyledIconContainer>
            <CheckOutlined />
          </StyledIconContainer>

          <StyledThanksMessage>Thank you!</StyledThanksMessage>

          <p>
            A loan officer will reach out to you shortly. If you have any
            questions please reach us at (202) 555-0139.
          </p>

          <span>Want to speed up the process?</span>
        </StyledHeaderContent>
      </StyledHeader>

      <StyledSavingsHeader>
        <StyledDivider />
        <StyledSavingsPill>
          <Paid /> SAVINGS AVAILABLE
        </StyledSavingsPill>
        <StyledDivider />
      </StyledSavingsHeader>

      <StyledParagraph>
        <strong>You could be saving money</strong>
        on your existing loans.
      </StyledParagraph>

      <StyledLoanList>
        {isLoading ? (
          <CircularProgress />
        ) : (
          loansAvailable.map((loan) => <LoanCard key={loan.id} data={loan} />)
        )}
      </StyledLoanList>
    </div>
  );
};
