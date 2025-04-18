import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section">
          <h3>ABOUT</h3>
          <p>Contact Us</p>
          <p>About Us</p>
          <p>Careers</p>
          <p>Flipkart Stories</p>
          <p>Press</p>
          <p>Corporate Information</p>
        </div>

        <div className="footer-section">
          <h3>GROUP COMPANIES</h3>
          <p>Myntra</p>
          <p>Cleartrip</p>
          <p>Shopsy</p>
        </div>

        <div className="footer-section">
          <h3>HELP</h3>
          <p>Payments</p>
          <p>Shipping</p>
          <p>Cancellation & Returns</p>
          <p>FAQ</p>
        </div>

        <div className="footer-section">
          <h3>CONSUMER POLICY</h3>
          <p>Cancellation & Returns</p>
          <p>Terms Of Use</p>
          <p>Security</p>
          <p>Privacy</p>
          <p>Sitemap</p>
          <p>Grievance Redressal</p>
          <p>EPR Compliance</p>
        </div>

        <div className="footer-section">
          <h3>Mail Us:</h3>
          <p>
            Flipkart Internet Private Limited,
            Buildings Alyssa, Begonia & Clove Embassy Tech Village,
            Outer Ring Road, Devarabeesanahalli Village,
            Bengaluru, 560103, Karnataka, India
          </p>
        </div>

        <div className="footer-section">
          <h3>Registered Office Address:</h3>
          <p>
            Flipkart Internet Private Limited,
            Buildings Alyssa, Begonia & Clove Embassy Tech Village,
            Outer Ring Road, Devarabeesanahalli Village,
            Bengaluru, 560103, Karnataka, India
            CIN: U51109KA2012PTC066107
            Telephone: 044-45614700 / 044-67415800
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-social">
          <h3>Social:</h3>
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
          <FaYoutube />
        </div>

        <div className="footer-payment">
          <h3>Payment Methods:</h3>
          <p>Visa | MasterCard | PayPal | UPI | Net Banking</p>
        </div>

        <div className="footer-copyright">
          <p>© 2025 Flipkart Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
