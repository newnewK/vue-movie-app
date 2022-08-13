# VueX 정리

## Store
- namespaced : moudule
- state : data
- getters : computed
- mutations : methods, state 변경가능한 권한을 가지고 있기때문에, state를 변경하는 로직만 작성 
- actions : methods, 비동기

### actions
- 첫번째 인수는 context
- 객체 분해 했을때, <br/>
  context.state ==> state  <br/>
  context.getter ==> getter<br/>
  context.commit ==> mutation<br/>
  context.dispatch ==> action

## Vue 컴포넌트
- state : $store.state.모듈.상태
- getters : $store.getters['모듈/게터']
- mutations : $store.commit('모듈/변이')
- actions : $store.dispatch('모듈/액션')

## Vue helper
- state : ...mapState('모듈', ['상태1', '상태2'])
- getters : ...mapGetter('모듈', ['게터1', '게터2'])
- mutations : ...mapMutations('모듈', ['변이1', '변이2'])
- actions : ...mapActions('모듈', ['액션1', '액션2'])

vue 헬퍼 | 명시 부분
-- | --
mapState | computed
mapGetter | computed
mapMutations | methods
mapActions | methods


## Vue Router
- RouterView : 페이지가 출력(렌더링)되는 영역 컴포넌트
- RouterLink : 페이지 이동을 위한 링크 컴포넌트
- $route : Route(페이지) 정보를 가지는 객체 [속성]
- $router : Route(페이지) 조작을 위한 객체 [메소드]




