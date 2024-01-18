export const errorMessage = {
  noContent: "본문 내용을 작성해주세요",
  introductionLimit: "최대 300자까지 입력 가능합니다.",
  imageUploadLimit: "이미지 파일 업로드는 1장만 가능합니다",
  unauthorized: "로그인 후 다시 이용해주세요",
  failToUploadImage:
    "이미지 업로드 중 오류가 발생하였습니다. 다시 시도해주세요.",
  emptyCookie: "쿠키가 비어있습니다.",
  deleteAnswer: "답변 삭제 중 오류가 발생하였습니다.",
  deleteQuestion: "질문 삭제 중 오류가 발생하였습니다.",
  updateAnswer: "답변 수정 중 오류가 발생하였습니다.",
  tryAgain: "잠시 후 다시 시도해주세요.",
  saySorry: "이용에 불편을 드려 죄송해요.",
  duplicatedVote: "답변에 대한 투표는 한 번만 진행할 수 있습니다.",
} as const

export const successMessage = {
  editProfileImage: "프로필 이미지 변경에 성공했습니다.",
  editIntroduction: "자기소개 수정에 성공했습니다.",
  deleteAnswer: "답변이 삭제되었습니다.",
  createAnswer: "답변이 생성되었습니다.",
  updateAnswer: "답변이 수정되었습니다.",
  deleteQuestion: "질문이 삭제되었습니다.",
  cancleVote: "투표 기록이 삭제되었습니다.",
} as const

export const notificationMessage = {
  noAnswer:
    "아직 작성된 답변이 존재하지 않습니다. 첫 번째 답변의 주인공이 되어보세요!",
  myQuestion: "아직 작성된 답변이 존재하지 않습니다.",
  cancleUploadImage: "사진 저장이 취소되었습니다.",
  cancleDeleteAnswer: "답변 삭제가 취소되었습니다.",
  cancleDeleteQuestion: "질문 삭제가 취소되었습니다.",
  cancleDeleteVote: "투표 기록 삭제가 취소되었습니다.",
  answerWithoutToken: "로그인하고 질문에 대한 답변을 남겨보세요!",
} as const

export const confirmMessage = {
  editProfileImage: "변경된 사진으로 저장하시겠습니까?",
  deleteContent: "정말 삭제하시겠습니까?",
  cancleVote: "투표 기록을 삭제하시겠습니까?",
} as const

export const loadingMessage = {
  deleteAnswer: "답변 삭제가 진행 중이에요.",
} as const

export const buttonMessage = {
  goToLogIn: "로그인 하러 가기",
  postMyAnswer: "답변 남기기",
  scrollToTop: "TOP",
  updateProfile: "프로필 변경",
  edit: "수정하기",
  delete: "삭제하기",
} as const