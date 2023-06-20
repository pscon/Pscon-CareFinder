import Link from "next/link";
import { AiOutlineGithub, AiOutlineTwitter } from "react-icons/ai";
import { BsMedium } from "react-icons/bs";

function Footer() {
  return (
    <footer className="footer items-center p-4 mt-10 bg-neutral text-neutral-content">
      <div className="items-center grid-flow-col">
        <img src="/logo.png" className="w-10 h-10" alt="logo" />
        <p>Copyright © 2023 - All right reserved</p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <Link href="https://medium.com/@philipnwabuwa/carefinder-app-documentation-f93f5ba76eb6">
          <BsMedium className="w-7 h-7 hover:text-slate-400" />
        </Link>
        <Link href="https://github.com/Philip-Nwabuwa">
          <AiOutlineGithub className="w-7 h-7 hover:text-slate-400" />
        </Link>
        <Link href="https://twitter.com/JohnnyDev24?t=bK_mKb49HHN55RHsTh_teQ&s=09">
          <AiOutlineTwitter className="w-7 h-7 hover:text-blue-400" />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
