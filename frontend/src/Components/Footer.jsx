import { assets } from "../assets/assets";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  const today = new Date();
  return (
    <div className="  flex flex-col    mt-20">
      {/* Footer logo */}
      <div className="  flex flex-col  text-sm justify-between">
        <hr className="text-gray-500" />
        <div className="font-bold pl-5 flex flex-row gap-2 items-center mt-3">
          <img src={assets.sw_logo} className="size-8" />
          <h5 className="font-bold ">Scenic Wonders</h5>
        </div>

        {/* Company deatiles */}
        <div className="flex flex-row justify-between items-center p-10 ">
          {/* lists */}
          <div className="flex flex-col items-center">
            <p className="font-bold  text-lg">Company</p>
            <ul className="flex flex-col gap-2 ">
              <li>About</li>
              <li>Privacy policy</li>
              <li>Security</li>
            </ul>
          </div>

          <div className="flex flex-col  justify-start ">
            <p className="font-bold  text-lg">contact Us</p>
            <ul className="flex flex-col gap-2">
              <li>Help/FAQ</li>
              <li>scenicwonders@gmail.com</li>
              <li>+1-400-020-5287</li>
            </ul>
          </div>

          <div className="flex flex-col items-center  ">
            <p className="font-bold text-lg">Follow Us</p>
            <div className="flex flex-row  justify-center gap-4 ">
              <FaFacebook size={30} />
              <FaTwitter size={30} />
              <FaInstagram size={30} />
              <FaLinkedin size={30} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <hr className="text-gray-500" />
        <p className=" text-sm text-center">
          Copyright&copy; {today.getFullYear()}@scenicwonders.dev - All Right Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
