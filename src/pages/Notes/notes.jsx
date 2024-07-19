import React, { useEffect, useState } from "react";
import { getOneTypeBlog } from "../../controllers/strapiController";
import { Button, Chip, Divider, Input, Pagination, Spinner } from "@nextui-org/react";
import { useMobileLayout } from "../../hooks/mobilelayout";
import { useNavigate } from "react-router-dom";

function Notes() {
  const [stories, setStories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [filterStories, setFilterStories] = useState([]);
  const isMobile = useMobileLayout();
  const navigate = useNavigate();
  const perPage = 10;
  const [page,setPage] = useState(1);
  const [table,setTable] = useState([]);
  const userId = sessionStorage.getItem("userData")
    ? JSON.parse(sessionStorage.getItem("userData"))
    : null;
  const handleLogout = () => {
    sessionStorage.removeItem("userData");
    window.location.reload();
  };
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const resp = await getOneTypeBlog("blogs", "Note");
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
        item.attributes.Title.toLowerCase().includes(search.toLowerCase())
      );
      arr = arr.sort((a, b) => new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt));
      setFilterStories(arr);
    }
  }, [search, stories]);
  useEffect(() => {
    if(page){
      const si = perPage * (page-1);
      const ei = si + perPage;
      setTable(filterStories.slice(si,ei));
    }
  },[page,filterStories,perPage])
  return (
    <div className="h-full flex items-center flex-col w-full">
      <div className="w-full px-8 pt-8 border-[#BF7B67] flex justify-between sticky border-b  h-20">
        <div className="text-[#e7946f] text-2xl">Notes</div>
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
        <div className="border-[#BF7B67] bg-[#FAE9DD] p-4 flex flex-col gap-2 rounded-lg border min-h-[200px]">
          <p className=" text-[#e7946f] pb-4 text-md">Browse ~</p>
          {loading ? (
            <Spinner
              classNames={{ label: "text-[#e7946f]" }}
              color="warning"
              label="Loading..."
            />
          ) : filterStories?.length === 0 ? (
            <div className="w-full pt-[80px] flex items-center justify-center">
              <p className="text-[#e7946f] text-xs">No Notes to display.</p>
            </div>
          ) : (
            table?.map((story, index) => (
              <div className=" flex flex-col pb-2 gap-2">
                {index !== 0 && (
                  <div className="px-4">
                    <Divider style={{ backgroundColor: "#BF7B67" }} />
                  </div>
                )}
                <div className="flex justify-between">
                  <p
                    onClick={() =>
                      navigate(`/notes/${story?.attributes?.Path}`)
                    }
                    className="text-[#a2441b] cursor-pointer hover:underline text-sm"
                  >
                    "{story?.attributes?.Title}"
                  </p>
                  <Chip
                    onClick={() =>
                      navigate(`/notes/${story?.attributes?.Path}`)
                    }
                    className="text-[#BF7B67] bg-[#f7d2c7] cursor-pointer font-light text-xs"
                    size="sm"
                  >
                    Read Note
                  </Chip>
                </div>
                <p className="text-xs whitespace-pre-line w-full leading-relaxed pl-2">{story?.attributes?.Content}</p>
                <div className="pl-2 flex gap-4 items-center">
                  <div className="flex gap-1 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4 text-[#f7d2c7]"
                    >
                      <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                    </svg>
                    <p className=" text-[#f7d2c7] text-[0.75rem]">
                      {story?.attributes?.likes?.data?.length} likes
                    </p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4 text-[#f7d2c7]"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className=" text-[#f7d2c7] text-xs">
                      {story?.attributes?.comments?.data?.length} comments
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {stories.length > 0 && <div className=" pt-2  w-full flex items-center justify-center">
        <Pagination size="sm" classNames={{
        prev:" bg-[#f3ccb1] text-white",
        next:"bg-[#f3ccb1] text-white",
        item: "text-white text-small bg-[#f3ccb1]",
        chevronNext:"text-white",
        cursor:"bg-[#BF7B67]",
        
      }} total={Math.ceil(stories.length/perPage)} page={page} onChange={setPage} showControls/>
        </div>}
      </div>
    </div>
  );
}

export default Notes;
