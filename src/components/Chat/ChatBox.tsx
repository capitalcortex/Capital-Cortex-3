import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpIcon,
  CapitalChatIcon,
  CloseIcon,
  DisLikeIcon,
  DummyUserIcon,
  ExportIcon,
  LikeIcon,
  LinkWebIcon,
  PdfFileIcon,
} from "../Icons";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import dummyAdmin from "../../../public/images/dummy/capital-cortex-pfp.svg";
import Button from "../Buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";
import {
  addChatAsync,
  chatFeedbackAsync,
  chatPDFAsync,
  chatResponseAsync,
  documentChatAsync,
  getNoteListsAsync,
  updateChatAsync,
  uploadPDFAsync,
} from "@/services/chat/asyncThunk";
import Toast from "../Toast";
import {
  addResponse,
  loadChat,
  setFile,
  setHistory,
  setLoading,
  setNewChatHistory,
  setNote,
  setProgress,
  setStream,
  updateActiveIndex,
  updateChatHistory,
  updateHistory,
} from "@/redux/slices/chatSlice";
import ReactMarkdown from "react-markdown";
import Textarea from "../Input/Textarea";
import AddChatNotesModal from "../Modals/AddChatNotes/AddChatNotes";
import NiceModal from "@ebay/nice-modal-react";
import copy from "clipboard-copy";
import { useDropzone } from "react-dropzone";
import Link from "next/link";
import DislikeChatModal from "../Modals/DislikeChat/DislikeChat";
import LikeChatModal from "../Modals/LikeChat/LikeChat";
import { PDFDocument } from 'pdf-lib';

