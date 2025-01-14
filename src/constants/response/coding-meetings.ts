import { HttpStatusCode } from "axios"
import { ApiStatus, Status } from "./api"

export const CodingMeetingApiStatus = {
  /**
   * 모든 모각코 등록글 조회 관련 api status
   */
  getCodingMeetingList: {
    /**
     * 모든 모각코 조회 성공
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Ok: {
      Code: 5141,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * (모각코 모두 조회) 권한이 없는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Forbidden: {
      Code: -1,
      HttpStatus: HttpStatusCode.Forbidden,
    },
    /**
     * (모각코 모두 조회) 인증되지 않은 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Unauthorized: {
      Code: -1,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * (모각코 모두 조회) 존재하지 않는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    NotFound: {
      Code: -1,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (모각코 모두 조회) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (모각코 모두 조회) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   * 특정 모각코 등록글 조회 관련 api status
   */
  getCodingMeetingDetail: {
    /**
     * 특정 모각코 조회 성공
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Ok: {
      Code: 5141,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * (특정 모각코 조회) 권한이 없는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Forbidden: {
      Code: -1,
      HttpStatus: HttpStatusCode.Forbidden,
    },
    /**
     * (특정 모각코 조회) 인증되지 않은 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Unauthorized: {
      Code: -1,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * (특정 모각코 조회) 존재하지 않는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    NotFound: {
      Code: -1,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (특정 모각코 조회) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (특정 모각코 조회) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   * 모각코 등록글 생성 관련 api status
   */
  createCodingMeeting: {
    /**
     * 모각코 등록글 생성 성공
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Ok: {
      Code: 5144,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * (모각코 등록글 생성) 권한이 없는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Forbidden: {
      Code: -1,
      HttpStatus: HttpStatusCode.Forbidden,
    },
    /**
     * (모각코 등록글 생성) 인증되지 않은 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Unauthorized: {
      Code: -1,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * (모각코 등록글 생성) 존재하지 않는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    NotFound: {
      Code: -1,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (모각코 등록글 생성) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (모각코 등록글 생성) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   * 모각코 등록글 삭제 관련 api status
   */
  deleteCodingMeeting: {
    /**
     * 모각코 등록글 삭제 성공
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Ok: {
      Code: 5144,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * (모각코 등록글 삭제) 권한이 없는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Forbidden: {
      Code: -1,
      HttpStatus: HttpStatusCode.Forbidden,
    },
    /**
     * (모각코 등록글 삭제) 인증되지 않은 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Unauthorized: {
      Code: -1,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * (모각코 등록글 삭제) 존재하지 않는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    NotFound: {
      Code: -1,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (모각코 등록글 삭제) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (모각코 등록글 삭제) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   * 모각코 등록글 수정 관련 api status
   */
  updateCodingMeeting: {
    /**
     * 모각코 등록글 수정 성공
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Ok: {
      Code: 5144,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * (모각코 등록글 수정) 권한이 없는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Forbidden: {
      Code: -1,
      HttpStatus: HttpStatusCode.Forbidden,
    },
    /**
     * (모각코 등록글 수정) 인증되지 않은 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Unauthorized: {
      Code: -1,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * (모각코 등록글 수정) 존재하지 않는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    NotFound: {
      Code: -1,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (모각코 등록글 수정) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (모각코 등록글 수정) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   * 모각코 마감 api status
   */
  closeCodingMeeting: {
    Ok: {
      Code: 5145,
      HttpStatus: HttpStatusCode.Ok,
    },
  },
  /**
   * 모각코 상세 관련 api status
   */
  getCodingMeetingDetailComment: {
    Ok: {
      Code: 5140,
      HttpStatus: HttpStatusCode.Ok,
    },
    NotFound: {
      Code: -1,
      HttpStatus: HttpStatusCode.NotFound,
    },
  },
  /**
   * 모각코 댓글 조회 api status
   */
  getCodingMeetingComments: {
    Ok: {
      Code: 5140,
      HttpStatus: HttpStatusCode.Ok,
    },
    NotFound: {
      Code: -1,
      HttpStatus: HttpStatusCode.NotFound,
    },
  },
} satisfies Record<string, ApiStatus>
