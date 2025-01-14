import type {
  CodingMeetingAuthor,
  CodingMeetingDetail,
} from "@/interfaces/coding-meetings"
import { APIResponse } from "../api-response"

type BaseRequest = Omit<
  CodingMeetingDetail,
  | keyof CodingMeetingAuthor
  | "created_date"
  | "coding_meeting_token"
  | "coding_meeting_closed"
>

export interface CreateCodingMeetingRequest extends BaseRequest {}

export interface CreateCodingMeetingPayload {
  coding_meeting_token: string
}

export interface CreateCodingMeetingResponse
  extends APIResponse<CreateCodingMeetingPayload> {}
