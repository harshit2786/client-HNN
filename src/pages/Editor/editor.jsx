import React, { useEffect } from "react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useMobileLayout } from "../../hooks/mobilelayout";
import { NavLink, useNavigate } from "react-router-dom";
function Editor() {
  const isMobile = useMobileLayout();
  const navigate = useNavigate();
  const Nav1 = [
    {
      className: "poem",
      iconSrc: "https://cdn.lordicon.com/dyfotzbb.json",
      text: "Poems",
      path: "/editor/poems",
    },
    {
      className: "stories",
      iconSrc: "https://cdn.lordicon.com/ruvyooob.json",
      text: "Short Story",
      path: "/editor/stories",
    },
    {
      className: "memoir",
      iconSrc: "https://cdn.lordicon.com/ofwxettw.json",
      text: "Memoir",
      path: "/editor/memoirs",
    },
  ];
  const Nav2 = [
    {
      className: "notes",
      iconSrc: "https://cdn.lordicon.com/chkplqja.json",
      text: "Notes",
      path: "/editor/notes",
    },
    {
      className: "quotes",
      iconSrc: "https://cdn.lordicon.com/kxugsilq.json",
      text: "Quotes",
      path: "/editor/quotes",
    },
    {
      className: "others",
      iconSrc: "https://cdn.lordicon.com/olvznswf.json",
      text: "Others",
      path: "/editor/others",
    },
  ];
  useEffect(() => {
    if(sessionStorage.getItem("KadduData") === null){
        navigate('/');
    }
  },[navigate])
  return (
    <>
      {isMobile ? (
        <div className=" bg-[#fdf7f3] gap-2 pt-16 flex flex-col px-4 item-center justify-center">
        <div className=" absolute top-2 right-2">
            <Button onClick={() => navigate('/editor/create-new')} size="sm" className=" bg-[#FAE9DD] text-[#BF7B67]">+ Create</Button>
        </div>
          {Nav1.map((item, index) => (
            <NavLink  to={item.path}>
              <Card
                key={index}
                className={` bg-[#FAE9DD] cursor-pointer  w-full ${item.className}`}
              >
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                  <p className=" text-[#BF7B67]">{item.text}</p>
                </CardHeader>
                <CardBody className="overflow-visible py-2 w-full flex items-center justify-center">
                  <lord-icon
                    target={`.${item.className}`}
                    src={item.iconSrc}
                    trigger="hover"
                    stroke="bold"
                    colors="primary:#BF7B67,secondary:#BF7B67"
                    style={{ width: "70px", height: "70px" }}
                  ></lord-icon>
                </CardBody>
              </Card>
            </NavLink>
          ))}
          {Nav2.map((item, index) => (
            <NavLink  to={item.path}>
              <Card
                key={index}
                className={` bg-[#FAE9DD] cursor-pointer  w-full ${item.className}`}
              >
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                  <p className=" text-[#BF7B67]">{item.text}</p>
                </CardHeader>
                <CardBody className="overflow-visible py-2 w-full flex items-center justify-center">
                  <lord-icon
                    target={`.${item.className}`}
                    src={item.iconSrc}
                    trigger="hover"
                    stroke="bold"
                    colors="primary:#BF7B67,secondary:#BF7B67"
                    style={{ width: "70px", height: "70px" }}
                  ></lord-icon>
                </CardBody>
              </Card>
            </NavLink>
          ))}
        </div>
      ) : (
        <div className=" bg-[#fdf7f3] flex item-center justify-center h-screen">
        <div className=" absolute top-2 right-2">
        <Button onClick={() => navigate('/editor/create-new')} size="sm" className=" bg-[#FAE9DD] text-[#BF7B67]">+ Create</Button>
        </div>
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="flex gap-4">
              {Nav1.map((item, index) => (
                <NavLink  to={item.path}>
                  <Card
                    key={index}
                    className={` bg-[#FAE9DD] cursor-pointer py-4 w-40 ${item.className}`}
                  >
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                      <p className=" text-[#BF7B67]">{item.text}</p>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2 w-full flex items-center justify-center">
                      <lord-icon
                        target={`.${item.className}`}
                        src={item.iconSrc}
                        trigger="hover"
                        stroke="bold"
                        colors="primary:#BF7B67,secondary:#BF7B67"
                        style={{ width: "70px", height: "70px" }}
                      ></lord-icon>
                    </CardBody>
                  </Card>
                </NavLink>
              ))}
            </div>
            <div className="flex gap-4">
              {Nav2.map((item, index) => (
                <NavLink  to={item.path}>
                  <Card
                    key={index}
                    className={` bg-[#FAE9DD] cursor-pointer py-4 w-40 ${item.className}`}
                  >
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                      <p className=" text-[#BF7B67]">{item.text}</p>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2 w-full flex items-center justify-center">
                      <lord-icon
                        target={`.${item.className}`}
                        src={item.iconSrc}
                        trigger="hover"
                        stroke="bold"
                        colors="primary:#BF7B67,secondary:#BF7B67"
                        style={{ width: "70px", height: "70px" }}
                      ></lord-icon>
                    </CardBody>
                  </Card>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Editor;
