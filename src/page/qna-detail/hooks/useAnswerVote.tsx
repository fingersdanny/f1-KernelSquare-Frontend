import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import { errorMessage, notificationMessage } from "@/constants/message"
import queryKey from "@/constants/queryKey"
import { useClientSession } from "@/hooks/useClientSession"
import useModal from "@/hooks/useModal"
import voteAtoms from "@/recoil/atoms/vote"
import { deleteVote, voteAnswer } from "@/service/answers"
import { sleep } from "@/util/sleep"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useRecoilState } from "recoil"
import { twJoin } from "tailwind-merge"
import type { Answer } from "@/interfaces/answer"
import type { ModalState } from "@/interfaces/modal"

export interface VoteProps {
  answer: Answer
}

export interface DeleteVoteProps {
  successModal: NonNullable<ModalState["content"]>
}

const useAnswerVote = ({ answer }: VoteProps) => {
  const [vote, setVote] = useRecoilState(voteAtoms(answer?.created_by))
  const queryClient = useQueryClient()
  const { user } = useClientSession()
  const { openModal } = useModal()

  const buttonClass = twJoin([
    "text-[30px]",
    `${user ? "hover:text-primary cursor-pointer" : "text-slate-300"}`,
  ])

  const raiseClass = twJoin([
    buttonClass,
    `${answer.vote_status === 1 && "text-primary"}`,
  ])
  const reduceClass = twJoin([
    buttonClass,
    `${answer.vote_status === -1 && "text-primary"}`,
  ])

  const handleRaise = async () => {
    if (!user)
      return toast.error(errorMessage.unauthorized, { position: "top-center" })
    try {
      const res = await voteAnswer({
        answerId: answer?.answer_id,
        member_id: user.member_id,
        status: 1,
      })
      console.log("[set vote]", res)

      queryClient.invalidateQueries({ queryKey: [queryKey.answer] })
      console.log("status", answer.vote_status)
    } catch (err) {
      console.error("error", err)
    }
  }

  const handleReduce = async () => {
    if (!user)
      return toast.error(errorMessage.unauthorized, { position: "top-center" })
    try {
      const res = await voteAnswer({
        answerId: answer.answer_id,
        member_id: user.member_id,
        status: -1,
      })
      console.log("res", res.data.msg)
      queryClient.invalidateQueries({ queryKey: [queryKey.answer] })
    } catch (err) {
      console.error("error", err)
    }
  }

  const handleCancle = ({ successModal }: DeleteVoteProps) => {
    if (!user)
      return toast.error(errorMessage.unauthorized, { position: "top-center" })
    const onSuccess = async () => {
      try {
        const res = await deleteVote({
          answerId: answer.answer_id,
        })

        console.log("success", res.data.msg)
        openModal({
          content: successModal,
          onClose() {
            queryClient.invalidateQueries({
              queryKey: [queryKey.answer],
            })
          },
        })
        sleep(5000).then(() => {
          queryClient.invalidateQueries({
            queryKey: [queryKey.answer],
          })
        })
      } catch (err) {
        console.error(err)
      }
    }
    const onCancel = () => {
      toast.error(notificationMessage.cancleDeleteVote, {
        position: "top-center",
      })
    }
    openModal({
      containsHeader: false,
      content: (
        <ConfirmModal.ModalContent
          onSuccess={onSuccess}
          onCancel={onCancel}
          situation="cancleVote"
        />
      ),
    })
  }

  const replaceNumber = (num: number) => {
    if (0 <= num && num < 10) return "0" + num
    return num
  }

  return {
    vote,
    setVote,
    handleRaise,
    handleReduce,
    handleCancle,
    raiseClass,
    reduceClass,
    replaceNumber,
  }
}

export default useAnswerVote
