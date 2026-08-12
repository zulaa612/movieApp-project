import { ContactIcon } from "../icons/ContactIcon";
import { EmailIcon } from "../icons/EmailIcon";
import { FooterLogo } from "../icons/FooterLogo.";

export const FooterSection = (props) => {
  return (
    <div className="w-full h-70 bg-blue-700 flex justify-center items-center text-white">
      <div className="w-7xl h-50 flex justify-between">
        <div className="w-61.75 h-50 flex flex-col text-sm gap-2 ">
          <FooterLogo />
          <span>© 2024 Movie Z. All Rights Reserved.</span>
        </div>

        <div className="w-228.25 h-50  flex justify-end gap-24 ">
          <div className="w-43.5 h-50  text-sm ">
            <span>Contact Information</span>
            <div className=" flex flex-col items-center gap-6 mt-3">
              <div className="flex items-center gap-3">
                <EmailIcon />

                <div className="flex flex-col">
                  Email:
                  <span>support@movieZ.com</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ContactIcon />

                <span className="flex flex-col">
                  Phone:
                  <span>+976 (11) 123-4567</span>
                </span>
              </div>
            </div>
          </div>
          <div className="w-68.5 h-13 text-sm flex flex-col">
            <span>Follow us</span>
            <div className="flex gap-3">
              <button>Facebook</button>
              <button>Instagram</button>
              <button>Twitter</button>
              <button>Youtube</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
