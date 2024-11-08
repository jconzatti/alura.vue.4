<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'BarraLateral',
  components: { RouterLink },
})
</script>

<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="Logo do Alura Tracker" />
    </h1>
    <nav class="panel mt-5">
      <ul>
        <li>
          <RouterLink to="/" class="link">
            <i class="fas fa-tasks"></i>
            Tarefas
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/projetos" class="link">
            <i class="fas fa-project-diagram"></i>
            Projetos
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="css" scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
}
.panel {
  box-shadow: none;
}
.panel li {
  margin: 8px 0;
}
.link {
  color: #fff;
}
.link:hover {
  color: #ff0;
}
.link.router-link-active {
  color: #ff0;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>
