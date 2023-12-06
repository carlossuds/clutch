import { Box, Divider } from "@mui/material";
import { useHomeData } from "../../../hooks";

type Props = Pick<ReturnType<typeof useHomeData>, "loanExtraData">;

export const LoanAdditionalInfo = ({ loanExtraData }: Props) => {
  return (
    <div>
      <Divider />
      <Box display="flex" justifyContent="space-between" mt={2} mb={1}>
        <span>Monthly payment</span>
        <strong>$ {loanExtraData.monthlyPayments?.toFixed(2) || "-"}</strong>
      </Box>
      <Divider />
      <Box display="flex" justifyContent="space-between" mt={2} mb={1}>
        <span>APR</span>
        <strong>{loanExtraData.apr?.toFixed(2) || "-"} %</strong>
      </Box>
    </div>
  );
};
