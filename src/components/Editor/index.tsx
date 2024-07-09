import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import dynamic from "next/dynamic";
import { CloseIcon } from "../Icons";
import Button from "../Buttons/Button";
import Input from "../Input/Input";
const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
);

export default function EditorPopup(props: any) {
    return (
        <Transition.Root show={props.show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={props.onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-full justify-center p-4 text-center items-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white px-6 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl py-6 sm:px-16 sm:py-8">
                                <div>
                                    <Dialog.Title
                                        as="h3"
                                        className="text-2xl font-medium leading-6 text-secondary-200 text-center py-2 mb-5"
                                    >
                                        {props.isEditing ? "Edit" : "Add"} {props?.title}
                                    </Dialog.Title>
                                    <button
                                        type="button"
                                        className="absolute right-5 top-5 text-xl block md:hidden z-100"
                                        onClick={props.onClick}
                                    >
                                        <span className="sr-only">Close</span>
                                        <CloseIcon className="text-theme-gray-275 h-5 w-5" />
                                    </button>
                                    <Input
                                        parentClass="w-full my-4"
                                        placeholder="Title"
                                        value={props.sectionTitle}
                                        onChange={(e: any) => { props.setTitle(e.target.value) }}
                                    />
                                    <Editor
                                        editorState={props.editorState}
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        onEditorStateChange={props.onEditorStateChange}
                                    />
                                </div>
                                <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row justify-center gap-4">
                                    <Button
                                        variant="black"
                                        onClick={props.onClick}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="theme-dark"
                                        onClick={() => {
                                            props.onUpdate()
                                            props.onClick()
                                        }}
                                    >
                                        {props.isEditing ? "Edit" : "Add"}
                                    </Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
