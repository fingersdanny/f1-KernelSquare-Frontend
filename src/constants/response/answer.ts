import { HttpStatusCode } from "axios"
import { ApiStatus } from "./api"

export const AnswerApiStatus = {
  /**
   * 해당 질문에 대한 모든 답변 조회 관련 api status
   */
  getAllAnswers: {
    /**
     * 모든 답변 조회 성공
     */
    Ok: {
      Code: 2241,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * 인증되지 않은 회원
     */
    Unauthorized: {
      Code: 1101,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * 권한이 없는 회원
     */
    Forbidden: {
      Code: 1103,
      HttpStatus: HttpStatusCode.Forbidden,
    },
    /**
     * 존재하지 않는 회원
     */
    NotFound: {
      Code: 1201,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (모든 답변 조회) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (모든 답변 조회) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   * 해당 질문에 대한 답변 생성 관련 api status
   */
  createAnswer: {
    /**
     * 답변 생성 성공
     */
    Ok: {
      Code: 2240,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * 답변을 입력할 권한이 없는 회원
     */
    Forbidden: {
      Code: 2200,
      HttpStatus: HttpStatusCode.Forbidden,
    },
    /**
     * (답변 생성) 인증되지 않은 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Unauthorized: {
      Code: -1,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * (답변 생성) 존재하지 않는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    NotFound: {
      Code: -1,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (답변 생성) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (답변 생성) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   * 답변 수정 관련 api status
   */
  updateAnswer: {
    /**
     * 답변 수정 성공
     */
    Ok: {
      Code: 2242,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * 답변을 수정할 권한이 없는 회원
     */
    Forbidden: {
      Code: 2201,
      HttpStatus: HttpStatusCode.Forbidden,
    },
    /**
     * (답변 수정) 인증되지 않은 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Unauthorized: {
      Code: -1,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * (답변 수정) 존재하지 않는 답변
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    NotFound: {
      Code: 2120,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (답변 수정) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (답변 수정) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   * 답변 삭제 관련 api status
   */
  deleteAnswer: {
    /**
     * 답변 삭제 성공
     */
    Ok: {
      Code: 2243,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * 답변을 수정할 권한이 없는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Forbidden: {
      Code: -1,
      HttpStatus: HttpStatusCode.Forbidden,
    },
    /**
     * (답변 수정) 인증되지 않은 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Unauthorized: {
      Code: -1,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * (답변 수정) 존재하지 않는 답변
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    NotFound: {
      Code: 2120,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (답변 삭제) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (답변 삭제) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   * 답변 투표 생성 관련 api status
   */
  createAnswerVote: {
    /**
     * 투표 생성 성공
     */
    Ok: {
      Code: 2244,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * (투표 생성) 권한이 없는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Forbidden: {
      Code: -1,
      HttpStatus: HttpStatusCode.Forbidden,
    },
    /**
     * (투표 생성) 인증되지 않은 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Unauthorized: {
      Code: -1,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * (투표 생성) 존재하지 않는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    NotFound: {
      Code: -1,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (투표 생성) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (투표 생성) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   * 답변 투표 삭제 관련 api status
   */
  deleteAnswerVote: {
    /**
     * 투표 삭제 성공
     */
    Ok: {
      Code: 2245,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * (투표 삭제) 권한이 없는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Forbidden: {
      Code: -1,
      HttpStatus: HttpStatusCode.Forbidden,
    },
    /**
     * (투표 삭제) 인증되지 않은 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Unauthorized: {
      Code: -1,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * (투표 삭제) 존재하지 않는 답변
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    NotFound: {
      Code: 2202,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (투표 삭제) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (투표 삭제) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
} satisfies Record<string, ApiStatus>
