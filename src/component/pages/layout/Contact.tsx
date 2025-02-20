import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const ContactPage: React.FC = () => {
  return (
<div>
<div className="m-5  flex items-center justify-center min-h-[80vh] bg-gray-100 p-6">
    <div className=" p-5 bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl ">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Software Engineer at HCLTech | React.js
      </h2>

      <p className="text-gray-700 mb-4">Hi,</p>

      <p className="text-gray-600 mb-4">
        I hope you're doing great! 
      </p>

      <p className="text-gray-600 mb-4">
        I'm <strong className="text-gray-800">Bipin</strong>, a{" "}
        <strong className="text-gray-800">Software Engineer at HCL Tech</strong>{" "}
        with <strong className="text-gray-800">2 years 5 months of experience</strong>.
        For me, every line of code is an opportunity to innovate—where
        challenges arise, I craft solutions that make a difference.
      </p>

      <p className="text-gray-600 mb-4">
        I'm particularly passionate about{" "}
        <strong className="text-gray-800">
          building scalable web applications
        </strong>{" "}
        and solving <strong className="text-gray-800">complex problems</strong>{" "}
        using <strong className="text-gray-800">React.js, Python, Django, and AWS</strong>. 
        I would love the opportunity to contribute my skills to your team and make a meaningful impact.
      </p>

      <p className="text-gray-600 mb-4">
        If there are any relevant openings, I’d be
        truly grateful for your help. You can check out my work here:
      </p>

      <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2">
        <p className="text-blue-600 font-medium">
          🔗 <a href="https://github.com/bipin4u" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
        <p className="text-blue-600 font-medium">
          🔗 <a href="https://main.d1keo56hu11jz3.amplifyapp.com/" target="_blank" rel="noopener noreferrer">
            Portfolio
          </a>
        </p>
      </div>
    </div>
  </div>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-50 p-6">
      <motion.div 
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg text-center "
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Me</h2>
        <p className="text-gray-600 mb-6">
          I'd love to hear from you! Reach out using the details below.
        </p>

        <div className="space-y-6">
          <motion.div 
            className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <Mail className="w-6 h-6 text-blue-600" />
            <span className="text-gray-700">bipin.kumar.pros@gmail.com</span>
          </motion.div>

          <motion.div 
            className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <Phone className="w-6 h-6 text-green-600" />
            <span className="text-gray-700">+91 7975564082</span>
          </motion.div>

          <motion.div 
            className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <MapPin className="w-6 h-6 text-red-600" />
            <span className="text-gray-700">Sarjapur Road, Bangalore, India</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
</div>
  );
};

export default ContactPage;
