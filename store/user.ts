import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { User } from '~/types/API'

export const state = () => ({
  user: null as User | null
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  token: state => state.user?.token,
  isLoggedIn: state => state.user?.token != null,
  tan: state => state.user?.tan,
  id: state => state.user?.id
}

export const mutations: MutationTree<RootState> = {
  SET_USER: (state, payload: User) => {
    state.user = payload
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async login ({ commit }, tan: string) {
    try {
      const response = await this.$axios.post('/api/users/login', { tan })
      commit('SET_USER', response.data)
    } catch (error) {
      commit('SET_USER', null)
    }
  }
}
