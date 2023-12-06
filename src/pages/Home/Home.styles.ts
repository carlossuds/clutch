import { CSSInterpolation, styled } from "@mui/material";

type ClassNames = [
  "Header",
  "Main",
  "Paragraph",
  "ButtonContainer",
  "ErrorMessage"
];

const Styles: Record<ClassNames[number], CSSInterpolation> = {
  Header: {
    textAlign: "center",
    color: "#FFFFFF",
    backgroundColor: "#0288D1",
    padding: 8,
    fontWeight: 700,
    fontSize: 22,
  },
  Main: {
    display: "flex",
    flexDirection: "column",
    width: 300,
    margin: "auto",
    gap: 16,
    marginTop: 24,
  },
  Paragraph: {
    fontSize: 12,
    textAlign: "justify",
    color: "#666666",
  },
  ButtonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  ErrorMessage: {
    fontSize: 12,
    color: "red",
  },
};

export const StyledHeader = styled("header")(() => Styles.Header);
export const StyledMain = styled("main")(() => Styles.Main);
export const StyledParagraph = styled("p")(() => Styles.Paragraph);
export const StyledButtonContainer = styled("div")(
  () => Styles.ButtonContainer
);
export const StyledErrorMessage = styled("span")(() => Styles.ErrorMessage);
