import { Icons } from "@/components/icons/Icons"
import {
  CodingMeetingMapData,
  Marker,
  SearchMapMarker,
  SelectedPlace,
} from "@/recoil/atoms/coding-meeting/mapData"
import { debounce } from "lodash-es"
import React, { useState, useEffect } from "react"
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk"
import { useRecoilState, useSetRecoilState } from "recoil"

declare const window: typeof globalThis & {
  kakao: any
}

export default function KakaoMapPage({ keyword }: { keyword: string }) {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP!,
    libraries: ["services"],
  })
  const [info, setInfo] = useState<Marker>()
  const [markers, setMarkers] = useRecoilState(SearchMapMarker)
  const [map, setMap] = useState<kakao.maps.Map>()
  const setMapData = useSetRecoilState(CodingMeetingMapData)
  const setSelectedPlace = useSetRecoilState(SelectedPlace)

  useEffect(() => {
    if (!map) return
    if (!keyword) return
    const ps = new kakao.maps.services.Places()

    const handleKeywordSearch = debounce(() => {
      ps.keywordSearch(keyword, (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다.
          const bounds = new kakao.maps.LatLngBounds()
          let markers: Marker[] = []
          setMapData(data)
          for (var i = 0; i < data.length; i++) {
            // @ts-ignore
            markers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
              content: data[i].place_name,
            })
            // @ts-ignore
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
          }
          setMarkers(markers)
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds)
        }
      })
    }, 1000)

    handleKeywordSearch()
  }, [map, keyword])

  if (error) throw error

  if (loading) {
    return (
      <div className="absolute left-0 top-0 z-[2] w-full h-full flex flex-col justify-center items-center bg-white">
        <div className="w-8 h-8 flex justify-center items-center rounded-full border border-[#828282]">
          <Icons.MapMarker className="text-[#828282]" />
        </div>
        <div className="mt-5 text-sm text-[#828282]">카카오 맵 로드 중</div>
      </div>
    )
  }

  return (
    <Map // 로드뷰를 표시할 Container
      center={{
        lat: 37.566826,
        lng: 126.9786567,
      }}
      className="w-full sm:w-[400px] h-[300px]"
      level={3}
      onCreate={setMap}
    >
      {markers &&
        markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={{
              lat: Number(marker.position.lat),
              lng: Number(marker.position.lng),
            }}
            onClick={() => {
              setSelectedPlace(marker)
              setInfo(marker)
            }}
          >
            {info && info.content === marker.content && (
              <div
                style={{
                  color: "#000",
                  borderRadius: "16px",
                  border: "none",
                  textAlign: "center",
                }}
              >
                {marker.content}
              </div>
            )}
          </MapMarker>
        ))}
    </Map>
  )
}
