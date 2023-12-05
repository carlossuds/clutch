import { useCallback, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { NumericFormat } from "react-number-format";

const LOAN_PURPOSES = ["Debt Consolidation", "Personal", "API error"] as const;
const LOAN_TERM_OPTIONS = [12, 24, 36, 48];

type LoanDataType = {
  loanPurpose: (typeof LOAN_PURPOSES)[number] | null;
  amount: number | null;
  terms: number | null;
  monthlyPayments: number | null;
  apr: number | null;
};

const App = () => {
  const [loanData, setLoanData] = useState<LoanDataType>({
    loanPurpose: null,
    amount: null,
    terms: null,
    monthlyPayments: null,
    apr: null,
  });

  const fetchData = useCallback(async (payload: LoanDataType) => {
    console.log("fetching");
    try {
      const response = await fetch(
        "https://clutch-interview-service.herokuapp.com/offers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const { monthlyPayments, apr } = await response.json();
      setLoanData((data) => ({ ...data, monthlyPayments, apr }));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const { amount, loanPurpose, terms } = loanData;
    if (amount && loanPurpose && terms) {
      // ! Fix infinite calls
      (async () => await fetchData(loanData))();
    }
  }, [loanData, fetchData]);

  return (
    <div>
      <Box
        textAlign="center"
        color="#FFFFFF"
        bgcolor="#0288D1"
        p={2}
        fontWeight={700}
        fontSize={22}
      >
        Loan information
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        width={300}
        m="auto"
        gap={4}
        mt={6}
      >
        <FormControl required>
          <InputLabel htmlFor="loanPurpose">Loan purpose</InputLabel>
          <Select
            id="loanPurpose"
            value={loanData.loanPurpose}
            onChange={(e) =>
              setLoanData((data) => ({
                ...data,
                loanPurpose: e.target.value as (typeof LOAN_PURPOSES)[number],
              }))
            }
          >
            {Object.values(LOAN_PURPOSES).map((loanPurpose) => (
              <MenuItem key={loanPurpose} value={loanPurpose}>
                {loanPurpose}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl required>
          <InputLabel shrink={Boolean(loanData.amount)}>
            Total loan amount
          </InputLabel>
          <NumericFormat
            customInput={TextField}
            prefix="$"
            onValueChange={({ floatValue }) =>
              setLoanData((data) => ({
                ...data,
                amount: floatValue ? Math.abs(floatValue) : null,
              }))
            }
            value={loanData.amount}
          />
        </FormControl>

        <FormControl required>
          <InputLabel>Loan term (months)</InputLabel>
          <Select
            value={loanData.terms}
            onChange={(e) =>
              setLoanData((data) => ({
                ...data,
                terms: e.target.value as number,
              }))
            }
          >
            {LOAN_TERM_OPTIONS.map((terms) => (
              <MenuItem key={terms} value={terms}>
                {terms} months
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div>
          <Divider />
          <Box display="flex" justifyContent="space-between" mt={2} mb={1}>
            <span>Monthly payment</span>
            <strong>$ {loanData.monthlyPayments?.toFixed(2) || "-"}</strong>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="space-between" mt={2} mb={1}>
            <span>APR</span>
            <strong>{loanData.apr?.toFixed(2) || "-"} %</strong>
          </Box>
        </div>

        <Typography fontSize={12} textAlign="justify" color="#666666">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente
          cumque maxime recusandae dolores praesentium tempora quos dolorem,
          totam odit mollitia quaerat autem reiciendis dicta ut quibusdam sequi
          repellat dolor perspiciatis officia possimus modi ex id. Non eligendi
          ipsam nostrum provident, velit praesentium adipisci quaerat mollitia
          facilis ut culpa quas molestiae.
        </Typography>

        <Button
          color="info"
          variant="contained"
          sx={{ borderRadius: 16, padding: 2 }}
        >
          SUBMIT APPLICATION
        </Button>
      </Box>
    </div>
  );
};

export default App;
