import React from "react";
import { Button, Image, Divider } from "@nextui-org/react";
import { Link, Outlet } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="h-screen relative flex">
      <div className="h-full pt-4 flex flex-col gap-2 w-64 border-[#BF7B67] border-r-1">
        <div>
          <Image alt="H&N" src="/logo.png" />
        </div>
        <div className="pl-10 pt-4 text-xs font-semibold text-[#BF7B67] flex flex-col gap-1">
          <div className="hover:underline flex items-center gap-1 cursor-pointer poem">
            <lord-icon
                target=".poem"
              src="https://cdn.lordicon.com/dyfotzbb.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#BF7B67,secondary:#BF7B67"
              style={{ width: "25px", height: "25px" }}
            ></lord-icon>
            <p>Poems</p>
          </div>
          <div className="hover:underline flex items-center gap-1 cursor-pointer stories">
            <lord-icon
            target=".stories"
              src="https://cdn.lordicon.com/ruvyooob.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#BF7B67,secondary:#BF7B67"
              style={{ width: "25px", height: "25px" }}
            ></lord-icon>
            <p>Short Story</p>
          </div>
          <div className="hover:underline flex items-center gap-1 cursor-pointer memoir">
            <lord-icon
                target=".memoir"
              src="https://cdn.lordicon.com/ofwxettw.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#BF7B67,secondary:#BF7B67"
              style={{ width: "25px", height: "25px" }}
            ></lord-icon>
            <p>Essays</p>
          </div>
        </div>
        <div className="px-4">
          <Divider style={{ backgroundColor: "#BF7B67" }} />
        </div>
        <div className="pl-10 pt-4 text-xs font-semibold text-[#BF7B67] flex flex-col gap-1">
        <div className="hover:underline flex items-center gap-1 cursor-pointer notes">
            <lord-icon
                target=".notes"
              src="https://cdn.lordicon.com/chkplqja.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#BF7B67,secondary:#BF7B67"
              style={{ width: "25px", height: "25px" }}
            ></lord-icon>
            <p>Notes</p>
          </div>
          <div className="hover:underline flex items-center gap-1 cursor-pointer quotes">
            <lord-icon
                target=".quotes"
              src="https://cdn.lordicon.com/kxugsilq.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#BF7B67,secondary:#BF7B67"
              style={{ width: "25px", height: "25px" }}
            ></lord-icon>
            <p>Quotes</p>
          </div>
          <div className="flex hover:underline items-center gap-1 cursor-pointer others">
            <lord-icon
                target=".others"
              src="https://cdn.lordicon.com/olvznswf.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#BF7B67,secondary:#BF7B67"
              style={{ width: "25px", height: "25px" }}
            ></lord-icon>
            <p>Others</p>
          </div>
        </div>
        <div className="px-4">
          <Divider style={{ backgroundColor: "#BF7B67" }} />
        </div>
        <div className="pl-10 pt-4 text-xs font-semibold text-[#BF7B67] flex flex-col gap-1">
        <div className="flex hover:underline items-center gap-1 cursor-pointer about">
            <lord-icon
                target=".about"
              src="https://cdn.lordicon.com/juoetcdo.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#BF7B67,secondary:#BF7B67"
              style={{ width: "25px", height: "25px" }}
            ></lord-icon>
            <p>About me</p>
          </div>
          <div className="flex hover:underline items-center gap-1 cursor-pointer contact">
            <lord-icon
                target=".contact"
              src="https://cdn.lordicon.com/aycieyht.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#BF7B67,secondary:#BF7B67"
              style={{ width: "25px", height: "25px" }}
            ></lord-icon>
            <p>Contact</p>
          </div>
        </div>
      </div>
      <div className=" overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Homepage;
