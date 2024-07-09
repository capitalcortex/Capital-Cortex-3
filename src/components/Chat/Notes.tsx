import React, { Fragment } from "react";
import Button from "@/components/Buttons/Button";
import { Disclosure } from "@headlessui/react";
import { DeleteIcon, DownArrowIcon } from "../Icons";
import NiceModal from "@ebay/nice-modal-react";
import DeleteNoteModal from "../Modals/DeleteNoteModal/DeleteNoteModal";
import CreateNewListModal from "../Modals/CreateNewList/CreateNewList";
import { useDispatch, useSelector } from "react-redux";
import { setDeleteNote, setListBack } from "@/redux/slices/chatSlice";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

const Notes = () => {
  const dispatch = useDispatch();
  const { lists } = useSelector((state: any) => state.chat);

  return (
    <>
      <Button
        variant="black"
        onClick={() => {
          //@ts-ignore
          dispatch(setListBack(false));
          NiceModal.show(CreateNewListModal);
        }}
        className="chat__list__btn"
      >
        Create New List
      </Button>
      {lists.length > 0 ? (
        <div className="overflow-y-scroll scrollbar-hidden grow h-[calc(100dvh_-_294px)] sm:h-[calc(100dvh_-_358px)] md:h-[calc(100dvh_-_450px)] xl:h-[calc(100dvh_-_380px)] gap-2 flex flex-col pt-6">
          {lists.map((list: any, key: number) => (
            <Disclosure
              as={"div"}
              key={key}
              className="notes__disclosure"
              defaultOpen={key == 0 ? true : false}
            >
              {({ open }) => (
                <>
                  <Disclosure.Button className={`notes__disclosure__btn`}>
                    <p className="notes__disclosure__para">{list?.title}</p>
                    {list?.notes.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="notes__disclosure__count">{list?.notes.length}</span>
                        <DownArrowIcon
                          className={`${
                            open ? "rotate-90" : "rotate-0"
                          } transition-all duration-300`}
                        />
                      </div>
                    )}
                  </Disclosure.Button>
                  {list?.notes.length > 0 && (
                    <Disclosure.Panel
                      as={"div"}
                      className={"notes__disclosure__panel"}
                    >
                      {list.notes.map((listNote: any, nkey: number) => (
                        <Disclosure key={nkey} as={Fragment}>
                          {({ open }) => (
                            <>
                              <div className="flex gap-3 justify-between">
                                <Disclosure.Button>
                                  <p className="notes__disclosure__panel__para">
                                    {listNote?.note.slice(0, 100)}
                                  </p>
                                  <DownArrowIcon
                                    className={`${
                                      open ? "rotate-90" : "rotate-0"
                                    } transition-all duration-300`}
                                  />
                                </Disclosure.Button>
                                <button
                                  onClick={() => {
                                    dispatch(
                                      //@ts-ignore
                                      setDeleteNote({
                                        listId: list?._id,
                                        index: nkey,
                                      })
                                    );
                                    NiceModal.show(DeleteNoteModal);
                                  }}
                                >
                                  <DeleteIcon
                                    height={20}
                                    width={20}
                                    color="#D0312D"
                                  />
                                </button>
                              </div>
                              <Disclosure.Panel
                                as={"text"}
                                className="chat__message"
                              >
                                <ReactMarkdown>{listNote?.note}</ReactMarkdown>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </Disclosure.Panel>
                  )}
                </>
              )}
            </Disclosure>
          ))}
        </div>
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
          <p className="font-bold text-2xl">No Lists Found!</p>
        </div>
      )}
    </>
  );
};

export default Notes;
