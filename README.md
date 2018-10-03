# 지뢰찾기

## Updates

1. 기존에 로컬스테이트로 작성했던 `GameStatus` 관련 정보를 `Redux`로 분리하였습니다.
2. `timer` 조작을 별도의 클래스로 분리하였고 `GameStatus`에는 최종 `record`만 기록합니다.
3. `HomeContainer`에는 최대한 `View` 로직만 남기고, 나머지 `GameStatus`, `Map`, `Records` 등의 비즈니스로직은 분리하였습니다.
4. `Action`, `Util` 등에서 비슷한 함수명을 구분하기 위하여 모듈을 불러올 때 모듈 전체를 불러와 콜하도록 수정하였습니다.
5. 필요하지 않은 파일 및 라이브러리들은 다 제거하였습니다.

## Structure

1. Redux: `src/redux`
   1. Actions: `src/redux/actions`
   2. Reducers: `src/redux/reducers`
2. Containers: `src/containers`
3. Components: `src/components`
4. Custom Utilities: `src/utils`

## Development

```bash
yarn start
```
