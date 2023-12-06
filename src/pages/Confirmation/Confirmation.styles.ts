import { CSSInterpolation, Divider, styled } from "@mui/material";

type ClassNames = [
  "Header",
  "HeaderContent",
  "IconContainer",
  "ThanksMessage",
  "SavingsHeader",
  "SavingsPill",
  "Divider",
  "LoanList",
  "LoanCard",
  "TimeAndAPR"
];

const Styles: Record<ClassNames[number], CSSInterpolation> = {
  Header: {
    color: "#FFFFFF",
    backgroundColor: "#0288D1",
    padding: 16,
  },
  HeaderContent: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    width: 300,
    margin: "auto",
  },
  IconContainer: {
    border: "1px solid #FFFFFF",
    height: 60,
    width: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },
  ThanksMessage: {
    fontSize: 24,
    fontWeight: 700,
  },
  SavingsHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
  },
  SavingsPill: {
    display: "flex",
    gap: 4,
    backgroundColor: "#FFC941",
    color: "#fff",
    fontSize: 12,
    alignItems: "center",
    padding: "2px 4px",
    borderRadius: 24,
  },
  Divider: { width: "200px", color: "#888888" },
  LoanList: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 16,
    marginTop: 16,
  },
  LoanCard: {
    boxShadow: "0px 1px 3px #d6d6d6, 1px 1px 3px #d6d6d6, -1px 1px 3px #d6d6d6",
    borderRadius: 8,
    "& > div": {
      margin: 16,
    },
  },
  TimeAndAPR: {
    display: "flex",
    justifyContent: "space-between",
  },
};

export const StyledHeader = styled("header")(() => Styles.Header);
export const StyledHeaderContent = styled("div")(() => Styles.HeaderContent);
export const StyledIconContainer = styled("div")(() => Styles.IconContainer);
export const StyledThanksMessage = styled("h1")(() => Styles.ThanksMessage);
export const StyledSavingsHeader = styled("div")(() => Styles.SavingsHeader);
export const StyledSavingsPill = styled("div")(() => Styles.SavingsPill);
export const StyledDivider = styled(Divider)(() => Styles.Divider);
export const StyledLoanList = styled("ul")(() => Styles.LoanList);
export const StyledLoanCard = styled("li")(() => Styles.LoanCard);
export const StyledTimeAndAPR = styled("div")(() => Styles.TimeAndAPR);
