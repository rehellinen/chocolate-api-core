import crypto from 'crypto'

export const generateSalt = (length) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .substring(0, length)
}

const generateHash = ({ algorithm, salt, password, iterations = 1 }) => {
  let hash = password
  for (let i = 0; i < iterations; i++) {
    hash = crypto
      .createHmac(algorithm, salt)
      .update(hash)
      .digest('hex')
  }
  return algorithm + '$' + salt + '$' + iterations + '$' + hash
}

/**
 * 生成密文密码
 * @param password 密码
 * @param options 参数
 */
export const generatePwd = (password, options = {}) => {
  const algorithm = options.algorithm || 'sha1'
  const saltLength = options.saltLength || 8
  const iterations = options.iterations || 1

  const salt = generateSalt(saltLength)
  return generateHash({
    salt,
    password,
    algorithm: algorithm,
    iterations: iterations
  })
}

/**
 * 校验密码
 * @param password 原始密码
 * @param hashedPassword 密文密码
 */
export const verifyPwd = (password, hashedPassword) => {
  if (!password || !hashedPassword) {
    return false
  }
  const parts = hashedPassword.split('$')
  if (parts.length !== 4) {
    return false
  }

  try {
    const iter = parseInt(parts[2])
    return generateHash({
      algorithm: parts[0],
      salt: parts[1],
      password,
      iterations: iter
    }) === hashedPassword
  } catch (e) {
    return false
  }
}

/**
 * 判断当前密码是否为密文
 * @param password 密码
 */
export const isHashedPwd = (password) => {
  if (!password) {
    return false
  }
  return password.split('$').length === 4
}
