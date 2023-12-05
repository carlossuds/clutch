import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import { useHome } from "../../../hooks";

type Props = Pick<
  ReturnType<typeof useHome>,
  "loanData" | "loanPurposeOptions" | "loanTermsOptions" | "onFieldChange"
>;

export const Form = ({
  loanData,
  loanPurposeOptions,
  loanTermsOptions,
  onFieldChange,
}: Props) => {
  return (
    <>
      <FormControl required>
        <InputLabel htmlFor="loanPurpose">Loan purpose</InputLabel>
        <Select
          id="loanPurpose"
          value={loanData.loanPurpose}
          onChange={(event) =>
            onFieldChange({
              field: "loanPurpose",
              value: event.target.value,
            })
          }
        >
          {loanPurposeOptions.map((loanPurpose) => (
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
          decimalScale={2}
          onValueChange={({ floatValue }) =>
            onFieldChange({
              field: "amount",
              value: floatValue ? Math.abs(floatValue) : null,
            })
          }
          value={loanData.amount}
        />
      </FormControl>

      <FormControl required>
        <InputLabel>Loan term (months)</InputLabel>
        <Select
          value={loanData.terms}
          onChange={(event) =>
            onFieldChange({
              field: "terms",
              value: event.target.value,
            })
          }
        >
          {loanTermsOptions.map((terms) => (
            <MenuItem key={terms} value={terms}>
              {terms} months
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
