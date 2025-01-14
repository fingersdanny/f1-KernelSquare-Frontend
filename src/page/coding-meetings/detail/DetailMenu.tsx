"use client"

import Spacing from "@/components/shared/Spacing"
import Button from "@/components/shared/button/Button"
import { useClientSession } from "@/hooks/useClientSession"
import useModal from "@/hooks/useModal"
import { CodingMeetingAuthor } from "@/interfaces/coding-meetings"
import { APIResponse } from "@/interfaces/dto/api-response"
import { codingMeetingEditCommentAtom } from "@/recoil/atoms/coding-meeting/comment"
import { deleteCodingMeeting } from "@/service/coding-meetings"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, HttpStatusCode } from "axios"
import { useRouter } from "next/navigation"
import Dropdown from "rc-dropdown"
import Menu, { MenuItem } from "rc-menu"
import { MdMoreVert } from "react-icons/md"
import { toast } from "react-toastify"
import { useResetRecoilState } from "recoil"
import { twMerge } from "tailwind-merge"

interface DetailMenuProps {
  token: string
  author: CodingMeetingAuthor
}

function DetailMenu({ token, author }: DetailMenuProps) {
  const { user } = useClientSession()

  const isAuthor = user?.nickname === author.member_nickname

  if (!isAuthor) return null

  return (
    <Dropdown
      trigger={["click"]}
      overlay={<DetailDropDownMenu token={token} />}
    >
      <Button className="w-fit flex justify-center items-center">
        <MdMoreVert className="shrink-0 text-2xl" />
      </Button>
    </Dropdown>
  )
}

export default DetailMenu

function DetailDropDownMenu({ token }: { token: string }) {
  const { push } = useRouter()

  const { openModal } = useModal()

  const dropdownMenu = ["수정하기", "삭제하기"] as const

  const handleMenu = (menu: "수정하기" | "삭제하기" | "마감하기") => () => {
    switch (menu) {
      case "수정하기":
        push(`/coding-meetings/post/${token}`)

        break
      case "삭제하기":
        openModal({
          closeableDim: false,
          containsHeader: false,
          content: <DetailConfirmModal token={token} type="delete" />,
        })

        break
    }
  }

  const textClassName = (menu: "수정하기" | "삭제하기") =>
    twMerge("text-[#4F4F4F]", menu === "삭제하기" && "text-[#EB5858]")

  return (
    <Menu className="!py-2 !text-sm">
      {dropdownMenu.map((menu) => {
        return (
          <MenuItem
            key={`rc-detail-menu-item-${menu}`}
            onClick={handleMenu(menu)}
            className="cursor-pointer flex w-full justify-center items-center !px-4 !py-2 box-border bg-white hover:bg-colorsLightGray"
          >
            <span className={textClassName(menu)}>{menu}</span>
          </MenuItem>
        )
      })}
    </Menu>
  )
}

function DetailConfirmModal({
  token,
  type,
}: {
  token: string
  type: "delete"
}) {
  const Modal = () => {
    switch (type) {
      case "delete":
        return <DeleteModal token={token} />
      default:
        return null
    }
  }

  return (
    <div className="w-full sm:w-[320px]">
      <Modal />
    </div>
  )
}

function DeleteModal({ token }: { token: string }) {
  const { clientSessionReset } = useClientSession()
  const resetCodingMeetingEditComment = useResetRecoilState(
    codingMeetingEditCommentAtom,
  )

  const { replace } = useRouter()

  const queryClient = useQueryClient()

  const { closeModal } = useModal()

  const { mutate: deleteCodingMeetingMutate, status } = useMutation({
    mutationFn: () => deleteCodingMeeting({ coding_meeting_token: token }),
    onSuccess: () => {
      closeModal()

      toast.success("모각코 삭제 성공", { position: "top-center" })

      queryClient.invalidateQueries({
        queryKey: ["codingMeeting", "list"],
      })

      replace("/coding-meetings")
    },
    async onError(error) {
      closeModal()

      if (error instanceof AxiosError) {
        const { response } = error as AxiosError<APIResponse>

        if (response?.status === HttpStatusCode.Unauthorized) {
          resetCodingMeetingEditComment()

          await clientSessionReset()
          revalidatePage("*")

          setTimeout(() => {
            toast.error("로그인 후 모각코 삭제가 가능합니다", {
              position: "top-center",
              toastId: "delteServerErrorToast",
            })
          }, 0)

          return
        }

        toast.error(response?.data.msg ?? "모각코 삭제 요청이 실패했습니다", {
          position: "top-center",
          toastId: "delteServerErrorToast",
        })

        return
      }

      toast.error("모각코 삭제 요청이 실패했습니다", {
        position: "top-center",
        toastId: "deleteErrorToast",
      })
    },
  })

  const handleDelete = () => {
    if (status === "pending") return

    deleteCodingMeetingMutate()
  }

  const handleCancel = () => {
    closeModal()
  }

  return (
    <section className="w-full flex flex-col items-center">
      <h4>모각코 모임을 삭제하시겠습니까?</h4>
      <Spacing size={24} />
      <div className="flex w-full justify-center items-center gap-4">
        <Button
          disabled={status === "pending"}
          className="w-fit h-fit disabled:bg-colorsGray"
          buttonTheme="primary"
          onClick={handleDelete}
        >
          <span>{status === "pending" ? "삭제 요청중" : "삭제"}</span>
        </Button>
        <Button
          disabled={status === "pending"}
          className="w-fit h-fit disabled:bg-colorsGray"
          buttonTheme="secondary"
          onClick={handleCancel}
        >
          취소
        </Button>
      </div>
    </section>
  )
}
