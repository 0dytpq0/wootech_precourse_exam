## 기능 목록
1. 상대방(컴퓨터)의 랜덤한 수를 얻어내는 함수
    - 예시를 보고 나서 더 나은 방안을 찾으려 생각해보았으나, 다른 방법은 있어도 더 나은 방안을 찾기는 어렵단 생각에 예시의 코드를 사용하였다.
2. 사용자 제시 수를 입력받는 함수
    - 사용자가 잘못된 수를 입력시에 `throw`문을 통해 예외를 발생시킨 후 애플리케이션은 종료되야 한다.
    - 여기서 예외는 `자릿 수가 3이여야 한다.`이다.
3. 스트라이크, 볼, 나씽을 판별하는 함수
    - 성공할 때 까지 반복
    - 성공 시 게임이 종료되고 다시 시작할 지 물어본다(1은 재시작, 2는 종료)
    - 재시작에 대한 여부를 반환해야한다.(-> 함수로 만들었음)
    - 스트라이크 수, 볼 수를 반환해주는 함수와 문구를 출력해주는 함수를 따로 제작 하여 리팩토링 해보자.
4. 모든 함수를 포함한 실행 함수
    - 클래스에 main()함수를 사용하였을 때 memory heap의 문제와 비동기 문제가 발생 하였다.
        1. await이 없이 작성 했을 때는 해당 함수가 끝나기 전에 테스트가 끝나버려 문제가 있었다.
        2. 함수 내부에서 변수 할당을 좀 더 꼼꼼히 하여 메모리 누수를 해결하니 문제가 해결되었음.