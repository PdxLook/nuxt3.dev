/**
 * Mjx 类用于提供一些实用功能
 */
export class Mjx {
  /**
   * 生成一个纯数字的随机字符串
   * @param length 要生成的字符串长度
   * @returns 生成的随机数字字符串
   */
  static randomNumberString(length: number): string {
    if (length <= 0) {
      throw new Error('Length must be a positive integer.')
    }
    let randomString = ''
    for (let i = 0; i < length; i++) {
      const randomDigit = Math.floor(Math.random() * 10)
      randomString += randomDigit.toString()
    }
    return randomString
  }
}
