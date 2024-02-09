/* eslint-disable @typescript-eslint/no-unused-vars */
type UserHref = 'account';

interface UserSignup {
  username: string
  password: string
  confirmPassword: string
}

type UserLogin = Omit<UserSignup, 'confirmPassword'>;

interface User {
  id: string
  username: string
  avatar: string
  is_admin: boolean
}

interface Post {
  id: string
  user_id: string
  content: string
  username: string
  avatar: string
  created_at: string
}
