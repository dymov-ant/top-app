import { FooterProps } from "./Footer.props";

export const Footer = (props: FooterProps): JSX.Element => {
  return (
    <footer { ...props }>
      Footer
    </footer>
  );
};