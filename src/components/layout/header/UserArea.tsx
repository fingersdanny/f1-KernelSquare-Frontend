"use client"

import LoginForm from "@/components/form/LoginForm"
import Button from "@/components/shared/button/Button"
import useModal from "@/hooks/useModal"
import Link from "next/link"
import { Icons } from "@/components/icons/Icons"
import Profile from "@/components/shared/user/Profile"
import Dropdown from "rc-dropdown"
import Menu, { Item as MenuItem, Divider } from "rc-menu"
import { logout } from "@/service/auth"
import { toast } from "react-toastify"
import { useClientSession } from "@/hooks/useClientSession"
import { getAuthCookie } from "@/util/actions/cookie"
import { revalidatePage } from "@/util/actions/revalidatePage"
import type { LoginUserPayload } from "@/interfaces/dto/auth/login.dto"
import DeleteMemberModal from "@/app/profile/[id]/_components/deleteMember/DeleteMemberModal"

type ProfileDropdownMenu = {
  label?: string
  to?: string
  onClick?: () => void | Promise<void>
  role: "menu" | "divider"
}

function UserArea() {
  const { user } = useClientSession()

  if (!user) {
    return <NotLoginedUserArea />
  }

  return <LoginedUserArea user={user} />
}

function NotLoginedUserArea() {
  const { openModal } = useModal()

  return (
    <div className="flex gap-2 items-center">
      <Button
        className="border border-colorsGray font-normal"
        buttonTheme="primary"
        onClick={() => openModal({ content: <LoginForm /> })}
      >
        로그인
      </Button>
      <Link href={"/signup"}>
        <Button
          ghost
          buttonTheme="secondary"
          className="border border-colorsGray font-normal"
        >
          회원가입
        </Button>
      </Link>
    </div>
  )
}

function LoginedUserArea({ user }: { user: LoginUserPayload }) {
  const { clientSessionLogout } = useClientSession()

  const DropDownMenu = () => {
    const profileDropdownMenu: Array<ProfileDropdownMenu> = [
      { label: "내 프로필", to: `/profile/${user.member_id}`, role: "menu" },
      { role: "divider" },
      {
        label: "로그아웃",
        role: "menu",
        async onClick() {
          try {
            const { accessToken, refreshToken } = await getAuthCookie()

            if (accessToken && refreshToken) {
              await logout({
                access_token: accessToken,
                refresh_token: refreshToken,
              })
            }
            await clientSessionLogout()

            revalidatePage("*")

            setTimeout(() => {
              toast.success("로그아웃에 성공했습니다", {
                position: "bottom-center",
              })
            }, 200)
          } catch (error) {
            toast.error("로그아웃에 실패했습니다", {
              position: "bottom-center",
            })
          }
        },
      },
    ]

    return (
      <Menu className="!p-4 !text-xs">
        {profileDropdownMenu.map((menu, index) => {
          if (menu.role === "divider") {
            return (
              <Divider
                key={`rc-divider-${index}`}
                className="h-[1px] bg-colorsGray !my-4"
              />
            )
          }

          return (
            <MenuItem
              key={`rc-menu-item-${menu}-${index}`}
              className="cursor-pointer hover:underline hover:underline-offset-2"
              onClick={menu.onClick}
            >
              {menu.to ? <Link href={menu.to}>{menu.label}</Link> : menu.label}
            </MenuItem>
          )
        })}
      </Menu>
    )
  }

  return (
    <div className="flex gap-2 items-center">
      <Dropdown trigger={["click"]} overlay={DropDownMenu}>
        <Profile
          profileImage={user?.image_url}
          className="cursor-pointer hover:cursor-pointer"
        />
      </Dropdown>
      {/* <Button className="p-0">
        <Icons.Notification className="text-2xl text-colorsGray" />
      </Button> */}
    </div>
  )
}

export default UserArea
