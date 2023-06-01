type FooterLinkProps = {
  link: string;
  title: string;
  icon: string;
};

const FooterLink = ({ link, title, icon }: FooterLinkProps) => {
  return (
    <li>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-color-primary"
      >
        <small className="flex items-center">
          {title}
          <span className="material-symbols-rounded ml-1.5 text-[20px]">
            {icon}
          </span>
        </small>
      </a>
    </li>
  );
};

export default FooterLink;
