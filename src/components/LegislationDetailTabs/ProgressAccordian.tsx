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
import { DocsIcon } from "../svgs";

const ProgressAccordian = () => {
  const dispatch = useDispatch();
  const { lists } = useSelector((state: any) => state.chat);

  return (
        <div className="overflow-y-scroll scrollbar-hidden grow gap-2 flex flex-col">
          {/* {lists.map((list: any, key: number) => ( */}
            <Disclosure
              as={"div"}
            //   key={key}
              className="pogress__disclosure"
            //   defaultOpen={}
            >
              {({ open }) => (
                <>
                  <Disclosure.Button className={`pogress__disclosure__btn`}>
                    <div className='flex gap-3 items-center'>
                    <span className='shrink-0'><DocsIcon /></span>
                    <div>
                      <p className='text-sm text-left font-bold'>First reading</p>
                      <span className='text-theme-gray-325 sm:text-base text-sm'>SCompleted on February 8, 2022</span>
                    </div>
                  </div>
                    <DownArrowIcon
                          className={`${
                            open ? "rotate-90" : "rotate-0"
                          } transition-all duration-300`}
                        />
                  </Disclosure.Button>
                    <Disclosure.Panel
                      as={"div"}
                      className={"pogress__disclosure__panel"}
                    >
                      <div className="py-3 px-4 rounded-md bg-theme-gray-75">
                        <p className="text-sm text-left font-bold">End of stage activity</p>
                        <span className='text-theme-gray-325'>Introduction and first reading, February 8, 2022</span>
                      </div>

                      <div>
                        <h5 className='text-sm text-left font-bold mb-3'>Chamber Sittings</h5>
                        <div className="py-3 px-4 rounded-t-md bg-theme-gray-75 grid grid-cols-2">
                            <p className="text-xs font-bold">Sitting date</p>
                            <span className="text-xs font-bold">Debates (Hansard)</span>
                        </div>
                        <div className="py-3 px-4 grid grid-cols-2">
                            <p className="text-xs">February 8, 2022</p>
                            <span className="text-xs font-bold"><u>Sitting 15</u></span>
                        </div>
                      </div>
                    </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          {/* ))} */}
        </div>
  );
};

export default ProgressAccordian;
