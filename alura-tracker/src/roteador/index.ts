import FormularioProjeto from '@/views/FormularioProjeto.vue'
import ListaProjetos from '@/views/ListaProjetos.vue'
import Projetos from '@/views/Projetos.vue'
import Tarefas from '@/views/Tarefas.vue'
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const rotas: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'tarefas',
    component: Tarefas,
  },
  {
    path: '/projetos',
    component: Projetos,
    children: [
      {
        path: '',
        name: 'projetos',
        component: ListaProjetos,
      },
      {
        path: 'novo',
        name: 'novo-projeto',
        component: FormularioProjeto,
      },
      {
        path: ':id',
        name: 'editar-projeto',
        component: FormularioProjeto,
        props: true,
      },
    ],
  },
]
const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas,
})
export default roteador
