import { NextFetchEvent, NextRequest, NextResponse } from "next/server"
import {
  ACCESS_TOKEN_KEY,
  CustomAuthorizedHeaderName,
  CustomAuthorizedHeaderValue,
} from "./constants/token"
import { cookies } from "next/headers"

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const requestHeaders = new Headers(request.headers)
  const url = request.nextUrl

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  const accessToken = cookies().get(ACCESS_TOKEN_KEY)?.value

  setCustomAuthorizedHeader(
    response.headers,
    !!accessToken ? "authorized" : "unauthorized",
  )

  if (url.pathname === "/signup") {
    return response
  }

  if (url.pathname === "/question") {
    return response
  }

  if (url.pathname === "/profile") {
    return response
  }

  return response
}

export const config = {
  matcher: ["/signup", "/question", "/profile"],
}

function setCustomAuthorizedHeader(
  responseHeader: Headers,
  value: "authorized" | "unauthorized",
) {
  const headerValue =
    value === "authorized"
      ? CustomAuthorizedHeaderValue.Authorized
      : CustomAuthorizedHeaderValue.UnAuthorized

  responseHeader.set(CustomAuthorizedHeaderName, headerValue)
}
