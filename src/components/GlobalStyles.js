import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
     color: ${({ theme }) => theme.text};
     background-color: ${({ theme }) => theme.secondary};
    --primary: ${({ theme }) => theme.primary};
    --secondary: ${({ theme }) => theme.secondary};
    --accent: ${({ theme }) => theme.accent};
    --text: ${({ theme }) => theme.text};
    --thirdly: ${({ theme }) => theme.thirdly};
    --secondaryText : ${({ theme }) => theme.secondaryText};
      }
 
  `