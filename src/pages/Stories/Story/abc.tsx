import { WidgetType, WidgetInputType } from ".";
import send from "../../assets/send.svg";
import back from "../../assets/back.svg";
import Markdown, { Components } from "react-markdown";
import Loading from "./loading";
import TextArea from "./textarea";
import { backgroundColor, dropShadow } from "../constants/css";
import { CustomScroll } from "react-custom-scroll";
import { tracker } from "../../constants";
import { useEffect, useState } from "react";
// import { useEffect } from "react";

const renderers: Partial<Components> = {
  // Custom renderer for 'a' (anchor) tags
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  a: ({ href, children }) => (
    <a href={href} id={"overlayyAnchor"}>
      {children}
    </a>
  ),
};

export default function Result({
  query,
  initialQuery,
  changeMode,
  setQuery,
  response,
  queryInputRef,
  setHasClicked,
  handleQueryResponse,
}: WidgetInputType): WidgetType {

  const [follow, setFollow] = useState<string>("");
  const [fokkow, setFokkow] = useState<string>("");

  const handleQueryTracking =  () => {
    console.log(query, response, "handleQueryTracking result.tsx");
    tracker.trackEvent("RESPONSE", {
      props: {
        url: window.location.href,
        query: query!,
        response: response!,
        timestamp: new Date().toISOString(),
      },
    });

    const historyArray = JSON.parse(localStorage.getItem("history") || "[]");
    const historyObj = [
      {
        query: query,
        response: response,
      },
    ];
    historyArray.push(historyObj);
    console.log(historyArray.flat(), "history array")
    
    if(historyArray.length > 2) {
      historyArray.shift();
      

    }
    localStorage.setItem("history", JSON.stringify(historyArray.flat()));
    console.log(localStorage.getItem("history"), "history");
    const histData = localStorage.getItem("history")
    console.log(histData, "histData")
  };

const handleFollowUpQuestions = async () => {
  console.log(query, new Date().toISOString(), window.location.href, "result.tsx");
  const url = 'https://api.overlayy.com/follow_up';
  const body = localStorage.history;
  const responsed = await fetch(url.toString(), {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: body
});
 console.log('My', responsed);
const responseData = await responsed.json();
 
const followArray = JSON.stringify(responseData?.follow_up);
  console.log('0followArry', followArray);
 setFollow(followArray);
 //setFollow('Rutuj');
}

const handleSubmit = async () => {
  await handleQueryResponse!();
  await handleQueryTracking();
  await handleFollowUpQuestions();
};
useEffect(() => {
setFokkow(follow)
}, [follow])
  return response ? (
    <div
      style={{
        filter: dropShadow,
        backdropFilter: "blur(4px)",
        background: backgroundColor,
        borderRadius: "10px",
        padding: "20px",
        maxWidth: "400px",
        fontSize: "15px",
        marginTop: "20px",
        marginLeft: "20px",
      }}
    >
      <button
        style={{
          border: "none",
          background: "none",
          outline: "none",
          color: "white",
        }}
        onClick={() => {
          changeMode("QUERY_INPUT");
          setQuery!("");
        }}
      >
        <img src={back} />
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          textAlign: "left",
          padding: "10px 20px 0px 20px",
          paddingTop: "15px",
          color: "rgba(167, 170,238,1)",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        {initialQuery}
      </div>
      <div style={{ maxHeight: "40vh", margin: "10px" }}>
        <CustomScroll heightRelativeToParent="40vh">
          <div
            style={{
              fontFamily: "Open Sans",
              color: "white",
              lineHeight: "1.6",
              overflowY: "auto",
              textAlign: "justify",
              padding: "10px 20px 10px 10px",
            }}
          >
            <Markdown components={renderers}>{response}</Markdown>
          </div>
        </CustomScroll>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#ffffff22",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <div style={{ flexGrow: 1, paddingRight: "5px" }}>
          <TextArea
            value={query ?? ""}
            draggable={false}
            queryInputRef={queryInputRef}
            onChange={(e: { target: { value: string } }) =>
              setQuery!(e.target.value)
            }
            placeholder="Ask a follow-up"
            onKeyDown={async (event: { key: string }) => {
              console.log(event.key);
              if (event.key === "Enter") {
                handleSubmit();
              }
            }}
          ></TextArea>
        </div>
        <button
          style={{
            border: "none",
            background: "none",
            outline: "none",
            color: "white",
          }}
          onClick={ () => {
             handleSubmit();
          }}
         
        >
          <img src={send}></img>
        </button>
      </div>
      {}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "15px",
          color: "white",
          fontSize: "12px",
        }}
      >
        <div>
          For support related queries,{" "}
          <a
            id="overlayyAnchor"
            href="https://www.getmerlin.in/live-support/"
            style={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            click here
          </a>
        </div>
        &nbsp; ■ &nbsp;
        <div>
          Powered By{" "}
          <a
            id="overlayyAnchor"
            href="https://overlayy.com/"
            style={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Overlayy
          </a>
        </div>
      </div>
      <div>
        {fokkow && fokkow} ss
      </div>
    </div>
  ) : (
    <Loading
      changeMode={changeMode}
      setHasClicked={setHasClicked}
      setQuery={setQuery}
      queryInputRef={queryInputRef}
    />
  );
}