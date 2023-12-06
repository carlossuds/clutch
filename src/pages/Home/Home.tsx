import { Button } from "@mui/material";
import { useHomeData } from "../../hooks";
import { Form, LoanAdditionalInfo } from "./components";
import {
  StyledButtonContainer,
  StyledErrorMessage,
  StyledHeader,
  StyledMain,
  StyledParagraph,
} from "./Home.styles";

export const Home = () => {
  const {
    hasApiError,
    loanData,
    loanExtraData,
    loanPurposeOptions,
    loanTermsOptions,
    onFieldChange,
    onSubmit,
  } = useHomeData();

  return (
    <div>
      <StyledHeader>Loan information</StyledHeader>

      <StyledMain>
        <Form
          loanData={loanData}
          loanPurposeOptions={loanPurposeOptions}
          loanTermsOptions={loanTermsOptions}
          onFieldChange={onFieldChange}
        />

        <LoanAdditionalInfo loanExtraData={loanExtraData} />

        <StyledParagraph>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente
          cumque maxime recusandae dolores praesentium tempora quos dolorem,
          totam odit mollitia quaerat autem reiciendis dicta ut quibusdam sequi
          repellat dolor perspiciatis officia possimus modi ex id. Non eligendi
          ipsam nostrum provident, velit praesentium adipisci quaerat mollitia
          facilis ut culpa quas molestiae.
        </StyledParagraph>

        <StyledButtonContainer>
          <Button
            color="info"
            variant="contained"
            sx={{ borderRadius: 16, padding: 2 }}
            onClick={onSubmit}
            disabled={!Object.values(loanExtraData).every(Boolean)}
          >
            SUBMIT APPLICATION
          </Button>
          {hasApiError && (
            <StyledErrorMessage>
              There has been an error. Try again later.
            </StyledErrorMessage>
          )}
        </StyledButtonContainer>
      </StyledMain>
    </div>
  );
};
