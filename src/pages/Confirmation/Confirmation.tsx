import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { CheckOutlined, Paid, MoreVert } from "@mui/icons-material";

import {
  StyledDivider,
  StyledHeader,
  StyledHeaderContent,
  StyledIconContainer,
  StyledLoanCard,
  StyledLoanList,
  StyledSavingsHeader,
  StyledSavingsPill,
  StyledThanksMessage,
  StyledTimeAndAPR,
} from "./Confirmation.styles";
import { useConfirmationData } from "../../hooks";

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

      <StyledLoanList>
        {isLoading ? (
          <CircularProgress />
        ) : (
          loansAvailable.map((loan) => (
            <StyledLoanCard key={loan.id}>
              <div>
                <Typography fontSize={16} textTransform="initial">
                  {loan.lender}
                </Typography>
                <Typography>${loan.monthlyPayments}/month</Typography>
              </div>
              <Divider />

              <div>
                <img
                  src={loan.automobile.imageSource}
                  alt={loan.automobile.model}
                />

                <Box>
                  <strong>{loan.automobile.model}</strong>
                  <span>
                    estimated <strong>{loan.automobile.mileage}mi</strong>
                  </span>
                </Box>

                <IconButton>
                  <MoreVert />
                </IconButton>
              </div>
              <Divider />

              <StyledTimeAndAPR>
                APR
                <strong>{loan.apr}%</strong>
              </StyledTimeAndAPR>
              <Divider />

              <StyledTimeAndAPR>
                Time remaining
                <strong>{loan.remainingMonths}mo</strong>
              </StyledTimeAndAPR>
              <Divider />

              <Button
                color="info"
                variant="contained"
                sx={{ borderRadius: 2, width: "calc(100% - 32px)", margin: 2 }}
              >
                START SAVING
              </Button>
            </StyledLoanCard>
          ))
        )}
      </StyledLoanList>
    </div>
  );
};
