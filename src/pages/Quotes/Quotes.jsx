import React, { useEffect, useState } from "react";
import { getOneTypeBlog } from "../../controllers/strapiController";
import { Chip, Divider, Input, Spinner } from "@nextui-org/react";
import { useMobileLayout } from "../../hooks/mobilelayout";
import { useNavigate } from "react-router-dom";

function Quotes() {
  const [stories, setStories] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStories, setFilterStories] = useState([]);
  const [loading,setLoading] = useState(true);
  const isMobile = useMobileLayout();
  const navigate = useNavigate();
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
        item.attributes.Title.toLowerCase().includes(search.toLowerCase())
      );
      setFilterStories(arr);
    }
  }, [search, stories]);
  return (
    <div className="h-full flex items-center flex-col w-full">
      <div className="w-full px-8 pt-8 border-[#BF7B67] flex justify-between sticky border-b  h-20">
        <div className="text-[#e7946f] text-2xl">Quotes</div>
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
      </div>
      <div
        className={`px-8 py-8 w-full h-full ${
          isMobile ? "" : "overflow-y-auto "
        } `}
      >
        <div className="border-[#BF7B67] p-4 flex flex-col gap-2 rounded-lg border min-h-[200px]">
          <p className=" text-[#e7946f] pb-4 text-md">Browse ~</p>
          {loading ? <Spinner classNames={{label:"text-[#e7946f]"}} color="warning" label="Loading..."/> : filterStories?.length === 0 ? (
            <div className="w-full pt-[80px] flex items-center justify-center">
              <p className="text-[#e7946f] text-xs">No Quotes to display.</p>
            </div>
          ) : (
            filterStories?.map((story, index) => (
              <div className=" flex flex-col gap-2">
                {index !== 0 && (
                  <div className="px-4">
                    <Divider style={{ backgroundColor: "#BF7B67" }} />
                  </div>
                )}
                <div className="flex justify-between">
                  <p
                    onClick={() =>
                      navigate(`/quotes/${story.attributes.Path}`)
                    }
                    className="text-[#a2441b] cursor-pointer hover:underline text-sm"
                  >
                    "{story.attributes.Title}" by {story.attributes.Footer}
                  </p>
                  <Chip
                    onClick={() =>
                      navigate(`/quotes/${story.attributes.Path}`)
                    }
                    className="text-[#BF7B67] bg-[#f7d2c7] cursor-pointer font-light text-xs"
                    size="sm"
                  >
                    Read Quote
                  </Chip>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Quotes;
