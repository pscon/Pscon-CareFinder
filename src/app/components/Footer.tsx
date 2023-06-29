import Link from "next/link";
import { AiOutlineGithub, AiOutlineTwitter, AiOutlineLinkedin } from "react-icons/ai";

function Footer() {


  const date = new Date();
  const year = date.getFullYear();
  
  return (
    <footer className="footer  items-center p-4 mt-10 bg-[#08299B] text-neutral-content">
      <div className="items-center grid-flow-col gap-3">
      <Link href="/" className="flex justify-center items-center">
              <h2 className="font-signature pl-2 text-xl text-bold font-extrabold	">Pscon-Care Finder</h2>
            </Link>
      </div>
                    <p>Copyright © {year} - All right reserved</p>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <Link href="https://www.linkedin.com/in/ekunola-paul-42712b1aa/">
          <AiOutlineLinkedin className="w-7 h-7 hover:text-slate-400" />
        </Link>
        <Link href="https://github.com/pscon">
          <AiOutlineGithub className="w-7 h-7 hover:text-slate-400" />
        </Link>
        <Link href="https://twitter.com/PSCON3">
          <AiOutlineTwitter className="w-7 h-7 hover:text-blue-400" />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
