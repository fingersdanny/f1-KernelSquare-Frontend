"use client"

import { useClientSession } from "@/hooks/useClientSession"
import { PopupMessage } from "@/page/coffee-chat/chat/ChatRoomHeader"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

type ErrorType =
  | "LoginRequired"
  | "Unactived"
  | "NotMatch"
  | "NotFound"
  | "Unauthorization"

interface ChatErrorProps {
  errorType: ErrorType
}

function ChatError({ errorType }: ChatErrorProps) {
  const ChatErrorComponent = () => {
    switch (errorType) {
      case "LoginRequired":
        return <ChatError.LoginRequired />
      case "Unactived":
        return <ChatError.Unactived />
      case "NotMatch":
        return <ChatError.NotMatch />
      case "NotFound":
        return <ChatError.NotFound />
      case "Unauthorization":
        return <ChatError.Unauthorization />
      default:
        return <div>알 수 없는 에러가 발생했습니다</div>
    }
  }

  return (
    <div className="flex w-full justify-center items-center">
      <ChatErrorComponent />
    </div>
  )
}

export default ChatError

ChatError.LoginRequired = function ChatLoginRequired() {
  const { clientSessionReset } = useClientSession()

  const searchParams = useSearchParams()
  const isPopup = searchParams.get("popup")

  useEffect(() => {
    if (isPopup) {
      ;(window.opener.postMessage as typeof window.postMessage)(
        { type: "loginRequired" } as PopupMessage,
        window.location.origin,
      )

      return
    }

    clientSessionReset()
  }, []) /* eslint-disable-line */

  return <div>로그인이 필요한 서비스입니다</div>
}

ChatError.Unactived = function ChatUnactived() {
  return <div>입장 가능한 상태가 아닙니다</div>
}

ChatError.NotMatch = function ChatNotMatch() {
  return <div>유효한 타입이 아닙니다</div>
}

ChatError.NotFound = function ChatNotFound() {
  return <div>존재하지 않는 채팅 방입니다</div>
}

ChatError.Unauthorization = function ChatUnauthorization() {
  return <div>입장 가능한 멤버가 아닙니다</div>
}