import {
  errorMessage,
  notificationMessage,
  successMessage,
} from "@/constants/message"
import { useClientSession } from "@/hooks/useClientSession"
import { IntroductionEditMode } from "@/recoil/atoms/mode"
import { toast } from "react-toastify"
import { useRecoilState } from "recoil"
import { useQueryClient } from "@tanstack/react-query"
import queryKey from "@/constants/queryKey"
import { memberQueries } from "@/react-query/member"

const useIntroduction = () => {
  /**
   * 자기소개 수정 관련
   */
  const [isIntroductionEditMode, setIsIntroductionEditMode] =
    useRecoilState(IntroductionEditMode)
  const closeIntroductionEditMode = () => setIsIntroductionEditMode(false)
  const { updateMemberIntroduction } =
    memberQueries.useUpdateMemberIntroduction()

  const handleIntroductionEditMode = () =>
    setIsIntroductionEditMode((prev: boolean) => !prev)
  const { user } = useClientSession()
  const queryClient = useQueryClient()

  const handleSubmitIntroduction = (introduction: string) => {
    if (!user) {
      toast.error(errorMessage.unauthorized, {
        toastId: "unauthorizedToChangeIntroduction",
        position: "top-center",
        autoClose: 1000,
      })
      return
    }
    if (introduction.length < 10) {
      toast.error(errorMessage.introductionLimitUnder, {
        toastId: "introductionLimitUnder",
        position: "top-center",
        autoClose: 1000,
      })
      return
    }
    if (introduction.length > 1000) {
      toast.error(errorMessage.introductionLimitOver, {
        toastId: "introductionLimitOver",
        position: "top-center",
        autoClose: 1000,
      })
      return
    }

    try {
      updateMemberIntroduction(
        {
          memberId: user?.member_id,
          introduction: introduction,
        },
        {
          onSuccess: () => {
            toast.success(successMessage.editIntroduction, {
              toastId: "successToEditIntroduction",
              position: "top-center",
              autoClose: 1000,
            })
            queryClient.invalidateQueries({
              queryKey: [queryKey.user, queryKey.profile, user.member_id],
            })
            return closeIntroductionEditMode()
          },
        },
      )
    } catch (err) {
      toast.error(errorMessage.failToUploadIntroduction, {
        toastId: "failToEditIntroduction",
        position: "top-center",
        autoClose: 1000,
      })
      throw new Error("자기소개 업데이트 중 에러가 발생하였습니다.")
    }
  }

  const handleCancleEditIntroduction = () =>
    toast.error(notificationMessage.cancleEditIntroduction, {
      toastId: "cancleEditIntroduction",
      position: "top-center",
    })

  return {
    isIntroductionEditMode,
    setIsIntroductionEditMode,
    closeIntroductionEditMode,
    handleIntroductionEditMode,
    handleSubmitIntroduction,
    handleCancleEditIntroduction,
  }
}

export default useIntroduction
