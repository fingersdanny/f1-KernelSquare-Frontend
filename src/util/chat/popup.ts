export type PopupStorageValue = number
export type PopupStorage = Array<PopupStorageValue>

export const POPUP_STORAGE_KEY = "popup"

interface PopupStorageFunctionArgs {
  reservationId: number
}

export function getPopupStorage(): PopupStorage {
  return localStorage.getItem(POPUP_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(POPUP_STORAGE_KEY)!)
    : []
}

export function hasPopup({ reservationId }: PopupStorageFunctionArgs) {
  const currentPopupStorage = getPopupStorage()

  return currentPopupStorage.includes(reservationId)
}

export function addPopupStorageItem({
  reservationId,
}: PopupStorageFunctionArgs) {
  const currentPopupStorage = getPopupStorage()

  const popupStorage = Array.from(
    new Set([...currentPopupStorage, reservationId]),
  )

  localStorage.setItem(POPUP_STORAGE_KEY, JSON.stringify(popupStorage))

  return popupStorage
}

export function removePopupStorageItem({
  reservationId,
}: PopupStorageFunctionArgs) {
  const currentPopupStorage = getPopupStorage()

  const popupStorage = currentPopupStorage.filter(
    (popupReservationId) => popupReservationId !== reservationId,
  )

  localStorage.setItem(POPUP_STORAGE_KEY, JSON.stringify(popupStorage))

  return popupStorage
}
