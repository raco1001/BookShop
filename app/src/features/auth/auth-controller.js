const { authenticateUser, refreshAccessToken } = require('./auth-service')
const { AuthError } = require('./auth-utils')
const authLogger = require('./auth-logger')

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const { user, tokens } = await authenticateUser(email, password)
    if (tokens.refreshToken) {
      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: tokens.accessToken.secure,
        sameSite: 'strict',
        maxAge: tokens.accessToken.expiresIn,
      })
    } else {
      throw new AuthError('Failed to generate refresh token', 500)
    }

    authLogger.logLogin(user.id, user.email, req.requestId)

    res.status(200).json({
      status: 'success',
      data: {
        user,
        accessToken: tokens.accessToken,
      },
    })
  } catch (error) {
    next(error)
  }
}

const createAccessToken = async (req, res, next) => {
  try {
    const userId = req.userId
    const userRefreshToken = req.cookies.refreshToken

    const createdAccessToken = await refreshAccessToken(
      userId,
      userRefreshToken,
    )

    authLogger.logTokenRefresh(userId, req.requestId)

    res.status(200).json({
      status: 'success',
      message: 'Access token created successfully',
      data: { accessToken: createdAccessToken },
    })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  try {
    const userId = req.user?.id
    if (userId) {
      authLogger.logLogout(userId, req.requestId)
    }

    res.clearCookie('refreshToken')
    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  login,
  createAccessToken,
  logout,
}
