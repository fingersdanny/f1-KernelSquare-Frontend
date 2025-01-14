import { Metadata } from "next"
import CodingMeetingsDetail from "@/page/coding-meetings/detail/DetailPage"
import { AxiosError } from "axios"
import { APIResponse } from "@/interfaces/dto/api-response"
import { notFound } from "next/navigation"
import { getCodingMeetingDetail } from "@/service/coding-meetings"
import DetailHeader from "@/page/coding-meetings/detail/DetailHeader"
import ScrollTopButton from "@/page/coding-meetings/main/ScrollTopButton"

export const dynamic = "force-dynamic"
export const revalidate = 0

export interface CodingMeetingsDetailPageProps {
  params: {
    token: string
  }
}

export const metadata: Metadata = {
  title: "모각코 상세보기",
  description: "모여서 각자 코딩 상세보기",
}

export default async function CodingMeetingsDetailPage({
  params,
}: CodingMeetingsDetailPageProps) {
  try {
    const detailResponse = await getCodingMeetingDetail({
      coding_meeting_token: params.token,
    })

    return (
      <div className="flex w-full px-6 pt-5 pb-8 tablet:px-12 tablet:pb-12 lg:mt-[72px] box-border">
        <div className="flex-1 max-w-full break-all">
          <DetailHeader />
          <CodingMeetingsDetail detail={detailResponse.data.data!} />
        </div>
        <aside className="bg-transparent min-h-screen hidden lg:block lg:w-32" />
        <ScrollTopButton />
      </div>
    )
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error as AxiosError<APIResponse>

      return <div>{response?.data.msg ?? "에러"}</div>
    }

    notFound()
  }
}
