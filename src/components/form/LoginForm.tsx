"use client"

import { FieldErrors, useForm } from "react-hook-form"
import { Input } from "../shared/input/Input"
import Button from "../shared/button/Button"
import PasswordField from "../shared/input/PasswordField"
import Spacing from "../shared/Spacing"
import Link from "next/link"
import { twJoin } from "tailwind-merge"
import LabelDivider from "../shared/divider/LabelDivider"
import useModal from "@/hooks/useModal"
import SocialButton from "../SocialButton"
import { Validator } from "@/util/validate"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { ToastContentProps, toast } from "react-toastify"
import { login } from "@/service/auth"
import { SessionPayload, userAtom } from "@/recoil/atoms/user"
import dayjs from "dayjs"
import { encrypt } from "@/util/crypto"
import { setAuthCookie } from "@/util/actions/cookie"
import { useSetRecoilState } from "recoil"
import type { LoginFormData } from "@/interfaces/form"
import Logo from "../icons/Logo"

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>()
  const setUserAtom = useSetRecoilState(userAtom)

  const { closeModal } = useModal()

  const validator = new Validator()

  const linkClassNames = twJoin([
    "flex justify-center items-center text-sm text-primary underline underline-offset-4",
  ])

  const onSubmit = async (data: LoginFormData) => {
    try {
      const loginResponse = await login({
        email: data.email,
        password: data.password,
      })

      const { token_dto, ...userPayload } = loginResponse.data.data!

      const { access_token, refresh_token } = token_dto
      const payload = {
        ...userPayload,
      }

      const expires = dayjs().add(1, "hours").startOf("second").toDate()

      const stringifyPayload = JSON.stringify({
        ...payload,
        expires: expires.toJSON(),
      } as SessionPayload)
      const encryptedPayload = encrypt(stringifyPayload)

      await setAuthCookie(
        access_token,
        refresh_token,
        encryptedPayload,
        expires,
      )

      setUserAtom({
        ...payload,
        expires: expires.toJSON(),
      })

      await revalidatePage("*")

      closeModal()
    } catch (error) {
      /*
        서버에서 유효하지 않은 응답이 오는 경우
        (ex. status 401)
      */

      toast.error(LoginForm.ErrorToast, { position: "top-center" })
    }
  }

  const onInvalid = (errors: FieldErrors<LoginFormData>) => {
    toast.error(LoginForm.ErrorToast, { position: "top-center" })
  }

  const handleClose = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeModal()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="w-full sm:w-[320px]"
    >
      <div className="w-full flex gap-1 justify-center items-center">
        <Logo className="text-[40px]" />
        <h3 className="text-center text-3xl font-bold text-secondary">
          KernelSquare
        </h3>
      </div>
      <Spacing size={24} />
      <Input
        className="px-2"
        fullWidth
        placeholder="이메일"
        autoComplete="off"
        error={!!errors.email}
        errorMessage={errors.email?.message}
        {...register("email", {
          required: true,
          validate: (email) => {
            const { allCheck } = validator.validateEmail(email)

            return allCheck()
          },
        })}
      />
      <Spacing size={12} />
      <PasswordField
        placeholder="비밀번호"
        fullWidth
        error={!!errors.password}
        errorMessage={errors.password?.message}
        {...register("password", {
          required: true,
          validate: (password) => {
            const { allCheck } = validator.validatePassword(password)

            return allCheck()
          },
        })}
      />
      <Spacing size={12} />
      <div>
        <Button
          type="submit"
          fullWidth
          buttonTheme="primary"
          className="disabled:bg-colorsGray"
          disabled={!isValid}
        >
          로그인
        </Button>
      </div>
      <Spacing size={24} />
      {/* helper menu */}
      <div className="flex w-full justify-center items-center">
        <span className="text-sm">처음이신가요?&nbsp;&nbsp;</span>
        <Link href="/signup" className={linkClassNames} onClick={handleClose}>
          회원가입
        </Link>
      </div>
      <Spacing size={24} />
      <LabelDivider label={"간편 로그인"} />
      <Spacing size={12} />
      {/* social login button */}
      <div className="flex w-full justify-center gap-2">
        <SocialButton social="github" action="login" />
      </div>
    </form>
  )
}

export default LoginForm

LoginForm.ErrorToast = function LoginFormErrorToast({
  closeToast,
  toastProps,
}: ToastContentProps) {
  return (
    <div className="text-xs">
      등록되지 않은 아이디 이거나,
      <br />
      아이디 또는 비밀번호를 잘못 입력했습니다
    </div>
  )
}

LoginForm.InternalServerErrorToast =
  function LoginFormInternalServerErrorToast({
    closeToast,
    toastProps,
  }: ToastContentProps) {
    return (
      <div className="text-xs">
        서버에러가 발생했습니다.
        <br />
        잠시후 다시 이용해주세요.
      </div>
    )
  }
