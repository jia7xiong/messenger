import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold"
    }
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: "bold"
      },
      underline: {
        '&:hover:not($disabled):not($focused):not($error):before': {
            borderBottom: `2px solid #3A8DFF`
        }
      },
    }
  },
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: { main: "#B0B0B0" }
  }
});
