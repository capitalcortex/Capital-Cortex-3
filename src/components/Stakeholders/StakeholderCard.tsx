import Image from "next/legacy/image";
import React, { Fragment } from "react";
import {
  DeleteIcon,
  DummyUserIcon,
  EditIcon,
  VerticalThreeDotsIcon,
} from "../Icons";
import Button from "../Buttons/Button";
import { Popover, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { setStakeholderDetails } from "@/redux/slices/stakeholderSlice";
import { deleteStakeholderAsync } from "@/services/stakeholder/asyncThunk";

interface Iprops {
  key?: any
  isOpen?:boolean,
  setIsOpen?:any,
  isDetailOpen?:boolean,
  setIsDetailOpen?:any,
  stakeholder?:any,
  setType?:any
}

const StakeholderCard = ({ key, setIsOpen, setIsDetailOpen, stakeholder, setType }: Iprops) => {
  const dispatch = useDispatch()

  return (
    <li key={key} className="stakeholder">
      <div className="p-4 flex items-start w-full justify-between">
        <div className="flex items-start gap-4 w-full">
          {
            stakeholder.profile_picture == '' ? (
              <DummyUserIcon className="h-14 w-14" />
            ) : (
              <figure className="flex-shrink-0 leading-[1px]">
                <Image
                  width={56}
                  height={56}
                  blurDataURL={stakeholder.profile_picture}
                  placeholder="blur"
                  src={stakeholder?.profile_picture}
                  alt="user"
                  className="rounded-full object-cover"
                />
              </figure>
            )
          }
          <div className="flex flex-col flex-grow">
            <h2 className="font-semibold line-clamp-2">{stakeholder?.fullname}</h2>
            <p className="text-theme-gray-400 h5 font-medium line-clamp-2">
              {stakeholder?.designation}
            </p>
          </div>
        </div>
        <Popover as={"div"} className={"relative leading-[1px]"}>
          <Popover.Button className="focus:outline-none">
            <VerticalThreeDotsIcon className="w-6 h-6" />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel
              className={
                "absolute right-0 mt-2 w-56 origin-top-right p-4 border rounded-xl bg-white focus:outline-none flex flex-col gap-2"
              }
            >
              <Button className="flex gap-2 !min-w-max !justify-start !p-0" onClick={() => {
                //@ts-ignore
                dispatch(setStakeholderDetails(stakeholder))
                setIsOpen(true)
                setType('Edit')
              }}>
                <EditIcon />
                <span>Edit</span>
              </Button>
              <Button className="flex gap-2 !min-w-max !justify-start !p-0" onClick={() => {
                //@ts-ignore
                dispatch(deleteStakeholderAsync({stakeId: stakeholder._id}))
              }}>
                <DeleteIcon color="#D0312D" />
                <span>Delete</span>
              </Button>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
      <div className="px-6 py-4 border-t border-theme-gray-125">
        <Button
          onClick={() => {
            //@ts-ignore
            dispatch(setStakeholderDetails(stakeholder))  
            setIsDetailOpen(true)
          }}
          type="button"
          className="font-semibold !min-w-max leading-1 fs-16 !px-3"
          size="small"
          variant="black-border"
        >
          View Details
        </Button>
      </div>
    </li>
  );
};

export default StakeholderCard;
