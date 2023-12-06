import { Box, Button, Typography } from "@mui/material";
import { useHome } from "../../hooks";
import { Form, LoanAdditionalInfo } from "./components";

// ToDo: create styles file

export const Home = () => {
  const {
    hasApiError,
    loanData,
    loanExtraData,
    loanPurposeOptions,
    loanTermsOptions,
    onFieldChange,
    onSubmit,
  } = useHome();

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
        <Form
          loanData={loanData}
          loanPurposeOptions={loanPurposeOptions}
          loanTermsOptions={loanTermsOptions}
          onFieldChange={onFieldChange}
        />

        <LoanAdditionalInfo loanExtraData={loanExtraData} />

        <Typography fontSize={12} textAlign="justify" color="#666666">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente
          cumque maxime recusandae dolores praesentium tempora quos dolorem,
          totam odit mollitia quaerat autem reiciendis dicta ut quibusdam sequi
          repellat dolor perspiciatis officia possimus modi ex id. Non eligendi
          ipsam nostrum provident, velit praesentium adipisci quaerat mollitia
          facilis ut culpa quas molestiae.
        </Typography>

        <Box display="flex" flexDirection="column" justifyContent="center">
          <Button
            color="info"
            variant="contained"
            sx={{ borderRadius: 16, padding: 2 }}
            onClick={onSubmit}
            disabled={!Object.values(loanData).every(Boolean)}
          >
            SUBMIT APPLICATION
          </Button>
          {hasApiError && (
            <Typography variant="caption" color="red">
              There has been an error. Try again later.
            </Typography>
          )}
        </Box>
      </Box>
    </div>
  );
};
