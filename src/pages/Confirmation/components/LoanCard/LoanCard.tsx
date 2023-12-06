import { Box, Button, Divider, IconButton } from "@mui/material";
import {
  StyledCarDetails,
  StyledCarMileage,
  StyledCarName,
  StyledCard,
  StyledImage,
  StyledLenderName,
  StyledMonthlyFee,
  StyledTimeAndAPR,
} from "./LoanCard.styles";
import { AvailableLoanType } from "../../../../hooks";
import { MoreVert } from "@mui/icons-material";

export const LoanCard = ({ data }: { data: AvailableLoanType }) => {
  return (
    <StyledCard>
      <div>
        <StyledLenderName>{data.lender}</StyledLenderName>
        <StyledMonthlyFee>${data.monthlyPayments}/month</StyledMonthlyFee>
      </div>
      <Divider />

      <StyledCarDetails>
        <StyledImage
          src={data.automobile.imageSource}
          alt={data.automobile.model}
        />

        <Box flex={1}>
          <StyledCarName>{data.automobile.model}</StyledCarName>
          <StyledCarMileage>
            estimated <strong>{data.automobile.mileage}mi</strong>
          </StyledCarMileage>
        </Box>

        <IconButton>
          <MoreVert />
        </IconButton>
      </StyledCarDetails>
      <Divider />

      <StyledTimeAndAPR>
        APR
        <strong>{data.apr}%</strong>
      </StyledTimeAndAPR>
      <Divider />

      <StyledTimeAndAPR>
        Time remaining
        <strong>{data.remainingMonths}mo</strong>
      </StyledTimeAndAPR>
      <Divider />

      <Button
        color="info"
        variant="contained"
        sx={{ borderRadius: 2, width: "calc(100% - 32px)", margin: 2 }}
      >
        START SAVING
      </Button>
    </StyledCard>
  );
};
