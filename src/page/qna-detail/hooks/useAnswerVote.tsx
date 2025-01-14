import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import {
  errorMessage,
  notificationMessage,
  pendingMessage,
  successMessage,
} from "@/constants/message"
import queryKey from "@/constants/queryKey"
import { useClientSession } from "@/hooks/useClientSession"
import useModal from "@/hooks/useModal"
import voteAtoms from "@/recoil/atoms/vote"
import { sleep } from "@/util/sleep"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useRecoilState } from "recoil"
import { twJoin } from "tailwind-merge"
import type { Answer } from "@/interfaces/answer"
import type { ModalState } from "@/interfaces/modal"
import { answerQueries } from "@/react-query/answers"

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
  const { voteAnswer, voteAnswerStatus } = answerQueries.useVoteAnswer()
  const { deleteVoteAnswer, deleteVoteAnswerStatus } =
    answerQueries.useDeleteVoteAnswer()

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
      return toast.error(errorMessage.unauthorized, {
        toastId: "upauthorizedToVote",
        position: "top-center",
      })
    try {
      if (voteAnswerStatus.isVoteAnswer)
        return toast.error(pendingMessage.votePending, {
          toastId: "votePending",
          position: "top-center",
        })
      voteAnswer(
        {
          answerId: answer?.answer_id,
          member_id: user.member_id,
          status: 1,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey.answer] })
          },
        },
      )
    } catch (err) {
      toast.error(errorMessage.failToVote, {
        toastId: "failToVote",
        position: "top-center",
      })
      throw new Error("투표 진행 중 오류가 발생했습니다.")
    }
  }

  const handleReduce = async () => {
    if (!user)
      return toast.error(errorMessage.unauthorized, {
        toastId: "upauthorizedToVote",
        position: "top-center",
      })
    try {
      if (voteAnswerStatus.isVoteAnswer)
        return toast.error(pendingMessage.votePending, {
          toastId: "votePending",
          position: "top-center",
        })
      voteAnswer(
        {
          answerId: answer.answer_id,
          member_id: user.member_id,
          status: -1,
        },
        {
          onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: [queryKey.answer] }),
        },
      )
    } catch (err) {
      toast.error(errorMessage.failToVote, {
        toastId: "failToVote",
        position: "top-center",
      })
      throw new Error("투표 진행 중 오류가 발생했습니다.")
    }
  }

  const handleCancle = () => {
    if (!user)
      return toast.error(errorMessage.unauthorized, {
        toastId: "upauthorizedToVote",
        position: "top-center",
      })
    if (deleteVoteAnswerStatus.isDeleteVoteAnswer)
      return toast.error(pendingMessage.votePending, {
        toastId: "votePending",
        position: "top-center",
      })
    const onSuccess = async () => {
      try {
        deleteVoteAnswer(
          {
            answerId: answer.answer_id,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: [queryKey.answer],
              })
              toast.success(successMessage.cancleVote, {
                position: "top-center",
              })
              sleep(5000).then(() => {
                queryClient.invalidateQueries({
                  queryKey: [queryKey.answer],
                })
              })
            },
          },
        )
      } catch (err) {
        toast.error(errorMessage.failToVote, {
          toastId: "failToVote",
          position: "top-center",
        })
        throw new Error("투표 진행 중 오류가 발생했습니다.")
      }
    }
    const onCancel = () => {
      toast.error(notificationMessage.cancleDeleteVote, {
        toastId: "cancleDeleteVote",
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
