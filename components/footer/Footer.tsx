import FooterLink from './FooterLink';

const Footer = () => {
  return (
    <footer className="bg-color-secondary py-8">
      <ul className="container flex items-center justify-between">
        <FooterLink
          link="https://nextjs.org/"
          title="Made with Next.js"
          icon="code"
        />

        <FooterLink
          link="https://github.com/Rostyk27/nextjs-shop"
          title="Source code"
          icon="deployed_code"
        />
      </ul>
    </footer>
  );
};

export default Footer;
