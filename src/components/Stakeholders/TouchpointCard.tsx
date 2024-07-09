import React, { Fragment } from 'react'
import { DeleteIcon, EditIcon, VerticalThreeDotsIcon } from '../Icons'
import { Menu, Transition } from '@headlessui/react'
import EditNote from '@/components/Modals/EditNote/EditNote'
import NiceModal from '@ebay/nice-modal-react'
import Button from '../Buttons/Button'
import { useDispatch } from 'react-redux'
import { deleteNotesTouchpointsAsync } from '@/services/stakeholder/asyncThunk'
import EditTouchPoint from '../Modals/EditTouchPoint/EditTouchPoint'
interface Iprops {
    key?: number;
    type: string;
    details?: any;
    stakeId?: any;
}

const TouchpointCard = ({ key, type, details, stakeId }: Iprops) => {

    const dispatch = useDispatch()

    // Define months array for mapping month numbers to month names
    const months = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun",
        "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec"
    ];

    // Function to format time to 12-hour format with "am" or "pm"
    const formatAMPM = (date: any) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    const handleDelete = () => {
        //@ts-ignore
        dispatch(deleteNotesTouchpointsAsync({
            type: type,
            stakeId: stakeId,
            contentId: details?._id
        }))
    }

    return (
        <li key={key} className='p-4 sm:p-6 border border-theme-gray-100 rounded-lg'>
            <div className="flex justify-between items-center mb-3">
                <time className='text-theme-gray-325 fs-16'>{
                    // @ts-ignore
                    new Date(details?.updated_at)
                        .toLocaleDateString("en-PK", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                        })
                        .replace(/-/g, " ")
                }</time>
                {type === "touch_point" ?
                    <Menu as={"div"} className={"relative"}>
                        <Menu.Button>
                            <VerticalThreeDotsIcon className="w-4 h-4" color="black" />
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className={"absolute right-0 mt-2 w-56 origin-top-right p-4 border rounded-xl bg-white focus:outline-none flex flex-col gap-2"}>
                                <Menu.Item
                                    onClick={() => NiceModal.show(EditTouchPoint, {stakeId: stakeId, contentId: details?._id, type: 'touch_point', content: details?.content})}
                                    as={"button"}
                                    className={"flex gap-4"}>
                                    <EditIcon />
                                    <span>Edit</span>
                                </Menu.Item>
                                <Menu.Item onClick={handleDelete} as={"button"} className={"flex gap-4"}>
                                    <DeleteIcon color="#D0312D" />
                                    <span>Delete</span>
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu> :
                    <div className="flex items-center gap-4">
                        <Button onClick={handleDelete} className='min-w-max p-0'>
                            <DeleteIcon color="#D0312D" />
                        </Button>
                        <Button className='min-w-max p-0' onClick={() => NiceModal.show(EditNote, {stakeId: stakeId, contentId: details?._id, type: 'note', content: details?.content})}>
                            <EditIcon />
                        </Button>
                    </div>
                }
            </div>
            <div className='flex flex-col'>
                <p className='text-theme-gray-450 fs-16 break-all'>
                    {details?.content}
                </p>
            </div>
        </li>
    )
}

export default TouchpointCard