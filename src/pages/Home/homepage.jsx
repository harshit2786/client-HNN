import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Image,
  Divider,
} from "@nextui-org/react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useMobileLayout } from "../../hooks/mobilelayout";

const Homepage = () => {
  const isMobile = useMobileLayout();
  const Nav1 = [
    {
      className: "poem",
      iconSrc: "https://cdn.lordicon.com/dyfotzbb.json",
      text: "Poems",
      path:"/poems"
    },
    {
      className: "stories",
      iconSrc: "https://cdn.lordicon.com/ruvyooob.json",
      text: "Short Story",
      path:"/stories"
    },
    {
      className: "memoir",
      iconSrc: "https://cdn.lordicon.com/icifqncn.json",
      text: "Memoir",
      path:"/memoirs"
    },
  ];
  const Nav2 = [
    {
      className: "notes",
      iconSrc: "https://cdn.lordicon.com/qhsqomjd.json",
      text: "Notes",
      path:"/notes"
    },
    {
      className: "quotes",
      iconSrc: "https://cdn.lordicon.com/ieoqzwng.json",
      text: "Quotes",
      path:"/quotes"
    },
    {
      className: "others",
      iconSrc: "https://cdn.lordicon.com/ofwxettw.json",
      text: "Others",
      path:"/others"
    },
  ];
  const Nav3 = [
    {
      className: "about",
      iconSrc: "https://cdn.lordicon.com/juoetcdo.json",
      text: "About me",
      path:"/about"
    },
    {
      className: "contact",
      iconSrc: "https://cdn.lordicon.com/aycieyht.json",
      text: "Contact",
      path:"/contact"
    },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      {isMobile ? (
        <div>
          <Navbar isMenuOpen={isMenuOpen} isBordered className="bg-[#FAE9DD]" isBlurred={false} onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
              <NavbarMenuToggle className="sm:hidden" />
              <NavbarBrand>
                <img style={{height:"50px"}} alt="H&N" src="/logo.png" />
              </NavbarBrand>
            </NavbarContent>
            <NavbarMenu className=" bg-[#FAE9DD]">
            <div className="pl-10 pt-4 text-xs font-semibold text-[#BF7B67] flex flex-col gap-1">
              {Nav1.map((item, index) => (
                <NavLink className="rounded-md" to={item.path}>
                <div
                  key={index}
                  className={`hover:underline flex items-center gap-1 cursor-pointer ${item.className}`}
                >
                  <lord-icon
                    target={`.${item.className}`}
                    src={item.iconSrc}
                    trigger="hover"
                    stroke="bold"
                    colors="primary:#BF7B67,secondary:#BF7B67"
                    style={{ width: "25px", height: "25px" }}
                  ></lord-icon>
                  <p onClick={()=>setIsMenuOpen(false)}>{item.text}</p>
                </div>
                </NavLink>
              ))}
            </div>
            <div className="px-4">
              <Divider style={{ backgroundColor: "#BF7B67" }} />
            </div>
            <div className="pl-10 pt-4 text-xs font-semibold text-[#BF7B67] flex flex-col gap-1">
              {Nav2.map((item, index) => (
                <NavLink className="rounded-md" to={item.path}>
                <div
                  key={index}
                  className={`hover:underline flex items-center gap-1 cursor-pointer ${item.className}`}
                >
                  <lord-icon
                    target={`.${item.className}`}
                    src={item.iconSrc}
                    trigger="hover"
                    stroke="bold"
                    colors="primary:#BF7B67,secondary:#BF7B67"
                    style={{ width: "25px", height: "25px" }}
                  ></lord-icon>
                  <p onClick={()=>setIsMenuOpen(false)}>{item.text}</p>
                </div>
                </NavLink>
              ))}
            </div>

            <div className="px-4">
              <Divider style={{ backgroundColor: "#BF7B67" }} />
            </div>
            <div className="pl-10 pt-4 text-xs font-semibold text-[#BF7B67] flex flex-col gap-1">
              {Nav3.map((item, index) => (
                <NavLink className="rounded-md" to={item.path}>
                <div
                  key={index}
                  className={`flex hover:underline items-center gap-1 cursor-pointer ${item.className}`}
                >
                  <lord-icon
                    target={`.${item.className}`}
                    src={item.iconSrc}
                    trigger="hover"
                    stroke="bold"
                    colors="primary:#BF7B67,secondary:#BF7B67"
                    style={{ width: "25px", height: "25px" }}
                  ></lord-icon>
                  <p onClick={()=>setIsMenuOpen(false)}>{item.text}</p>
                </div>
                </NavLink>
              ))}
            </div>
            </NavbarMenu>
          </Navbar>
          <div className=" min-h-screen w-full bg-[#fdf6f3]">
            <Outlet />
          </div>
        </div>
      ) : (
        <div className="h-screen relative flex">
          <div className="h-full pt-4 flex flex-col gap-2 w-64 border-[#BF7B67] border-r-1">
            <div>
              <Image style={{height:"100px"}} alt="H&N" src="/logo.png" />
            </div>
            <div className="pl-10 pt-4 text-xs font-semibold text-[#BF7B67] flex flex-col gap-1">
              {Nav1.map((item, index) => (
                <NavLink className="rounded-md" to={item.path}>
                <div
                  key={index}
                  className={`hover:underline flex items-center gap-1 cursor-pointer ${item.className}`}
                >
                  <lord-icon
                    target={`.${item.className}`}
                    src={item.iconSrc}
                    trigger="hover"
                    stroke="bold"
                    colors="primary:#BF7B67,secondary:#BF7B67"
                    style={{ width: "25px", height: "25px" }}
                  ></lord-icon>
                  <p>{item.text}</p>
                </div>
                </NavLink>
              ))}
            </div>
            <div className="px-4">
              <Divider style={{ backgroundColor: "#BF7B67" }} />
            </div>
            <div className="pl-10 pt-4 text-xs font-semibold text-[#BF7B67] flex flex-col gap-1">
              {Nav2.map((item, index) => (
                <NavLink className="rounded-md" to={item.path}>
                <div
                  key={index}
                  className={`hover:underline flex items-center gap-1 cursor-pointer ${item.className}`}
                >
                  <lord-icon
                    target={`.${item.className}`}
                    src={item.iconSrc}
                    trigger="hover"
                    stroke="bold"
                    colors="primary:#BF7B67,secondary:#BF7B67"
                    style={{ width: "25px", height: "25px" }}
                  ></lord-icon>
                  <p>{item.text}</p>
                </div>
                </NavLink>
              ))}
            </div>

            <div className="px-4">
              <Divider style={{ backgroundColor: "#BF7B67" }} />
            </div>
            <div className="pl-10 pt-4 text-xs font-semibold text-[#BF7B67] flex flex-col gap-1">
              {Nav3.map((item, index) => (
                <NavLink className="rounded-md" to={item.path}>
                <div
                  key={index}
                  className={`flex hover:underline items-center gap-1 cursor-pointer ${item.className}`}
                >
                  <lord-icon
                    target={`.${item.className}`}
                    src={item.iconSrc}
                    trigger="hover"
                    stroke="bold"
                    colors="primary:#BF7B67,secondary:#BF7B67"
                    style={{ width: "25px", height: "25px" }}
                  ></lord-icon>
                  <p>{item.text}</p>
                </div>
                </NavLink>
              ))}
            </div>
          </div>
          <div className="h-full w-full bg-[#fdf6f3]">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default Homepage;
