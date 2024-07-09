import DocumentsTableLastRowSkelton from "@/components/DocumentsTableLastRowSkelton";
import DocumentsTableRowSkelton from "@/components/DocumentsTableRowSkelton";
import { DeleteIcon, EditIcon, LoaderIcon } from "@/components/Icons";
import { loadChat } from "@/redux/slices/chatSlice";
import {
  deleteDocumentAsync,
  getSingleDocumentAsync,
  getUserDocumentsAsync,
} from "@/services/documentGeneration/asyncThunk";
import { userProfileMetaDataAsync } from "@/services/user/aysncThunk";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DocumentsModule = () => {
  const dispatch = useDispatch();
  const [fetchDocument, setFetchDocument] = useState(false);
  const { metaData } = useSelector((state: any) => state.user);
  const { documents, docId, documentSections, isLoading } = useSelector(
    (state: any) => state.documentGeneration
  );
  const router = useRouter();

  useEffect(() => {
    //@ts-ignore
    dispatch(getUserDocumentsAsync({}));

    if(Object.keys(metaData).length <= 0){
      //@ts-ignore
      dispatch(userProfileMetaDataAsync({}))
    }
  }, []);

  useEffect(() => {
    if(documents.length > 0){
        const statusCheck = documents.filter((doc: any) => {
            if (doc.status === "In Progress") {
                return doc;
            }
        });

        if(statusCheck.length > 0){
            setTimeout(() => {
                if(router.pathname == '/documents'){
                    //@ts-ignore
                    dispatch(getUserDocumentsAsync({}));
                }
            }, 5000);
        }
    }
  }, [documents])
  

  const handleDeleteDocument = (docId: string, chatId: string) => {
    //@ts-ignore
    dispatch(deleteDocumentAsync({ docId: docId, chatId: chatId }));
  };

  const getSingleDocument = (docId: string) => {
    setFetchDocument(true);
    //@ts-ignore
    dispatch(loadChat({ history: [], chatId: "", navigate: false }));
    //@ts-ignore
    dispatch(getSingleDocumentAsync({ docId: docId }));
  };

  useEffect(() => {
    if (fetchDocument && docId != "" && documentSections.length > 0) {
      router.push(`/documents/${docId}`);
    }
  }, [docId]);

  return (
    <>
      {/* for loading */}
      {/* <div className='flex justify-center items-center h-[calc(100vh-386px)]'>
            <LoaderIcon/>
        </div> */}
      <div className="projects__table__division">
        {
           !isLoading && documents.length === 0  ? (
            <div className="h-[calc(100vh-386px)] flex justify-center items-center">
              <div className="flex flex-col gap-4 items-center py-6">
                <figure className="sm:w-[15rem] sm:h-[15rem] relative w-36 h-32">
                  <Image
                    placeholder="blur"
                    layout="fill"
                    blurDataURL="https://capitalcortstorage.blob.core.windows.net/app-assets/cc/start_chat.svg"
                    src="https://capitalcortstorage.blob.core.windows.net/app-assets/cc/start_chat.svg"
                    alt="No Chat yet"
                    quality={100}
                  />
                </figure>
                <p className="font-bold text-2xl">No data found!</p>
              </div>
            </div>
          ) :
          (
            <table>
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Document Type</th>
                <th scope="col">Country</th>
                <th scope="col">Status</th>
                <th scope="col">Created Date</th>
                <th scope="col" className="!text-right">
                  <span>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* for rows skelton */}
              {isLoading && documents.length === 0 ? (
                [1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                  <tr key={index}>
                    <td>
                      <DocumentsTableRowSkelton />
                    </td>
                    <td>
                      <DocumentsTableRowSkelton />
                    </td>
                    <td>
                      <DocumentsTableRowSkelton />
                    </td>
                    <td>
                      <DocumentsTableRowSkelton />
                    </td>
                    <td>
                      <DocumentsTableRowSkelton />
                    </td>
                    <td className="text-right">
                      <DocumentsTableLastRowSkelton />
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  {documents.map((ele: any, i: number) => (
                    <tr className="cursor-pointer" key={i}>
                      <td
                        data-label="Title"
                        className="font-medium text-gray-900"
                        onClick={() => {
                          getSingleDocument(ele?._id);
                        }}
                      >
                        <h2>{ele.title ? ele.title : "N/A"}</h2>
                      </td>
                      <td
                        data-label="Doc Type"
                        className="font-medium text-gray-900"
                        onClick={() => {
                          getSingleDocument(ele?._id);
                        }}
                      >
                        <h2>{ele?.docType ? ele.docType : "N/A"}</h2>
                      </td>
                      <td
                        data-label="Country"
                        className="font-medium text-gray-900"
                        onClick={() => {
                          getSingleDocument(ele?._id);
                        }}
                      >
                        <h2>{ele?.country ? ele.country : "N/A"}</h2>
                      </td>
                      <td
                        data-label="Status"
                        className="text-gray-500"
                        onClick={() => {
                          getSingleDocument(ele?._id);
                        }}
                      >
                        <span
                          className={`projects__status ${
                            ele.status === "Failed"
                              ? "bg-tutu text-roman"
                              : ele.status === "Completed"
                              ? "bg-green_hint text-apple"
                              : "bg-theme-light text-theme"
                          } `}
                        >
                          {ele.status}
                        </span>
                      </td>
                      <td
                        data-label="Created Date"
                        className="text-gray-500"
                        onClick={() => {
                          getSingleDocument(ele?._id);
                        }}
                      >
                        {new Date(ele.created_at)
                          .toLocaleDateString("en-PK", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          })
                          .replace(/-/g, " ")}
                      </td>
                      <td data-label="Actions" className="text-right">
                        <button
                          onClick={() => {
                            getSingleDocument(ele?._id);
                          }}
                          className="me-4"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => {
                            handleDeleteDocument(ele?._id, ele?.chat);
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
          )
        }
       
      </div>
    </>
  );
};

export default DocumentsModule;
