import NiceModal from "@ebay/nice-modal-react";
import SuccessModal from "./SuccessModal/SuccessModal";
import VerificationEmailSentModal from "./VerificationEmailSentModal/VerificationEmailSentModal";
import CreateNewDocumentModal from "./CreateNewDocumentModal/CreateNewDocumentModal";
import AddPhoneModal from "./AddPhoneModal/AddPhoneModal";
import AddEmailModal from "./AddEmailModal/AddEmailModal";
import AddStakeholderEmployee from "./AddStakeholderEmployee/AddStakeholderEmployee";
import DeleteNoteModal from "./DeleteNoteModal/DeleteNoteModal";
import ShowNoteModal from "./ShowNoteModal/ShowNoteModal";
import ResetSuccessModal from "./ResetSuccessModal/ResetSuccessModal";
import AdvisoryBoardMemberDetailModal from "./AdvisoryBoardMemberDetailModal/AdvisoryBoardMemberDetailModal";
import GeneratePlanModal from "./GeneratePlanModal/GeneratePlanModal";
import DislikeChatModal from "./DislikeChat/DislikeChat";
import LikeChatModal from "./LikeChat/LikeChat";

const modalList: any = [
  { name: "SuccessModal", source: SuccessModal },
  { name: "VerificationEmailSentModal", source: VerificationEmailSentModal },
  { name: "CreateNewDocumentModal", source: CreateNewDocumentModal },
  { name: "AddPhoneModal", source: AddPhoneModal },
  { name: "AddEmailModal", source: AddEmailModal },
  { name: "AddStakeholderEmployee", source: AddStakeholderEmployee },
  { name: "DeleteNoteModal", source: DeleteNoteModal },
  { name: "ShowNoteModal", source: ShowNoteModal },
  { name: "ResetSuccessModal", source: ResetSuccessModal },
  { name: "AdvisoryBoardMemberDetailModal", source: AdvisoryBoardMemberDetailModal },
  { name: "generatePlan", source: GeneratePlanModal },
  { name: "dislikeChat", source: DislikeChatModal },
  { name: "likeChat", source: LikeChatModal },
  
];
modalList.map((modal: any) => NiceModal.register(modal.name, modal.source));
