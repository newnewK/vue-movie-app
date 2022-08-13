import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export default{
    // moudule
    namespaced: true,
    // data
    state: () => ({
        movies: [],
        message: _defaultMessage,
        loading: false,
        theMovie: {}
    }),
    // computed
    getters: {},
    // methods
    // 변이 mutations에서만 데이터를 변경가능하다.
    mutations: {
        updateState(state, payload){
            Object.keys(payload).forEach(key => {
                state[key] = payload[key]
            })
        },
        resetMovies(state){
            state.movies = []
            state.message = _defaultMessage
            state.loading = false
        }
    },
    // 비동기 
    actions: {
        async searchMovies({ state, commit }, payload){
            if(state.loading){
                return 
            }

            commit('updateState', {
                message: '',
                loading: true
            })

            try{
                // const { title, type, number, year } = payload
                // const OMDB_API_KEY = '7035c60c'
                // const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
                const res = await _fetchMoive({
                    ...payload,
                    page: 1
                })
                const { Search, totalResults } = res.data
                commit('updateState', {
                    movies: _uniqBy(Search, 'imdbID')
                })
                console.log(totalResults)
                console.log(typeof totalResults)

                const total = parseInt(totalResults, 10)
                const pageLength = Math.ceil(total / 10)

                // 추가요청
                if (pageLength > 1){
                    for (let page = 2; page <= pageLength; page ++){
                        if(page > (payload.number / 10)){
                            break
                        }
                        // const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
                        const res = await _fetchMoive({
                            ...payload,
                            page// 축약 page:page
                        })
                        const { Search } = res.data
                        commit('updateState', {
                            movies:[...state.movies, ..._uniqBy(Search, 'imdbID')]
                        })
                    }
                }
            } catch(message){
                commit('updateState', {
                    movies: [],
                    message
                })
            } finally{
                commit('updateState', {
                    loading: false
                })
            }
        },
        async searchMovieWithId({state, commit}, payload){
            if(state.loading) {
                return
            }

            commit('updateState', {
                theMovie: {},
                loading: true
            })

            try{
                const res = await _fetchMoive(payload)
                console.log(res.data)
                commit('updateState', {
                    theMovie: res.data
                })
            }catch(error){
                commit('updateState', {
                    theMovie: {}
                })
            }finally{
                commit('updateState', {
                    loading: false
                })
            }
        }
    }
}

function _fetchMoive(payload){
    const { title, type, year, page, id } = payload
    const OMDB_API_KEY = '7035c60c'
    const url = id 
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
   
    return new Promise( (resolve, reject) => {
         axios.get(url)
            .then((res)=>{
                if(res.data.Error){
                    reject(err)
                }
                resolve(res)
            })
            .catch((err)=> {
                reject(err.message)
            })
    })
}