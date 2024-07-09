import React, { useState } from 'react'
import Searchbar from '@/components/Searchbar/Searchbar'
import SearchFilter from '@/components/SearchFilter'
import { useRouter } from 'next/router';
import debounce from "lodash/debounce";
import { useDispatch } from 'react-redux';
import { searchDocumentsAsync } from '@/services/documentGeneration/asyncThunk';
import { searchStakeholdersAsync } from '@/services/stakeholder/asyncThunk';

interface Iprops {
    title: string,
    description: string,
    children?: any;
}
const GlobalHeadingSection = ({ title, description, children }: Iprops) => {

    const router = useRouter()
    const dispatch = useDispatch()

    const debouncedSearch = debounce((search: string) => {
        if(router.pathname.includes('documents')){
            //@ts-ignore
            dispatch(searchDocumentsAsync({ search: search }));
        }else{
            //@ts-ignore
            dispatch(searchStakeholdersAsync({ search: search }));
        }
        
    }, 700);

    return (
        <>
            <div className="globalHead">
                <div className='flex flex-col'>
                    <h2 className="globalHeading__title globalHead__title">{title}</h2>
                    <p className="globalHeading__description globalHead__description">{description}</p>
                </div>
                <div className='globalHeading__filterSection globalHead__filterSection'>
                    <Searchbar onChange={(e: any) => {
                        debouncedSearch(e.target.value)
                    }}/>
                    <SearchFilter />
                {children}
                </div>
            </div>
        </>
    )
}
export default GlobalHeadingSection