interface Iprops {
  variant?: string;
  className?: string;
  chatHistoryToggler?: any;
  setChatHistoryToggler?: any;
}
const ChatBox = ({
  variant,
  className,
  chatHistoryToggler,
  setChatHistoryToggler,
}: Iprops) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { chatId, stream, history, fileProgress, pdfChat, file } = useSelector(
    (state: any) => state.chat
  );
  const { documentChat, docId } = useSelector((state: any) => state.documentGeneration);
  const { profile } = useSelector((state: any) => state.user);
  const [question, setQuestion] = useState("");
  const [isChat, setIsChat] = useState(false);
  const [chatResponse, setChatResponse] = useState("");
  const messagesEndRef = useRef(null);
  let initialChat = true

  useEffect(() => {
    let textarea = document.getElementById("message");
    textarea?.focus();
  }, [history]);

  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  useEffect(() => {
    //@ts-ignore
    dispatch(loadChat({history: [], chatId: "", navigate: false}))
    //@ts-ignore
    dispatch(getNoteListsAsync());
  }, []);

  useEffect(() => {
    if(router.pathname.includes('documents') && initialChat && documentChat != ""){
      initialChat = false
      //@ts-ignore
      dispatch(documentChatAsync({chatId: documentChat}))
    }
  }, [documentChat])

  const handleLikeReact = (query: string, response: string) => {
    dispatch(
      //@ts-ignore
      chatFeedbackAsync({
        react: "Like",
        feedback: "",
        query: query,
        response: response,
      })
    );
  };

  const isPDFValid = async (file: any) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      return true;
    } catch (error) {
      console.error('Error validating file:', error);
      return false;
    }
  };

  const onDrop = (acceptedFiles: any) => {
    acceptedFiles.forEach(async (file:any) => {
      if (file.type == 'application/pdf') {
        if(await isPDFValid(acceptedFiles[0])){
          dispatch(setFile(acceptedFiles[0]))
        }else{
          Toast.fire({icon: 'error', title: 'File Corrupted!'})
        }
      }else{
        Toast.fire({icon: 'warning', title: 'Please select pdf file'})
      }
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const handleRemoveFile = () => {
    //@ts-ignore
    dispatch(setFile(null))
  };

  const handleUpload = () => {
    //@ts-ignore
    dispatch(uploadPDFAsync({ file: file }));
  };

  const handleDBChat = (payload: any, newHistory: any) => {
    chatResponseAsync({ history: payload.slice(-1), chatType: 'chat', docId: docId })
      .then(async (response) => {
        //@ts-ignore
        dispatch(setLoading(false));
        const reader = response.body.getReader();
        let fullMessage = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            //@ts-ignore
            dispatch(setStream(false));
            //@ts-ignore
            dispatch(addResponse(fullMessage));

            let newPayload = [];
            newPayload.push(newHistory[0]);
            newPayload.push({
              role: "assistant",
              regen_msgs: [fullMessage],
              activeIndex: 1,
              content: fullMessage,
            });

            if (chatId === "") {
              //@ts-ignore
              dispatch(addChatAsync({ history: newPayload }));
              dispatch(setNewChatHistory(newPayload[newPayload.length-1]))
            } else {
              
              dispatch(
                //@ts-ignore
                updateChatAsync({
                  chatId: chatId,
                  regenerate: false,
                  newMessage: newPayload,
                })
              );

              //@ts-ignore
              dispatch(updateChatHistory({newPayload: newPayload, chatId: chatId, regen: false}))
            }
            setChatResponse("");
            break;
          }
          let chunk = new TextDecoder("utf-8").decode(value).toString();

          fullMessage = fullMessage + chunk;
          setChatResponse((prevResponse) => prevResponse + chunk);
        }
      })
      .catch((error: any) => {
        console.error("Error fetching user data:", error);
      });
  };

  const handlePDFChat = (payload: any, newHistory: any) => {
    chatPDFAsync({ query: payload.slice(-1)[0]["content"], history: payload})
      .then(async (response) => {
        //@ts-ignore
        dispatch(setLoading(false));
        const reader = response.body.getReader();
        let fullMessage = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            //@ts-ignore
            dispatch(setStream(false));
            //@ts-ignore
            dispatch(addResponse(fullMessage));

            let newPayload = [];
            newPayload.push(newHistory[0]);
            newPayload.push({
              role: "assistant",
              regen_msgs: [fullMessage],
              activeIndex: 1,
              content: fullMessage,
            });

            if (chatId === "") {
              //@ts-ignore
              dispatch(addChatAsync({ history: newPayload }));
              dispatch(setNewChatHistory(newPayload[newPayload.length -1]))
            } else {
              
              dispatch(
                //@ts-ignore
                updateChatAsync({
                  chatId: chatId,
                  regenerate: false,
                  newMessage: newPayload,
                })
              );

              //@ts-ignore
              dispatch(updateChatHistory({newPayload: newPayload, chatId: chatId, regen: false}))
            }
            setChatResponse("");
            break;
          }
          let chunk = new TextDecoder("utf-8").decode(value).toString();

          fullMessage = fullMessage + chunk;
          setChatResponse((prevResponse) => prevResponse + chunk);
        }
      })
      .catch((error: any) => {
        console.error("Error fetching user data:", error);
      });
  };

  const getResponse = async (question: string) => {
    if (question == "") {
      Toast.fire({
        icon: "error",
        title: "Invalid Question",
      });
      return;
    }
    let newHistory = [
      {
        role: "user",
        content: question,
      },
      {
        role: "assistant",
        activeIndex: 1,
        regen_msgs: [],
        content: "",
      },
    ];

    let payload = [...history];

    payload.push(newHistory[0]);

    //@ts-ignore
    dispatch(setHistory(newHistory));

    setQuestion("");

    setIsChat(true);

    //@ts-ignore
    dispatch(setLoading(true));

    //@ts-ignore
    dispatch(setStream(true));

    if (pdfChat) {
      handlePDFChat(payload, newHistory);
    } else {
      handleDBChat(payload, newHistory);
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && event.shiftKey) {
      // Handle "Enter + ctrl"
      event.preventDefault();
      setQuestion((prevValue: string) => prevValue + "\n");
      // Your action when "Enter + ctrl" is pressed
    } else if (event.key === "Enter") {
      // Handle only "Enter" press
      event.preventDefault();
      getResponse(question);
    }
  };

  const handleCopy = async (content: any) => {
    try {
      await copy(content);
      Toast.fire({
        icon: "success",
        title: "Copy to Clipboard",
      });
    } catch (error) {
      console.error("Failed to copy:", error);
      Toast.fire({
        icon: "error",
        title: "Failed to copy",
      });
    }
  };

  const handleRegenerateDBChat = (OldHistory: any, regen_msgs: any) => {
    chatResponseAsync({ history: OldHistory.slice(-2, -1), chatType: 'chat', docId: docId  })
      .then(async (response) => {
        //@ts-ignore
        dispatch(setLoading(false));
        const reader = response.body.getReader();
        let fullMessage = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            //@ts-ignore
            dispatch(setStream(false));

            //@ts-ignore
            dispatch(addResponse(fullMessage));

            let newPayload = [];
            regen_msgs.push(fullMessage)

            newPayload.push({
              role: "assistant",
              regen_msgs: regen_msgs,
              activeIndex: regen_msgs.length,
              content: fullMessage,
            });
            
            dispatch(
              //@ts-ignore
              updateChatAsync({
                chatId: chatId,
                regenerate: true,
                newMessage: newPayload,
              })
            );

            //@ts-ignore
            dispatch(updateChatHistory({newPayload: newPayload, chatId: chatId, regen: true}))

            setChatResponse("");
            break;
          }
          let chunk = new TextDecoder("utf-8").decode(value).toString();
          fullMessage = fullMessage + chunk;
          setChatResponse((prevResponse) => prevResponse + chunk);
        }
      })
      .catch((error: any) => {
        console.error("Error fetching user data:", error);
      });
  };

  const handleRegeneratePDFChat = (OldHistory: any, regen_msgs: any) => {
    chatPDFAsync({ query: OldHistory.slice(-2, -1)[0]["content"], history: OldHistory.slice(0, -1)})
      .then(async (response) => {
        //@ts-ignore
        dispatch(setLoading(false));
        const reader = response.body.getReader();
        let fullMessage = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            //@ts-ignore
            dispatch(setStream(false));

            //@ts-ignore
            dispatch(addResponse(fullMessage));

            let newPayload = [];
            regen_msgs.push(fullMessage)

            newPayload.push({
              role: "assistant",
              regen_msgs: regen_msgs,
              activeIndex: regen_msgs.length,
              content: fullMessage,
            });

           
            dispatch(
              //@ts-ignore
              updateChatAsync({
                chatId: chatId,
                regenerate: true,
                newMessage: newPayload,
              })
            );

            //@ts-ignore
            dispatch(updateChatHistory({newPayload: newPayload, chatId: chatId, regen: true}))

            setChatResponse("");
            break;
          }
          let chunk = new TextDecoder("utf-8").decode(value).toString();
          fullMessage = fullMessage + chunk;
          setChatResponse((prevResponse) => prevResponse + chunk);
        }
      })
      .catch((error: any) => {
        console.error("Error fetching user data:", error);
      });
  };

  const handleRegenerate = () => {
    let OldHistory = [...history]; // Create a shallow copy of history array

    // Create a new object for the last item in the copied history array
    let lastItem = { ...OldHistory[OldHistory.length - 1] };

    const regen_msgs = lastItem?.regen_msgs ? [...lastItem?.regen_msgs] : []

    // Modify the content property of the last item
    lastItem.content = "";

    // Replace the last item in the copied history array with the modified item
    OldHistory[OldHistory.length - 1] = lastItem;

    //@ts-ignore
    dispatch(updateHistory(OldHistory));

    //@ts-ignore
    dispatch(setLoading(true));

    //@ts-ignore
    dispatch(setStream(true));

    if (pdfChat) {
      handleRegeneratePDFChat(OldHistory, regen_msgs);
    } else {
      handleRegenerateDBChat(OldHistory, regen_msgs);
    }
  };

  const getLinks = (content: string, id: string) => {
    const regex = /\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/g;

    // Array to store the extracted links
    let links: any[] = [];

    // Loop through matches and extract links
    let match;
    while ((match = regex.exec(content)) !== null) {
      // Extract link text and URL from each match
      const linkText: string = match[1];
      const url = match[2];

      if (!links.includes(linkText)) {
        // Push link object to the links array
        links.push({ text: linkText, url: url });
      }
    }

    links = links.filter(
      (obj: any, index: number, self: any) =>
        index === self.findIndex((t: any) => t["text"] === obj["text"])
    );

    return links.map((link: any, lKey: number) => (
      <Link
        key={lKey}
        className="min-w-max !font-normal"
        target="_blank"
        href={link.url}
      >
        <LinkWebIcon className="text-white" />
        {lKey + 1}. {link.text}
      </Link>
    ));
  };

  const handleSwitchMsg = (activeIndex: number, chatIndex: number) => {
    //@ts-ignore
    dispatch(updateActiveIndex({activeIndex: activeIndex, index: chatIndex}))
  }

  const chatActions = (msg: any, index: number) => {
    
    return (
      <>
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => {
              handleLikeReact(history[index]["content"], msg.content);
              NiceModal.show(LikeChatModal);
            }}
          >
            <LikeIcon />
          </button>
          <button
            onClick={() => {
              NiceModal.show(DislikeChatModal, {
                query: history[index]["content"],
                response: msg.content,
              });
            }}
          >
            <DisLikeIcon />
          </button>
        </div>
        <div className="chat__actions">
          <div className="flex gap-1 me-2 items-center">
            <button disabled={msg?.activeIndex <= 1} onClick={() => {handleSwitchMsg(msg?.activeIndex - 1, index)}}><IoIosArrowBack className="text-sm"/></button>
            <span className="text-xs font-semibold px-1">{msg?.activeIndex ? msg?.activeIndex : 1} / {msg?.regen_msgs ? msg?.regen_msgs.length: 1}</span>
            <button disabled={msg?.activeIndex == msg?.regen_msgs.length} onClick={() => {handleSwitchMsg(msg?.activeIndex + 1, index)}} className="!bg-none text-xl"><IoIosArrowForward className="text-sm"/></button>
          </div>
          <button
            disabled={stream}
            onClick={() => {
              dispatch(setNote(msg?.content));
              NiceModal.show(AddChatNotesModal);
            }}
          >
            Add to Note
          </button>
          <button
            disabled={stream}
            onClick={() => {
              handleCopy(msg?.content);
            }}
          >
            Copy
          </button>
          {history.length === index + 1 && (
            <>
              <button
                disabled={stream}
                onClick={() => {
                  handleRegenerate();
                }}
              >
                Regenerate
              </button>
            </>
          )}
        </div>
      </>
    );
  };

  const handleClean = (content: any) => {
    const regex = /\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/g;

    // Array to store the extracted links
    let links: any[] = [];

    // Loop through matches and extract links
    let match;
    while ((match = regex.exec(content)) !== null) {
      // Extract link text and URL from each match
      const linkText: string = match[1];
      const url = match[2];

      if (!links.includes(linkText)) {
        // Push link object to the links array
        links.push({ text: linkText, url: url });
      }
    }

    links = links.filter(
      (obj: any, index: number, self: any) =>
        index === self.findIndex((t: any) => t["text"] === obj["text"])
    );

    const cleanedText = content.replace(
      regex,
      (match: any, text: any, url: any) => {
        return `[${links.findIndex((x) => x.text == text) + 1}](${url})`;
      }
    );

    return cleanedText;
  };


  useEffect(() => {
    // Select all <a> tags within elements that have the class 'chat__message'
    const links = document.querySelectorAll('.chat__message li a');
    // Iterate over each link and set the target attribute to '_blank'
    links.forEach(link => {
      link.setAttribute('target', '_blank');
    });
  }, [history]); // Empty dependency array means this effect runs once after the initial render

  
  // const handleFileChange = (event:any) => {
  //   const file = event.target.files[0];
  //   if (file && file.type === 'application/pdf') {
  //     setSelectedFile(file);
  //   } else {
  //     setSelectedFile(null);
  //     alert('Please select a PDF file.');
  //   }
  // };

  return (
    <>
      {history.length > 0 ? (
        <ul
          className={`mb-4 overflow-y-scroll scrollbar-hidden grow ${
            router.pathname === "/ai-assistant"
            //@ts-ignore
              ? file?.name?.length > 0
                ? "h-[calc(100dvh_-_281px)] sm:h-[calc(100dvh_-_321px)] md:h-[calc(100dvh_-_390px)]"
                : "h-[calc(100dvh_-_245px)] sm:h-[calc(100dvh_-_280px)] md:h-[calc(100dvh_-_335px)] mt-4 md:mt-0"
                //@ts-ignore
              : file?.name?.length > 0
              ? "h-[calc(100dvh_-_360px)] sm:h-[calc(100dvh_-_417px)] md:h-[calc(100dvh_-_460px)] xl:h-[calc(100dvh_-_420px)]"
              : "h-[calc(100dvh_-_330px)] sm:h-[calc(100dvh_-_365px)] md:h-[calc(100dvh_-_417px)] xl:h-[calc(100dvh_-_370px)] mt-4 md:mt-0"
          }`}
        >
          {history.map((msg: any, index: number) => (
            <li key={index} className="chat__messages">
              {/* User Question */}
              {index % 2 == 0 && (
                <div>
                  {profile.avatar ? (
                    <figure>
                      <Image
                        src={profile.avatar}
                        // layout="fill"
                        height={40}
                        width={40}
                        alt="user-profile-photo"
                        aria-label="user profile photo"
                        className="object-cover rounded-full shrink-0"
                        unoptimized
                      />
                    </figure>
                  ) : (
                    <DummyUserIcon className="relative block h-[37px] w-[37px]" />
                  )}
                  <div className="chat__message">
                    <p className="fs-16 whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              )}
              {/* Capital Cortex Answer */}
              {index % 2 != 0 && (
                <div
                  ref={history.length === index + 1 ? messagesEndRef : null}
                  key={index}
                >
                  <figure>
                    <CapitalChatIcon />
                  </figure>
                  {/* <figure className="flex-shrink-0"><Image height={37} width={37} src={dummyAdmin} alt="dummy user" className="rounded-full object-cover" unoptimized={true} /></figure> */}
                  <div className="flex flex-col mb-2 w-full">
                    <div className="chat__message bg-theme-gray-50 mb-2">
                      <div className="chatbot-answer">
                        <ReactMarkdown>
                          {history.length === index + 1
                            ? stream
                              ? chatResponse
                              : handleClean(msg?.content)
                            : handleClean(msg?.content)}
                        </ReactMarkdown>
                      </div>
                      {history.length === index + 1 && stream && (
                        <span className="chatbot__writing__loader my-2" />
                      )}
                      {!stream && (
                        <div id={`${index}`} className="chat__links">
                          {getLinks(msg?.content, `${index}`)}
                        </div>
                      )}
                    </div>

                    {history.length === index + 1
                      ? !stream && chatActions(msg, index)
                      : chatActions(msg, index)}
                  </div>
                </div>
              )}
              {/* Capital Cortex draft Answer */}
              {/* <div>
                <figure>
                  <CapitalChatIcon />
                </figure>
                <div className="flex flex-col mb-2 w-full">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="chat__message bg-theme-gray-50 mb-2">
                      <span className="draft__span">Draft 1</span>
                      <span className="font-bold text-sm mb-1">Capital Cortex</span>
                      <div className="chatbot-answer"><ReactMarkdown>{history.length === index + 1 ? stream ? chatResponse : handleClean(msg?.content) : handleClean(msg?.content)}</ReactMarkdown></div>
                      {history.length === index + 1 && stream && (<span className="chatbot__writing__loader my-2" />)}
                      {!stream &&
                        <div id={`${index}`} className="chat__links">
                          {getLinks(msg?.content, `${index}`)}
                        </div>}
                    </div>
                    <div className="chat__message bg-theme-gray-50 mb-2">
                      <span className="draft__span">Draft 2</span>
                      <span className="font-bold text-sm mb-1">Capital Cortex</span>
                      <div className="chatbot-answer"><ReactMarkdown>{history.length === index + 1 ? stream ? chatResponse : handleClean(msg?.content) : handleClean(msg?.content)}</ReactMarkdown></div>
                      {history.length === index + 1 && stream && (<span className="chatbot__writing__loader my-2" />)}
                      {!stream &&
                        <div id={`${index}`} className="chat__links">
                          {getLinks(msg?.content, `${index}`)}
                        </div>}
                    </div>
                  </div>
                  <div className="flex gap-2 mb-4"><button onClick={() => NiceModal.show(LikeChatModal)}><LikeIcon /></button> <button onClick={() => NiceModal.show(DislikeChatModal)}><DisLikeIcon /></button></div>
                  {history.length === index + 1 ? !stream && chatActions(msg, index) : chatActions(msg, index)}
                </div>
              </div> */}
            </li>
          ))}
        </ul>
      ) : (
        // @ts-ignore
        <div
          className={`overflow-y-scroll scrollbar-hidden grow  ${
            router.pathname === "/ai-assistant"
            //@ts-ignore
              ? file?.name?.length > 0
                ? "h-[calc(100dvh_-_281px)] sm:h-[calc(100dvh_-_321px)] md:h-[calc(100dvh_-_393px)]"
                : "h-[calc(100dvh_-_230px)] sm:h-[calc(100dvh_-_265px)] md:h-[calc(100dvh_-_340px)]"
                //@ts-ignore
              : file?.name?.length > 0
              ? "h-[calc(100dvh_-_364px)] sm:h-[calc(100dvh_-_400px)] md:h-[calc(100dvh_-_460px)] xl:h-[calc(100dvh-460px)]"
              : "h-[calc(100dvh_-_280px)] sm:h-[calc(100dvh_-_365px)] md:h-[calc(100dvh_-_400px)] xl:h-[calc(100dvh_-_370px)]"
          }`}
        >
          <div className="chat__no__data">
            <figure className="sm:w-[20rem] sm:h-[20rem] relative w-36 h-32">
              <Image
                placeholder="blur"
                layout="fill"
                blurDataURL="https://capitalcortstorage.blob.core.windows.net/app-assets/No%20Chat%20History@3x.svg"
                src="https://capitalcortstorage.blob.core.windows.net/app-assets/No%20Chat%20History@3x.svg"
                alt="No Chat yet"
                quality={100}
              />
            </figure>
            <h2>Start Chat</h2>
            <p>{"Let's Chat! How can we assist you today?"}</p>
          </div>
        </div>
      )}
      <Textarea
        rows={1}
        autoResize={true}
        disabled={stream}
        value={question}
        onKeyDown={handleKeyDown}
        id="message"
        placeholder="Send a message"
        parentClass="md:w-full flex border border-theme-gray-125 rounded-lg !fixed md:!relative bottom-2 md:bottom-0 w-[95%] left-[2.5%] md:left-0"
        className="scrollbar-hidden border-none pr-24 max-h-56"
        labelClass="peer-placeholder-shown:top-7 peer-focus:top-2"
        onChange={(e: any) => {
          setQuestion(e.target.value);
        }}
      >
        <div className="chat__foot">
          <label className="rt-themeCustomTooltip" data-title={'Upload Document'}>
            <input {...getInputProps()} accept="application/pdf" type="file" />
            <ExportIcon className="text-theme-gray-300" color="#98999B" />
          </label>
          <Button
            disabled={question == ""}
            onClick={() => {
              getResponse(question);
            }}
            variant="black"
            size="small"
            className="!min-w-max !h-8 !w-8"
          >
            <ArrowUpIcon
              height={16}
              width={16}
              className="text-white"
              color="#fff"
            />
          </Button>
        </div>
      </Textarea>
      {file && (
        <div
          className={`chat__foot__action__icons !relative z-[1] overflow-hidden`}
          style={{ color: fileProgress > 20 ? "white" : 'black' }}
        >
          <div
            className={`${
              fileProgress > 0 &&
              `transition-all duration-500 ease-in-out bg-black h-full absolute left-0 top-0 z-[-1]`
            } `}
            style={{ width: fileProgress + "%" }}
          />
          <PdfFileIcon />
          {/* @ts-ignore */}
          <span className="text-sm">{fileProgress == 100 ? 'Processing File...' : file?.name}</span>
          <button onClick={() => handleUpload()}>
            <ArrowUpIcon
              stroke={`${fileProgress > 20 ? "white" : "black"}`}
              height={20}
              width={20}
            />
          </button>
          <button onClick={() => handleRemoveFile()}>
            <CloseIcon
              stroke={`${fileProgress > 20 ? "white" : "black"}`}
              height={20}
              width={20}
            />
          </button>
        </div>
      )}
    </>
  );
};

export default ChatBox;
