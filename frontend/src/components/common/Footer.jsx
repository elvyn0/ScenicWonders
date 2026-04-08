import { assets } from "../../assets/assets";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  const today = new Date();
  return (
    <div className="flex flex-col text-sm ">
      {/* Footer logo */}
      <div>
        <hr className="text-gray-500" />
        <div className="font-bold pl-5 flex flex-row gap-2 items-center mt-3">
          <img src={assets.sw_logo} className="size-8" />
          <h5 className="font-bold ">Scenic Wonders</h5>
        </div>

        {/* Company deatiles */}
        <div className="flex flex-col gap-6 md:gap-2 text-left md:flex-row justify-between items-start md:items-center p-6 md:p-10">
          {/* Company */}
          <div className="flex flex-col items-start w-full md:w-auto">
            <p className="font-bold text-lg">Company</p>
            <ul className="flex flex-col gap-2">
              <li>About</li>
              <li>Privacy policy</li>
              <li>Security</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-start w-full md:w-auto">
            <p className="font-bold text-lg">Contact Us</p>
            <ul className="flex flex-col gap-2">
              <li>Help/FAQ</li>
              <li>scenicwonders@gmail.com</li>
              <li>+1-400-020-5287</li>
            </ul>
          </div>

          {/* Social */}
          <div className="hidden  md:flex flex-col items-start md:items-center w-full md:w-auto">
            <p className="font-bold text-lg">Follow Us</p>
            <div className="flex gap-4 mt-2">
              <FaFacebook size={30} />
              <FaTwitter size={30} />
              <FaInstagram size={30} />
              <FaLinkedin size={30} />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden  md:flex flex-col justify-center">
        <hr className="text-gray-500" />
        <p className=" text-sm text-center">
          Copyright&copy; {today.getFullYear()}@scenicwonders.dev - All Right Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
