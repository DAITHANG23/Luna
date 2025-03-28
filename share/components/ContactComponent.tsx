import { Facebook, Github, Linkedin } from "lucide-react";
import React from "react";

const ContactComponent = () => {
  return (
    <div className="flex items-center space-x-4 pt-0 p-6">
      <a
        href="https://www.facebook.com/DomNguyen2306"
        className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors"
        aria-label="Facebook"
      >
        <Facebook size={18} className="text-primary" />
      </a>
      <a
        href="https://www.linkedin.com/in/domnguyen236/"
        className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors"
        aria-label="Linkedin"
      >
        <Linkedin size={18} className="text-primary" />
      </a>
      <a
        href="https://github.com/DAITHANG23"
        className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors"
        aria-label="Github"
      >
        <Github size={18} className="text-primary" />
      </a>
    </div>
  );
};

export default ContactComponent;
