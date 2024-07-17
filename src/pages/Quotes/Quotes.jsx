import React, { useEffect, useState } from "react";
import { getOneTypeBlog } from "../../controllers/strapiController";
import { Chip, Divider, Input, Pagination, Spinner } from "@nextui-org/react";
import { useMobileLayout } from "../../hooks/mobilelayout";
import { useNavigate } from "react-router-dom";

function Quotes() {
  const [stories, setStories] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStories, setFilterStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMobileLayout();
  const perPage = 10;
  const [page, setPage] = useState(1);
  const [table, setTable] = useState([]);
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
                  <div className=" text-sm">~{story.attributes.Footer}</div>
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
