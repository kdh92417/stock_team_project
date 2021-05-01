class LoginService {

  // functionName - loginCheckUser
  // Job - api에서 서버에서 전달받은 유저 정보로 예외처리 하는 함수
  // Input(args, params) - response.status
  // Output(return) - none
  loginCheckUser(value) {
    console.log(value);
    if (value.status === 402) {
      alert("등록된 아이디가 없습니다.")
    } else if (value.status === 401) {
      alert("비밀번호가 틀렸습니다.")
    }
  }

}

export default LoginService;