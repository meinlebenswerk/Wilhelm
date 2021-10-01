import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  email: '' as string | null,
  phone: '' as string | null,
  firstname: '' as string | null,
  lastname: '' as string | null
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  email: state => state.email,
  phone: state => state.phone,
  firstname: state => state.firstname,
  lastname: state => state.lastname,
  userInfo: state => state
}

export const mutations: MutationTree<RootState> = {
  setName: (state, payload: { firstname: string, lastname: string}) => {
    state.firstname = payload.firstname
    state.lastname = payload.lastname
  },
  setContactInformation: (state, payload: { email: string, phone: string}) => {
    state.email = payload.email
    state.phone = payload.phone
  }
}

export const actions: ActionTree<RootState, RootState> = {
  setEmail ({ commit }, newVal: string) {
    commit('SET_EMAIL', newVal)
  }
}
