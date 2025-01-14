type ImageSizeUnit = "KB" | "MB"

const LimitationImage = {
  value: 3,
  sizeUnit: "MB" as ImageSizeUnit,
  extensions: ["image/jpeg", "image/png", "image/svg+xml", "image/gif"],
  toString() {
    return `${this.value}${this.sizeUnit}`
  },
  getSize() {
    return this.value * this.convertUnitToSize(this.sizeUnit)
  },
  isValidExtension(extension: string) {
    return this.extensions.includes(extension)
  },
  convertUnitToSize(sizeUnit: ImageSizeUnit) {
    const baseSize = 1024
    const powCount = {
      KB: 1,
      MB: 2,
    } satisfies Record<ImageSizeUnit, number>

    return Math.pow(baseSize, powCount[sizeUnit])
  },
}

const Limitation = {
  hashtags_cnt: 10,
  hashtags_word: 10,
  mentoring_time: 10,
  title_limit_under: 5,
  title_limit_over: 100,
  content_limit_under: 10,
  content_limit_over: 10000,
  answer_limit_under: 10,
  answer_limit_over: 10000,
  introduction_limit_under: 10,
  introduction_limit_over: 1000,
  image: {
    size: LimitationImage.getSize(),
    stringifyedSize: LimitationImage.toString(),
    extension: {
      toString() {
        return LimitationImage.extensions
          .map((imageType) =>
            imageType.replace("image/", "").replace("+xml", ""),
          )
          .join(", ")
      },
      isValidExtendsion(extension: string) {
        return LimitationImage.isValidExtension(extension)
      },
    },
    upload: {
      maxLength: 1,
    },
  },
} as const

export default Limitation
