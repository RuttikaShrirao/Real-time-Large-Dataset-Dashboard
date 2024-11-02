import Link from "next/link";
import "../../CSS/HeroSection.css";
import dummyLogo from "../../asset/dummyLogo.svg";
import UploadFileSharpIcon from "@mui/icons-material/UploadFileSharp";
import FileUpload from "../fileupload/page"

import Image from "next/image";
import { useState } from "react";

function Sidebar() {
  const [isOpen, setisOpen] = useState(true);
  const toggle = () => {
    setisOpen(!isOpen);
  };

  const menuIcons = [
    {
      id: 1,
      icon: UploadFileSharpIcon,
      name: "Upload File",
    },
  ];
  return (
    <div className= "sidebar" >
      <div className="header-sidebar">
        <Image
          src={dummyLogo}
          alt="logo"
          className="logo-img"
          onClick={toggle}
        />
        <p
          className=  "brandName"
          style={{ fontWeight: "600", fontFamily: "poppins" }}
        >
          Analysis
        </p>
      </div>
      <div className="sidebarMenu">
      <Link href="/fileupload"> <UploadFileSharpIcon /></Link> 
      </div>
    </div>
  );
}
export default Sidebar;
