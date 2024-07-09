import React, { useEffect } from "react";
import Button from "../Buttons/Button";
import { ChatListIcon, DeleteIcon } from "../Icons";
import { useDispatch, useSelector } from "react-redux";
import { chatHistoryAsync } from "@/services/chat/asyncThunk";
import { loadChat, setDeleteChat } from "@/redux/slices/chatSlice";
import NiceModal from "@ebay/nice-modal-react";
import DeleteChatModal from "../Modals/DeleteChatModal/DeleteChatModal";
import Image from "next/image";
import Markdown from "react-markdown";
import ChatSkelton from "../ChatSkelton";
const ChatList = () => {
  const dispatch = useDispatch();
  const { prevChats, chatId, listLoading } = useSelector(
    (state: any) => state.chat
  );

  useEffect(() => {
    //@ts-ignore
    dispatch(chatHistoryAsync({}));
  }, []);

  const handleLoadChat = (history: [], chatId: string) => {
    //@ts-ignore
    dispatch(loadChat({ history: history, chatId: chatId, navigate: true }));
  };

  const handleNewChat = () => {
    //@ts-ignore
    dispatch(loadChat({ history: [], chatId: "", navigate: true }));
  };

  return (
    <>
      {listLoading ? (
        <div className="overflow-y-scroll scrollbar-hidden grow h-[calc(100dvh_-_294px)] sm:h-[calc(100dvh_-_358px)] md:h-[calc(100dvh_-_445px)] xl:h-[calc(100dvh_-_380px)] pt-6">
          <div className="chat__list__container">
            <ul>
              {
                [1,2,3,4,5,6].map((item: number) => (
                  <ChatSkelton key={item}/>
                ))
              }
            </ul>
          </div>
        </div>
      ) : (
        <>
          {prevChats.length > 0 ? (
            <>
              <Button
                variant="black"
                onClick={handleNewChat}
                className="chat__list__btn"
              >
                Start New Chat
              </Button>
              <div className="overflow-y-scroll scrollbar-hidden grow h-[calc(100dvh_-_294px)] sm:h-[calc(100dvh_-_358px)] md:h-[calc(100dvh_-_445px)] xl:h-[calc(100dvh_-_380px)] pt-6">
                <div className="chat__list__container">
                  {/* <h4>Today’s</h4> */}
                  <ul>
                    {prevChats.map((item: any, i: number) => (
                      <li key={i}>
                        <button className="rt-themeCustomTooltip" type="button">
                          <div className="overflow-hidden chat !pe-10">
                            <span
                              className="flex gap-2"
                              onClick={() => {
                                handleLoadChat(item?.history, item?._id);
                              }}
                            >
                              <ChatListIcon color="#1A1B20" />
                              <Markdown>{item?.title}</Markdown>
                            </span>
                            <span
                              onClick={() => {
                                dispatch(
                                  //@ts-ignore
                                  setDeleteChat({
                                    chatId: item?._id,
                                  })
                                );
                                NiceModal.show(DeleteChatModal);
                              }}
                              className="absolute right-0 bg-theme-gray-50 p-2"
                            >
                              <DeleteIcon
                                height={20}
                                width={20}
                                color="#D0312D"
                              />
                            </span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-4 items-center py-10">
              <figure className="sm:w-[12rem] sm:h-[12rem] relative w-26 h-22">
                <Image
                  placeholder="blur"
                  layout="fill"
                  blurDataURL="https://capitalcortstorage.blob.core.windows.net/app-assets/cc/start_chat.svg"
                  src="https://capitalcortstorage.blob.core.windows.net/app-assets/cc/start_chat.svg"
                  alt="No Chat yet"
                  quality={100}
                />
              </figure>
              <p className="font-bold text-2xl">No Chats Found!</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ChatList;
