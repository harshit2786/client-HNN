import React, { useEffect, useState } from "react";
import { getOneTypeBlog } from "../../controllers/strapiController";
import { Button, Input, Modal, ModalContent, ModalHeader, Pagination, Spinner, Tab, Tabs } from "@nextui-org/react";
import { useMobileLayout } from "../../hooks/mobilelayout";
import QuoteLike from "../../components/QuoteLike/QuoteLike";
import { LoginLogic, SignUpLogic } from "../../controllers/publiccontroller";
function Quotes() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [first, setFirst] = useState("");
  const [signEmail, setSignEmail] = useState("");
  const [signPass, setSignPass] = useState("");
  const [error, setError] = useState("");
  const [signError, setSignError] = useState("");
  const [stories, setStories] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStories, setFilterStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMobileLayout();
  const perPage = 10;
  const [isOpen,setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [table, setTable] = useState([]);
  const userId = sessionStorage.getItem("userData")
    ? JSON.parse(sessionStorage.getItem("userData"))
    : null;
  const handleLogout = () => {
    sessionStorage.removeItem("userData");
    window.location.reload();
  };
  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginEmail)) {
      setError("Invalid email format");
      return;
    }
    if (loginPass.trim().length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    const resp = await LoginLogic(loginEmail, loginPass);
    if (resp === "DNE") {
      setError("Kindly sign up first!");
      console.log("Kindly sign up first!");
    }
    if (resp === "Incorrect") {
      setError("Password you entered is incorrect");
      console.log("Password you entered is incorrect");
    }
    if (resp === "Success") {
      window.location.reload();
    }
  };
  const handleSignUp = async () => {
    if (!first.trim()) {
      setSignError("Name is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signEmail)) {
      setSignError("Invalid email format");
      return;
    }
    if (signPass.trim().length < 8) {
      setSignError("Password must be at least 8 characters");
      return;
    }

    const resp = await SignUpLogic(signEmail.trim(), signPass, first.trim());
    if (resp === "Exists") {
      setSignError("Account already exists");
      console.log("Account already exists");
    }
    if (resp === "Success") {
      window.location.reload();
    }
  };
  useEffect(() => {
    setError("");
    setSignEmail("");
    setSignPass("");
    setFirst("");
    setLoginEmail("");
    setLoginPass("");
    setSignError("");
  }, [isOpen]);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const resp = await getOneTypeBlog("blogs", "Quote");
        setStories(resp.data);
        setFilterStories(resp.data);
        console.log(resp.data);
        setLoading(false);
      } catch (error) {
        console.log("Error:", error);
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);
  useEffect(() => {
    if (stories.length > 0) {
      let arr = [];
      arr = stories.filter((item) =>
        item.attributes.Complete.toLowerCase().includes(search.toLowerCase())
      );
      arr = arr.sort(
        (a, b) =>
          new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt)
      );
      setFilterStories(arr);
    }
  }, [search, stories]);
  useEffect(() => {
    if (page) {
      const si = perPage * (page - 1);
      const ei = si + perPage;
      setTable(filterStories.slice(si, ei));
    }
  }, [page, filterStories, perPage]);
  return (
    <div className="h-full flex items-center flex-col w-full">
    <Modal
        className=" w-80 h-[400px]"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ModalContent className="pt-8 poppins-thin">
          <ModalHeader className="w-full flex flex-col gap-4 items-center justify-center">
            <div className="flex flex-col w-full">
              <Tabs fullWidth size="sm" aria-label="Tabs form">
                <Tab key="login" title="Login">
                  <form className="flex flex-col gap-4">
                    <Input
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      label="Email"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <Input
                      value={loginPass}
                      onChange={(e) => setLoginPass(e.target.value)}
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                    />
                    <div className="flex gap-2 justify-end">
                      <Button
                        onClick={() => handleLogin()}
                        fullWidth
                        className="bg-black text-white hover:bg-gray-700"
                      >
                        Login
                      </Button>
                    </div>
                    {error !== "" && (
                      <p className=" text-xs justify-center text-center text-red-500">
                        {error}
                      </p>
                    )}
                  </form>
                </Tab>
                <Tab key="sign-up" title="Sign up">
                  <form className="flex flex-col gap-4 h-[300px]">
                    <Input
                      value={first}
                      onChange={(e) => setFirst(e.target.value)}
                      label="Name"
                      placeholder="Enter your name"
                    />
                    <Input
                      value={signEmail}
                      onChange={(e) => setSignEmail(e.target.value)}
                      label="Email"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <Input
                      value={signPass}
                      onChange={(e) => setSignPass(e.target.value)}
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                    />

                    <div className="flex gap-2 justify-end">
                      <Button
                        onClick={() => handleSignUp()}
                        fullWidth
                        className="bg-black text-white hover:bg-gray-700"
                      >
                        Sign up
                      </Button>
                    </div>
                    {signError !== "" && (
                      <p className=" text-xs justify-center text-center text-red-500">
                        {signError}
                      </p>
                    )}
                  </form>
                </Tab>
              </Tabs>
            </div>
          </ModalHeader>
        </ModalContent>
      </Modal>
      <div className="w-full px-8 pt-8 border-[#BF7B67] flex justify-between sticky border-b  h-20">
        <div className="text-[#e7946f] text-2xl">Quotes</div>
        <div className="flex gap-2 items-center">
        
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          startContent={
            <lord-icon
              src="https://cdn.lordicon.com/unukghxb.json"
              trigger="hover"
              colors="primary:#BF7B67,secondary:#BF7B67"
              style={{ height: "30px", width: "30px" }}
            ></lord-icon>
          }
          size="sm"
          radius="full"
          className="w-32 text-xs"
        />
        {userId && <Button
          onClick={() => handleLogout()}
          size="sm"
          className=" bg-[#FAE9DD] text-[#BF7B67]"
        >
          Logout
        </Button>}
        </div>
      </div>
      <div
        className={`px-8 py-8 w-full h-full ${
          isMobile ? "" : "overflow-y-auto "
        } `}
      >
        <div className="border-[#BF7B67] p-4 flex flex-col gap-2 rounded-lg border min-h-[200px]">
          <p className=" text-[#e7946f] pb-4 text-md">Browse ~</p>
          {loading ? (
            <Spinner
              classNames={{ label: "text-[#e7946f]" }}
              color="warning"
              label="Loading..."
            />
          ) : filterStories?.length === 0 ? (
            <div className="w-full pt-[80px] flex items-center justify-center">
              <p className="text-[#e7946f] text-xs">No Quotes to display.</p>
            </div>
          ) : (
            table?.map((story, index) => (
              <div className={` flex pb-2 w-full gap-2 ${index % 2 ===0 ? "" : "flex-row-reverse"}`}>
                <div className={`border-[#BF7B67] bg-[#FAE9DD] ${isMobile ? "w-full" : " w-[60%]"} p-4 flex flex-col gap-2 rounded-lg border`}>
                  <div className=" text-md" dangerouslySetInnerHTML={{__html: story.attributes.Complete}}></div>
                  <div className="flex items-center justify-between"><div className=" text-sm">~{story.attributes.Footer}</div>
                  <QuoteLike isOpen={isOpen} setIsOpen={setIsOpen} quote={story} />
                  </div>

                </div>
              </div>
            ))
          )}
        </div>
        {stories.length > 0 && (
          <div className=" pt-2  w-full flex items-center justify-center">
            <Pagination
              size="sm"
              classNames={{
                prev: " bg-[#f3ccb1] text-white",
                next: "bg-[#f3ccb1] text-white",
                item: "text-white text-small bg-[#f3ccb1]",
                chevronNext: "text-white",
                cursor: "bg-[#BF7B67]",
              }}
              total={Math.ceil(stories.length / perPage)}
              page={page}
              onChange={setPage}
              showControls
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Quotes;
